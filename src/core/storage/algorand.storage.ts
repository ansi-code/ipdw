import algosdk, {Account} from 'algosdk';

import {StorageProvider} from "./";
import {Buffer} from "buffer";

export const ALGORAND_SERVER_URL = (globalThis.localStorage?.WEB_ENV || process?.env.NODE_ENV) === 'dev' ? 'https://testnet-api.algonode.cloud' : 'https://mainnet-api.algonode.cloud';
export const ALGORAND_INDEXER_URL = (globalThis.localStorage?.WEB_ENV || process?.env.NODE_ENV) === 'dev' ? 'https://testnet-idx.algonode.cloud' : 'https://mainnet-idx.algonode.cloud';
export const ALGORAND_STORAGE_APPROVAL_CODE = 'I3ByYWdtYSB2ZXJzaW9uIDEwCnR4biBBcHBsaWNhdGlvbklECmludCAwCj09CmJueiBtYWluX2wxNAp0eG4gT25Db21wbGV0aW9uCmludCBOb09wCj09CmJueiBtYWluX2wxMQp0eG4gT25Db21wbGV0aW9uCmludCBEZWxldGVBcHBsaWNhdGlvbgo9PQpibnogbWFpbl9sMTAKdHhuIE9uQ29tcGxldGlvbgppbnQgVXBkYXRlQXBwbGljYXRpb24KPT0KYm56IG1haW5fbDkKdHhuIE9uQ29tcGxldGlvbgppbnQgT3B0SW4KPT0KYm56IG1haW5fbDgKdHhuIE9uQ29tcGxldGlvbgppbnQgQ2xvc2VPdXQKPT0KYm56IG1haW5fbDcKZXJyCm1haW5fbDc6CmludCAxCnJldHVybgptYWluX2w4OgppbnQgMQpyZXR1cm4KbWFpbl9sOToKaW50IDEKcmV0dXJuCm1haW5fbDEwOgppbnQgMQpyZXR1cm4KbWFpbl9sMTE6CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKYnl0ZSAic2V0Igo9PQpibnogbWFpbl9sMTMKZXJyCm1haW5fbDEzOgpjYWxsc3ViIHNldHZhbHVlXzAKcmV0dXJuCm1haW5fbDE0OgpieXRlICJuYW1lIgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCmFwcF9nbG9iYWxfcHV0CmludCAxCnJldHVybgoKLy8gc2V0X3ZhbHVlCnNldHZhbHVlXzA6CnByb3RvIDAgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmJveF9sZW4Kc3RvcmUgMQpzdG9yZSAwCmxvYWQgMQpibnogc2V0dmFsdWVfMF9sNApzZXR2YWx1ZV8wX2wxOgp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ5dGUgIiIKPT0KYm56IHNldHZhbHVlXzBfbDMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmxlbgpib3hfY3JlYXRlCnBvcAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYm94X3B1dAppbnQgMQpiIHNldHZhbHVlXzBfbDUKc2V0dmFsdWVfMF9sMzoKaW50IDEKYiBzZXR2YWx1ZV8wX2w1CnNldHZhbHVlXzBfbDQ6CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYm94X2RlbApwb3AKYiBzZXR2YWx1ZV8wX2wxCnNldHZhbHVlXzBfbDU6CnJldHN1Yg==';
export const ALGORAND_STORAGE_CLEAR_CODE = 'I3ByYWdtYSB2ZXJzaW9uIDEwCmludCAxCnJldHVybg==';
export const ALGORAND_TOKEN_UNIT = 1e6;
export const ALGORAND_CONTRACT_NAME = 'ipdw-v1';

export class AlgorandStorageProvider implements StorageProvider {
    private account: algosdk.Account;
    private readonly applicationId: number;
    private readonly client: algosdk.Algodv2;

    constructor(account: Account, applicationId: number, client: algosdk.Algodv2) {
        this.account = account;
        this.applicationId = applicationId;
        this.client = client;
    }

