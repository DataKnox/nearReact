import * as contract from "../../assembly"
import { u128, VMContext } from "near-sdk-as"

describe("testing our contract", () => {
    it("this returns text", () => {
        const MONEY_TO_SEND = u128.mul(u128.from("1000000000000000000000000"), u128.from(2))
        VMContext.setSigner_account_id("knoxtrades.testnet")
        VMContext.setAttached_deposit(MONEY_TO_SEND)
        contract.setText("hello world")
        const result = contract.getText()
        expect(result).toBe("hello world")
    })
})