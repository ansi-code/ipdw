import {FileSystemStorageProvider, IndexedDBStorageProvider, MemoryStorageProvider, Persistence, StreamProvider} from "../src";

import "fake-indexeddb/auto";

describe("Storage tests", async () => {
    it("Check MemoryStorageProvider", async () => {
        const storage = new MemoryStorageProvider();

        let res;
        await storage.set("key1", new TextEncoder().encode("value1"));

        res = await storage.ls();
        console.log(res);

        res = await storage.has("key1");
        console.log(res);

        res = await storage.get("key1");
        console.log(new TextDecoder().decode(res));
    });

    it("Check FileSystemStorageProvider", async () => {
        const storage = new FileSystemStorageProvider();

        let res;
        await storage.set("key1", new TextEncoder().encode("value1"));

        res = await storage.ls();
        console.log(res);

        res = await storage.has("key1");
        console.log(res);

        res = await storage.get("key1");
        console.log(new TextDecoder().decode(res));
    });

    it("Check IndexedDBStorageProvider", async () => {
        const storage = await IndexedDBStorageProvider.Init();

        let res;
        await storage.set("key1", new TextEncoder().encode("value1"));

        res = await storage.ls();
        console.log(res);

        res = await storage.has("key1");
        console.log(res);

        res = await storage.get("key1");
        console.log(new TextDecoder().decode(res));
    });

    it("Check StreamProvider", async () => {
        const storage = new MemoryStorageProvider();
        //const storage = new FileSystemStorageProvider();
        //const storage = await IndexedDBStorageProvider.Init();
        const stream = new StreamProvider(storage);

        let res;
        res = (await stream.getWritable("key1", 3, true)).getWriter();
        await res.write(new TextEncoder().encode("va"));
        await res.write(new TextEncoder().encode("lue1"));
        await res.close();

        res = await stream.has("key1");
        console.log(res);

        res = (await stream.getReadable("key1", 2)).getReader();
        let chunk;
        while (!(chunk = await res.read()).done) {
            console.log('chunk:', new TextDecoder().decode(chunk.value));
        }
    });

    it("Check IPFS streamed storage", async () => {
        const cid = "QmecpDvGdWfcKw7BM4nxyEb7TB856sTY1MqY1dCR45rWjv";
        const persistence = await Persistence.getInstance();
        const data = await persistence.fetchOrGet("ipfs://" + cid, console.log);
        console.log(data);
    }).timeout(60000);

    it("Check HTTPS streamed storage", async () => {
        const url = "https://gateway.pinata.cloud/ipfs/QmecpDvGdWfcKw7BM4nxyEb7TB856sTY1MqY1dCR45rWjv";
        const persistence = await Persistence.getInstance();
        const data = await persistence.fetchOrGet(url, console.log);
        console.log(data);
    }).timeout(60000);
});
