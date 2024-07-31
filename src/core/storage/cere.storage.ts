import {DdcClient, File, FileUri, TESTNET} from '@cere-ddc-sdk/ddc-client';
import {CnsRecord, NodeInterface} from '@cere-ddc-sdk/ddc';
import {StorageProvider} from "./";

export const CERE_MAIN_CLUSTER_ID = '0x825c4b2352850de9986d9d28568db6f0c023a1e3';
export const CERE_TOKEN_UNIT = 10_000_000_000n;

export class CereStorageProvider implements StorageProvider {
    private ddcClient: DdcClient;
    private ddcNode: NodeInterface;
    private bucketId: bigint;

    private constructor(ddcClient: DdcClient, ddcNode: NodeInterface, bucketId: bigint) {
        this.ddcClient = ddcClient;
        this.ddcNode = ddcNode;
        this.bucketId = bucketId;
    }

    public static async Init(privateKey: string): Promise<CereStorageProvider> {
        const ddcClient = await DdcClient.create(privateKey, TESTNET);
        const ddcNode = ((<any>ddcClient).ddcNode as NodeInterface);

        const buckets = await ddcClient.getBucketList();

        let resBucketId = 0n;
        for (let bucket of buckets) {
            const bucketNameCnsResponse = await ddcNode.getCnsRecord(bucket.bucketId, '__name__');
            if (!bucketNameCnsResponse) continue;
            const bucketNameFileResponse = await ddcClient.read(new FileUri(bucket.bucketId, bucketNameCnsResponse.cid));
            const bucketName = await bucketNameFileResponse.text();
            if (bucketName === '__ipdw__') {
                resBucketId = bucket.bucketId;
                break;
            }
        }

        const deposit = await ddcClient.getDeposit();

        if (deposit < 1n * CERE_TOKEN_UNIT) {
            try {
                await ddcClient.depositBalance(5n * CERE_TOKEN_UNIT);
            } catch (e) {
                throw Error('Keep at least 5 CERE on the wallet, they will be automatically deposited for storage when needed');
            }
        }

        if (resBucketId === 0n) {
            resBucketId = await ddcClient.createBucket(CERE_MAIN_CLUSTER_ID, {isPublic: false});
            const bucketNameFileUri = await ddcClient.store(resBucketId, new File(new TextEncoder().encode("__ipdw__")))
            const bucketNameCnsResponse = await ddcNode.storeCnsRecord(resBucketId, new CnsRecord(bucketNameFileUri.cid, '__name__'));
            console.log(bucketNameCnsResponse);
        }

        return new CereStorageProvider(ddcClient, ddcNode, resBucketId);
    }

    async set(key: string, value: Uint8Array | undefined): Promise<void> {
        const index = await this.getIndex();

        if (value === undefined) {
            if (index[key]) {
                delete index[key];
            }
        } else {
            const file = new File(value);
            const fileUri = await this.ddcClient.store(this.bucketId, file);
            index[key] = fileUri.cid;
        }

        await this.updateIndex(index);
    }

    async has(key: string): Promise<boolean> {
        const index = await this.getIndex();
        return !!index[key];
    }

    async get(key: string): Promise<Uint8Array | undefined> {
        const index = await this.getIndex();
        if (!index[key]) return undefined;

        try {
            const fileResponse = await this.ddcClient.read(new FileUri(this.bucketId, index[key]));
            return new Uint8Array(await fileResponse.arrayBuffer());
        } catch (error) {
            console.error(`Error reading file for key ${key}:`, error);
            return undefined;
        }
    }

    async ls(): Promise<string[]> {
        const index = await this.getIndex();
        return Object.keys(index);
    }

    async clear(): Promise<void> {
        await this.updateIndex({});
    }

    private async getIndex(): Promise<Record<string, string>> {
        const indexCnsResponse = await this.ddcNode.getCnsRecord(this.bucketId, '__index__');
        if (!indexCnsResponse)
            return {};

        try {
            const indexFileResponse = await this.ddcClient.read(new FileUri(this.bucketId, indexCnsResponse.cid));
            return JSON.parse(await indexFileResponse.text());
        } catch (error) {
            console.error("Error reading index file:", error);
            return {};
        }
    }

    private async updateIndex(index: Record<string, string>): Promise<void> {
        const indexFile = new File(new TextEncoder().encode(JSON.stringify(index)));
        const indexFileUri = await this.ddcClient.store(this.bucketId, indexFile);
        await this.ddcNode.storeCnsRecord(this.bucketId, new CnsRecord(indexFileUri.cid, '__index__'));
    }
}