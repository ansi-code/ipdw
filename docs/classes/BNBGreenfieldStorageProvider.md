[**ipdw**](../README.md) • **Docs**

***

[ipdw](../globals.md) / BNBGreenfieldStorageProvider

# Class: BNBGreenfieldStorageProvider

## Implements

- [`StorageProvider`](../interfaces/StorageProvider.md)

## Constructors

### new BNBGreenfieldStorageProvider()

> **new BNBGreenfieldStorageProvider**(`privateKey`, `address`, `bucketName`, `spEndpoint`, `client`): [`BNBGreenfieldStorageProvider`](BNBGreenfieldStorageProvider.md)

#### Parameters

• **privateKey**: `string`

• **address**: `string`

• **bucketName**: `string`

• **spEndpoint**: `string`

• **client**: `Client`

#### Returns

[`BNBGreenfieldStorageProvider`](BNBGreenfieldStorageProvider.md)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:28](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L28)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`StorageProvider`](../interfaces/StorageProvider.md).[`clear`](../interfaces/StorageProvider.md#clear)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:204](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L204)

***

### get()

> **get**(`key`): `Promise`\<`undefined` \| `Uint8Array`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`undefined` \| `Uint8Array`\>

#### Implementation of

[`StorageProvider`](../interfaces/StorageProvider.md).[`get`](../interfaces/StorageProvider.md#get)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:177](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L177)

***

### getAccountInfo()

> **getAccountInfo**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

##### address

> **address**: `string`

##### balance

> **balance**: `bigint`

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:107](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L107)

***

### has()

> **has**(`key`): `Promise`\<`boolean`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`StorageProvider`](../interfaces/StorageProvider.md).[`has`](../interfaces/StorageProvider.md#has)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:165](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L165)

***

### ls()

> **ls**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`StorageProvider`](../interfaces/StorageProvider.md).[`ls`](../interfaces/StorageProvider.md#ls)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:193](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L193)

***

### set()

> **set**(`key`, `value`): `Promise`\<`void`\>

#### Parameters

• **key**: `string`

• **value**: `undefined` \| `Uint8Array`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`StorageProvider`](../interfaces/StorageProvider.md).[`set`](../interfaces/StorageProvider.md#set)

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:115](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L115)

***

### Init()

> `static` **Init**(`privateKey`, `rpcUrl`, `chainId`, `bucketName`): `Promise`\<[`BNBGreenfieldStorageProvider`](BNBGreenfieldStorageProvider.md)\>

#### Parameters

• **privateKey**: `string`

• **rpcUrl**: `string` = `GREENFIELD_MAINNET_CHAIN_RPC_URL`

• **chainId**: `number` = `GREENFIELD_MAINNET_CHAIN_ID`

• **bucketName**: `string` = `GREENFIELD_DEFAULT_BUCKET_NAME`

#### Returns

`Promise`\<[`BNBGreenfieldStorageProvider`](BNBGreenfieldStorageProvider.md)\>

#### Defined in

[src/core/storage/bnbgreenfield.storage.ts:36](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/core/storage/bnbgreenfield.storage.ts#L36)
