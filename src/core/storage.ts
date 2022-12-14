export interface StorageProvider {
    set(key: string, value: Buffer): Promise<void>;

    has(key: string): Promise<boolean>;

    get(key: string): Promise<Buffer | undefined>;

    ls(): Promise<string[]>;
}

export class MemoryStorageProvider implements StorageProvider {
    private storage: Map<string, Buffer>;

    constructor() {
        this.storage = new Map<string, Buffer>();
    }

    public async set(key: string, value: Buffer | undefined): Promise<void> {
        if (value)
            this.storage.set(key, value);
        else
            this.storage.delete(key);
    }

    public async has(key: string): Promise<boolean> {
        return this.storage.has(key);
    }

    public async get(key: string): Promise<Buffer | undefined> {
        return this.storage.get(key);
    }

    public async ls(): Promise<string[]> {
        return Array.from(this.storage.keys());
    }
}

// This is the implementation for Node
export class FileSystemStorageProvider implements StorageProvider {
    public async set(key: string, value: Buffer | undefined): Promise<void> {
    }

    public async has(key: string): Promise<boolean> {
        return false;
    }

    public async get(key: string): Promise<Buffer | undefined> {
        return undefined;
    }

    public async ls(): Promise<string[]> {
        return [];
    }
}

// This is the implementation for Browser
export class IndexedDBStorageProvider implements StorageProvider {
    public async set(key: string, value: Buffer | undefined): Promise<void> {
    }

    public async has(key: string): Promise<boolean> {
        return false;
    }

    public async get(key: string): Promise<Buffer | undefined> {
        return undefined;
    }

    public async ls(): Promise<string[]> {
        return [];
    }
}
