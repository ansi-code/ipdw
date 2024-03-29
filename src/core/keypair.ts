import forge from "node-forge";

export class KeyPair {
    public publicKey: string;
    public privateKey: string;

    constructor(privateKey: string, publicKey?: string) {
        this.privateKey = privateKey;
        if (publicKey)
            this.publicKey = publicKey;
        else {
            const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
            const publicKeyObj = forge.pki.setRsaPublicKey(privateKeyObj.n, privateKeyObj.e);
            this.publicKey = forge.pki.publicKeyToPem(publicKeyObj);
        }
    }

    public inflate(): KeyPair { //TODO: Fix here
        this.publicKey = this.publicKey
            .replace(/^-----BEGIN RSA PUBLIC KEY-----\n/, '')
            .replace(/\n-----END RSA PUBLIC KEY-----\n$/, '')
            .replace(/\n/g, '\\n');
        this.privateKey = this.privateKey
            .replace(/^-----BEGIN RSA PRIVATE KEY-----\n/, '')
            .replace(/\n-----END RSA PRIVATE KEY-----\n$/, '')
            .replace(/\n/g, '\\n');
        return this;
    }

    public deflate(): KeyPair {
        this.publicKey = this.publicKey
            .replace(/\\n/g, '\n')
            .replace(/^/, '-----BEGIN RSA PUBLIC KEY-----\n')
            .replace(/$/, '\n-----END RSA PUBLIC KEY-----\n');
        this.privateKey = this.privateKey
            .replace(/\\n/g, '\n')
            .replace(/^/, '-----BEGIN RSA PRIVATE KEY-----\n')
            .replace(/$/, '\n-----END RSA PRIVATE KEY-----\n');
        return this;
    }
}
