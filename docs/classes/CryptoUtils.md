[**ipdw**](../README.md) • **Docs**

***

[ipdw](../globals.md) / CryptoUtils

# Class: CryptoUtils

## Constructors

### new CryptoUtils()

> **new CryptoUtils**(): [`CryptoUtils`](CryptoUtils.md)

#### Returns

[`CryptoUtils`](CryptoUtils.md)

## Methods

### DeriveKey()

> `static` **DeriveKey**(`seed`, `salt`): `Promise`\<`Buffer`\>

#### Parameters

• **seed**: `Buffer`

• **salt**: `Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[src/utils/crypto.utils.ts:9](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/crypto.utils.ts#L9)

***

### DeriveKeyPair()

> `static` **DeriveKeyPair**(`seed`, `salt`): `Promise`\<[`Buffer`, `Buffer`]\>

#### Parameters

• **seed**: `Buffer`

• **salt**: `Buffer`

#### Returns

`Promise`\<[`Buffer`, `Buffer`]\>

#### Defined in

[src/utils/crypto.utils.ts:18](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/crypto.utils.ts#L18)

***

### GetKeyPair()

> `static` **GetKeyPair**(`privateKey`): `Promise`\<[`Buffer`, `Buffer`]\>

#### Parameters

• **privateKey**: `Buffer`

#### Returns

`Promise`\<[`Buffer`, `Buffer`]\>

#### Defined in

[src/utils/crypto.utils.ts:13](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/crypto.utils.ts#L13)

***

### Sign()

> `static` **Sign**(`privateKey`, `payload`): `Promise`\<`Buffer`\>

#### Parameters

• **privateKey**: `Buffer`

• **payload**: `Buffer`

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[src/utils/crypto.utils.ts:29](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/crypto.utils.ts#L29)

***

### Verify()

> `static` **Verify**(`publicKey`, `signature`, `payload`): `Promise`\<`boolean`\>

#### Parameters

• **publicKey**: `Buffer`

• **signature**: `Buffer`

• **payload**: `Buffer`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/utils/crypto.utils.ts:23](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/crypto.utils.ts#L23)
