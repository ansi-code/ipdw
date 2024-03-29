export interface StorageProvider {
    set(key: string, value: Uint8Array | undefined): Promise<void>;

    has(key: string): Promise<boolean>;

    get(key: string): Promise<Uint8Array | undefined>;

    ls(): Promise<string[]>;
}

export * from "./memory.storage"
export * from "./filesystem.storage"
export * from "./indexeddb.storage"

export * from "./stream.provider"

// See docs:
// MemoryStorageProvider is the transient implementation for both Node and Browser;
// FileSystemStorageProvider is the persistent implementation for Node;
// IndexedDBStorageProvider is the persistent implementation for Browser;
