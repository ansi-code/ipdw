import {Buffer} from "buffer";
import {E2EManager, IPFSManager, StorageProvider, Vault} from "../core";

export class IPDW {
    private readonly token: string;
    private readonly privateKey: string;
    private storage: StorageProvider;

    constructor(token: string, storage: StorageProvider) {
        this.token = token;
        this.privateKey = E2EManager.generateKeyPair(this.token).privateKey;
        this.storage = storage;
    }

    public static async create(sign: (msg: string) => Promise<string>, nonce: string = 'Global', storage: StorageProvider): Promise<IPDW> {
        // Lazy initialize IPFS node
        return new IPDW(await sign(`Login to your InterPlanetary Data Wallet (${nonce})`), storage);
    }

    public async pull(): Promise<void> {
        const ipfs = await IPFSManager.getInstance();
        await this.storage.set('data', Buffer.from(await ipfs.readNamed(this.privateKey), 'base64'));
    }

    public async push(): Promise<void> {
        const ipfs = await IPFSManager.getInstance();
        await ipfs.writeNamed(Buffer.from((await this.storage.get('data'))!).toString('base64'), this.privateKey);
    }

    public async sync(): Promise<void> {
        //TODO: update from remote is timestamp is more than local one
    }

    public async getString(type: 'PLAIN' | 'ENCRYPTED', nonce: string = 'Global'): Promise<string> {
        return (await this.getData(type, nonce)).toString('utf-8');
    }

    public async setString(data: string, type: 'PLAIN' | 'ENCRYPTED', nonce: string = 'Global'): Promise<void> {
        return await this.setData(Buffer.from(data, 'utf-8'), type, nonce);
    }

    public async getData(type: 'PLAIN' | 'ENCRYPTED', nonce: string = 'Global'): Promise<Buffer> {
        const data = (await this.storage.get('data'))!;

        switch (type) {
            case 'PLAIN':
                return Buffer.from(data);
            case 'ENCRYPTED':
                return await Vault.unlock(Buffer.from(data), `${this.token}${nonce}`);
        }
    }

    public async setData(data: Buffer, type: 'PLAIN' | 'ENCRYPTED', nonce: string = 'Global'): Promise<void> {
        switch (type) {
            case 'PLAIN':
                await this.storage.set('data', data);
                break;
            case 'ENCRYPTED':
                await this.storage.set('data', await Vault.lock(data, `${this.token}${nonce}`));
                break;
        }
    }

    public async addMessageListener(type: 'PLAIN' | 'ENCRYPTED', nonce: string, listener: (msg: string) => void) {
        const ipfs = await IPFSManager.getInstance();

        await ipfs.addPubSubListener(nonce, (msg) => listener(msg))
    }

    public async removeAllMessageListeners(): Promise<void> {
        const ipfs = await IPFSManager.getInstance();

        await ipfs.removeAllPubSubListeners();
    }

    public async sendMessage(type: 'PLAIN' | 'ENCRYPTED', nonce: string, message: string) {
        const ipfs = await IPFSManager.getInstance();

        await ipfs.sendPubSubMessage(nonce, message);
    }
}
