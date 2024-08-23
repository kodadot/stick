import { Optional } from "@kodadot1/metasquid/types"
import { describe, expect, it } from 'vitest'

export type SwapData = {
  price: Optional<bigint>,
  surcharge: Optional<Surcharge>,
  deadline: number,
}

export enum Surcharge {
  Receive = "Receive",
  Send = "Send",
}

describe('Misc', () => {
  function isOffer(event: SwapData): boolean {
    return Boolean(event.price && event.price > 0n && event.surcharge === 'Send')
  }
  // let store: SquidStore;


  describe('isOffer', () => {
    it('should be valid offer', () => {
      const swapdata: SwapData = {
        price: BigInt(1e10),
        surcharge: Surcharge.Send,
        deadline: 0
      }
      const value = isOffer(swapdata)
      expect(value).toBe(true)
    })

    it('should be invalid offer (bad surchage)', () => {
      const swapdata: SwapData = {
        price: BigInt(1e10),
        surcharge: Surcharge.Receive,
        deadline: 0
      }
      const value = isOffer(swapdata)
      expect(value).toBe(false)
    })

    it('should be invalid offer (bad surchage)', () => {
      const swapdata: SwapData = {
        price: undefined,
        surcharge: Surcharge.Send,
        deadline: 0
      }
      const value = isOffer(swapdata)
      expect(value).toBe(false)
    })
  })
})
