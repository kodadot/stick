import type {Result, Option} from './support'

export type PalletAttributes = PalletAttributes_UsedToClaim | PalletAttributes_TransferDisabled

export interface PalletAttributes_UsedToClaim {
    __kind: 'UsedToClaim'
    value: number
}

export interface PalletAttributes_TransferDisabled {
    __kind: 'TransferDisabled'
}
