import {sts, Result, Option, Bytes, BitSequence} from './support'

export const PalletAttributes: sts.Type<PalletAttributes> = sts.closedEnum(() => {
    return  {
        TransferDisabled: sts.unit(),
        UsedToClaim: sts.number(),
    }
})

export type PalletAttributes = PalletAttributes_TransferDisabled | PalletAttributes_UsedToClaim

export interface PalletAttributes_TransferDisabled {
    __kind: 'TransferDisabled'
}

export interface PalletAttributes_UsedToClaim {
    __kind: 'UsedToClaim'
    value: number
}
