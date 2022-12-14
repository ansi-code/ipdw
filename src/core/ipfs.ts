import * as Ipfs from 'ipfs-core';
import {KeyPair} from "./keypair";
import crypto from "crypto";

export class IPFSManager {
    private static instance: IPFSManager

    public ipfs: Ipfs.IPFS;

    public static async getInstance(): Promise<IPFSManager> {
        if (!IPFSManager.instance) {
            IPFSManager.instance = new IPFSManager();
            IPFSManager.instance.ipfs = await Ipfs.create({
                repo: 'ipfs-ipdw' + Math.random(),
                config: {
                    Addresses: {
                        Swarm: [
                            "/ip4/0.0.0.0/tcp/4002",
                            "/ip4/127.0.0.1/tcp/4003/ws",
                            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                            "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
                            "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/"
                        ]
                    }
                }
            })
        }

        return IPFSManager.instance;
    }

    //TODO: switch to a buffer content instead of string
    public async write(data: string): Promise<string> {
        const {cid} = await this.ipfs.add(data);
        return cid.toString();
    }

    public async read(cid: string): Promise<string> {
        const data = await this.ipfs.cat(cid);
        const decoder = new TextDecoder();
        let content = "";
        for await (const chunk of data) {
            content += decoder.decode(chunk);
        }
        return content;
    }

    public async writeNamed(data: string, privateKey: string): Promise<string> {
        const cid = await this.write(data);

        const publicKey = new KeyPair(privateKey).publicKey;
        const publicKeyHash = crypto.pbkdf2Sync(publicKey, 'ipdw', 1, 32, 'sha256').toString('hex');
        if (!(await this.ipfs.key.list()).find(e => e.name === publicKeyHash))
            await this.ipfs.key.import(publicKeyHash, privateKey, '');

        const {name} = await this.ipfs.name.publish(`/ipfs/${cid}`, {key: publicKeyHash})

        return name;
    }

    public async readNamed(privateKey: string): Promise<string> {
        const publicKey = new KeyPair(privateKey).publicKey;
        const publicKeyHash = crypto.pbkdf2Sync(publicKey, 'ipdw', 1, 32, 'sha256').toString('hex');
        if (!(await this.ipfs.key.list()).find(e => e.name === publicKeyHash))
            await this.ipfs.key.import(publicKeyHash, privateKey, '');

        const keyId = (await this.ipfs.key.list()).find(e => e.name === publicKeyHash)!.id;

        let content = "";
        for await (const cid of this.ipfs.name.resolve(keyId)) {
            content += await this.read(cid);
        }

        return content;
    }
}
