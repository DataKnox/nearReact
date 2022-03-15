import { storage, context, u128 } from 'near-sdk-as'

export function setText(text: string): boolean {
    assert(context.attachedDeposit == u128.mul(
        u128.from("1000000000000000000000000"),
        u128.from(2)
    ))
    storage.set<string>("userText", text)
    return true
}

export function getText(): string {
    return storage.getPrimitive<string>("userText", "uh oh")
}