    public static async Init(privateKey: string): Promise<AlgorandStorageProvider> {
        const client = new algosdk.Algodv2('', ALGORAND_SERVER_URL, 443);
        const indexer = new algosdk.Indexer('', ALGORAND_INDEXER_URL, 443);

        const account = algosdk.mnemonicToSecretKey(algosdk.secretKeyToMnemonic(Buffer.from(privateKey.slice(2), 'hex')));
        console.log('ALGO Address is', account.addr);

        const accountInfo = await client.accountInformation(account.addr).do();
        const balance = accountInfo.amount / ALGORAND_TOKEN_UNIT;
        console.log('ALGO Balance is', balance);
        if (balance < 6) // 0.001 ALGO just for deploy
            throw Error('Keep at least 0.01 ALGO on the wallet');

        let resApplicationId = -1;
        let nextToken = '';
        do {
            // We can also use client.accountInformation too because it contains created-apps key
            const response = await indexer.searchForApplications()
                .creator(account.addr)
                .nextToken(nextToken)
                .do();

            for (const app of response.applications) {
                const globalState = app.params['global-state'];
                const nameKey = Buffer.from("name").toString('base64');
                const nameValue = globalState.find((item: any) => item.key === nameKey);

                if (nameValue && Buffer.from(nameValue.value.bytes, 'base64').toString() === ALGORAND_CONTRACT_NAME) {
                    resApplicationId = app.id;
                    break;
                }
            }

            nextToken = response['next-token'];
        } while (nextToken);

        if (resApplicationId === -1) {
            const appArgs = [
                new TextEncoder().encode(ALGORAND_CONTRACT_NAME)
            ];

            const compiledApprovalProgram = await client.compile(Buffer.from(ALGORAND_STORAGE_APPROVAL_CODE, 'base64')).do();
            const compiledClearProgram = await client.compile(Buffer.from(ALGORAND_STORAGE_CLEAR_CODE, 'base64')).do();
            const suggestedParams = await client.getTransactionParams().do();

            const txn = algosdk.makeApplicationCreateTxn(
                account.addr,
                suggestedParams,
                algosdk.OnApplicationComplete.NoOpOC,
                new Uint8Array(Buffer.from(compiledApprovalProgram.result, "base64")),
                new Uint8Array(Buffer.from(compiledClearProgram.result, "base64")),
                1,
                1,
                1,
                1,
                appArgs
            );

            const signedTxn = txn.signTxn(account.sk);
            const {txId} = await client.sendRawTransaction(signedTxn).do();
            const confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);

            resApplicationId = confirmedTxn["application-index"];
            console.log("Created Application ID:", resApplicationId);
        }

        const applicationAddress = algosdk.getApplicationAddress(resApplicationId);
        const applicationAccountInfo = await client.accountInformation(applicationAddress).do();
        const applicationBalance = applicationAccountInfo.amount / ALGORAND_TOKEN_UNIT;
        console.log('Application ALGO Balance is', applicationBalance);
        if (applicationBalance < 1) {
            const totalCost = 5 * ALGORAND_TOKEN_UNIT;
            const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: account.addr,
                to: applicationAddress,
                amount: totalCost,
                suggestedParams: await client.getTransactionParams().do(),
            })

            const signedTxn = txn.signTxn(account.sk);
            const {txId} = await client.sendRawTransaction(signedTxn).do();
            await algosdk.waitForConfirmation(client, txId, 4);
        }

        return new AlgorandStorageProvider(account, resApplicationId, client);
    }

    async set(key: string, value: Uint8Array | undefined): Promise<void> {
        const txn = algosdk.makeApplicationNoOpTxnFromObject({
            from: this.account.addr,
            appIndex: this.applicationId,
            appArgs: [new Uint8Array(Buffer.from('set')), new Uint8Array(Buffer.from(key)), new Uint8Array(value ?? [])],
            suggestedParams: await this.client.getTransactionParams().do(),
            boxes: [{name: new Uint8Array(Buffer.from(key)), appIndex: this.applicationId}]
        });

        const signedTxn = txn.signTxn(this.account.sk);
        const {txId} = await this.client.sendRawTransaction(signedTxn).do();
        await algosdk.waitForConfirmation(this.client, txId, 4);
    }

    async has(key: string): Promise<boolean> {
        const value = await this.get(key);
        return value !== undefined;
    }

    async get(key: string): Promise<Uint8Array | undefined> {
        try {
            const boxResponse = await this.client.getApplicationBoxByName(this.applicationId, Buffer.from(key)).do();
            return boxResponse.value;
        } catch (e: any) {
            if (e.message.includes('box not found')) {
                return undefined;
            }
            throw e;
        }
    }

    async ls(): Promise<string[]> {
        const boxes = await this.client.getApplicationBoxes(this.applicationId).do();
        return boxes.boxes.map((box) => Buffer.from(box.name).toString('utf8'));
    }

    async clear(): Promise<void> {
        const keys = await this.ls();
        await Promise.all(keys.map(key => this.set(key, undefined)));
    }
}
