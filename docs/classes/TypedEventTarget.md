[**ipdw**](../README.md) • **Docs**

***

[ipdw](../globals.md) / TypedEventTarget

# Class: TypedEventTarget\<M\>

## Extends

- `EventTarget`

## Type Parameters

• **M** *extends* `ValueIsEvent`\<`M`\>

## Constructors

### new TypedEventTarget()

> **new TypedEventTarget**\<`M`\>(): [`TypedEventTarget`](TypedEventTarget.md)\<`M`\>

#### Returns

[`TypedEventTarget`](TypedEventTarget.md)\<`M`\>

#### Defined in

node\_modules/typescript/lib/lib.dom.d.ts:8320

## Properties

### addEventListener()

> **addEventListener**: \<`T`\>(`type`, `listener`, `options`?) => `void`

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **type**: `T`

• **listener**: `null` \| `TypedEventListenerOrEventListenerObject`\<`M`, `T`\>

• **options?**: `boolean` \| `AddEventListenerOptions`

#### Returns

`void`

#### Defined in

[src/utils/event.utils.ts:18](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/event.utils.ts#L18)

***

### dispatchEvent()

> **dispatchEvent**: (`event`) => `boolean`

#### Parameters

• **event**: `Event`

#### Returns

`boolean`

#### Defined in

[src/utils/event.utils.ts:29](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/event.utils.ts#L29)

***

### removeEventListener()

> **removeEventListener**: \<`T`\>(`type`, `callback`, `options`?) => `void`

#### Type Parameters

• **T** *extends* `string`

#### Parameters

• **type**: `T`

• **callback**: `null` \| `TypedEventListenerOrEventListenerObject`\<`M`, `T`\>

• **options?**: `boolean` \| `EventListenerOptions`

#### Returns

`void`

#### Defined in

[src/utils/event.utils.ts:24](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/event.utils.ts#L24)

## Methods

### dispatchTypedEvent()

> **dispatchTypedEvent**\<`T`\>(`_type`, `event`): `boolean`

#### Type Parameters

• **T** *extends* `string` \| `number` \| `symbol`

#### Parameters

• **\_type**: `T`

• **event**: `M`\[`T`\]

#### Returns

`boolean`

#### Defined in

[src/utils/event.utils.ts:33](https://github.com/humandataincome/ipdw/blob/cffd44f47ee394d38eaa57c50e77342565775d5e/src/utils/event.utils.ts#L33)
