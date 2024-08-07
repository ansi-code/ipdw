[**ipdw**](../README.md) • **Docs**

***

[ipdw](../globals.md) / SignedPackFactory

# Class: SignedPackFactory

## Implements

- [`PackFactory`](../interfaces/PackFactory.md)

## Constructors

### new SignedPackFactory()

> **new SignedPackFactory**(`publicKey`, `privateKey`?): [`SignedPackFactory`](SignedPackFactory.md)

#### Parameters

• **publicKey**: `Buffer`

• **privateKey?**: `Buffer`

#### Returns

[`SignedPackFactory`](SignedPackFactory.md)

#### Defined in

[src/core/pack/signed-pack.factory.ts:10](https://github.com/ansi-code/ipdw/blob/01fadcc9abca9fbd90e38855b259b101aa727349/src/core/pack/signed-pack.factory.ts#L10)

## Methods

### decode()

> **decode**(`pack`): `Promise`\<`undefined` \| `Uint8Array`\>

#### Parameters

• **pack**: `Uint8Array`

#### Returns

`Promise`\<`undefined` \| `Uint8Array`\>

#### Implementation of

[`PackFactory`](../interfaces/PackFactory.md).[`decode`](../interfaces/PackFactory.md#decode)

#### Defined in

[src/core/pack/signed-pack.factory.ts:15](https://github.com/ansi-code/ipdw/blob/01fadcc9abca9fbd90e38855b259b101aa727349/src/core/pack/signed-pack.factory.ts#L15)

***

### encode()

> **encode**(`value`): `Promise`\<`Uint8Array`\>

#### Parameters

• **value**: `Uint8Array`

#### Returns

`Promise`\<`Uint8Array`\>

#### Implementation of

[`PackFactory`](../interfaces/PackFactory.md).[`encode`](../interfaces/PackFactory.md#encode)

#### Defined in

[src/core/pack/signed-pack.factory.ts:30](https://github.com/ansi-code/ipdw/blob/01fadcc9abca9fbd90e38855b259b101aa727349/src/core/pack/signed-pack.factory.ts#L30)
