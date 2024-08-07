/*
Wallet(IPDW TEST) - Address: 0xB5ea1eC38f0547004d5841a2FB5F33Ee07113Bcf - Private key: 0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f
 */

import {ALGORAND_TESTNET_INDEXER_URL, ALGORAND_TESTNET_SERVER_URL, AlgorandStorageProvider, DataWallet, IPDWStorageProvider, MemoryStorageProvider} from "ipdw";

async function main(): Promise<void> {
    const provider = await IPDWStorageProvider.Init('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f', new MemoryStorageProvider());
    const dataWallet = await DataWallet.Create('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f', provider);

    setInterval(async () => {
        try {
            const randomString = (Math.random() + 1).toString(36).substring(2);
            await dataWallet.set(randomString, 'value');
            console.log('keys', JSON.stringify(await dataWallet.keys()));
        } catch (e) {
            console.error(e);
        }
    }, 1000);
}

async function main1(): Promise<void> {
    const provider = await AlgorandStorageProvider.Init('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f', ALGORAND_TESTNET_SERVER_URL, ALGORAND_TESTNET_INDEXER_URL);
    //const provider = await BNBGreenfieldStorageProvider.Init('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f', GREENFIELD_TESTNET_CHAIN_RPC_URL, GREENFIELD_TESTNET_CHAIN_ID);
    //const provider = await IPFSStorageProvider.Init('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f');
    //const provider = await CereStorageProvider.Init('hybrid label reunion only dawn maze asset draft cousin height flock nation', CERE_TESTNET_RPC_URL, CERE_TESTNET_INDEXER_URL);
    //const provider = await IPDWStorageProvider.Init('0xb577c4367d79f1a7a0c8353f7937d601758d92c35df958781d72d70f9177e52f', new MemoryStorageProvider());

    console.log('set', await provider.set("myKey", new TextEncoder().encode("myValue")))
    console.log('get', new TextDecoder().decode(await provider.get("myKey")));
    console.log('has', await provider.has("myKey"));
    console.log('ls', await provider.ls());
    console.log('clear', await provider.clear());
    console.log('has not', await provider.has("myKey"));
}

main()
    //.then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
