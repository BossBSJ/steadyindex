import { IndexOnTable } from "./indexOnTable.interface";

export interface Investment {
    index: IndexOnTable
    portValue: number
    investPerPeriod: number
    period: string
}