import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { DCA_MANAGER_CONTRACT_ABI } from "../constants/abi";
import { DCA_MANAGER_CONTRACT_ADDRESS } from "../constants/constants";
import { IndexOnTable } from "../interfaces/indexOnTable.interface";
import { Investment } from "../interfaces/investment.interface";
import { useIndexTokenFactory } from "./useIndexTokenFactory";

interface InvestAccount  {
    trusted: Address;
    tokenIn: Address;
    tokenInAmount: BigNumber;
    indexTokenAddr: Address;
    lastBuy: BigNumber;
    cycle: BigNumber;
}

export const useInvestment = (accountAddress?:Address) => {

    const [investAccount, setInvestAccount] = useState<readonly InvestAccount[]>()
    const [investmentIndex, setInvestmentIndex] = useState<Investment[]>()
    const [indexInvestAddress, setIndexInvestAddress] = useState<Address[]>()
    const [index, setIndex] = useState<IndexOnTable[]>()

    useEffect(() => {
        if(!accountAddress) return
        const investmentsForAccount = async () => {
            if(!accountAddress) return
            const getInvestmentsForAccount = await readContract({
                address: DCA_MANAGER_CONTRACT_ADDRESS,
                abi: DCA_MANAGER_CONTRACT_ABI,
                functionName:"InvestmentsForAccount",
                args: [accountAddress]
            })       

            let indexInvestAddress:Address[] = []
            for(let i = 0; i < getInvestmentsForAccount.length; i++){
                indexInvestAddress.push(getInvestmentsForAccount[i].indexTokenAddr)
            }
            setIndexInvestAddress(indexInvestAddress)
            setInvestAccount(getInvestmentsForAccount)
        }
        investmentsForAccount()

    }, [accountAddress])

    const getIndex = useIndexTokenFactory(indexInvestAddress)
    useEffect(() => {
        if(!getIndex) return
        setIndex(getIndex.index)
    }, [getIndex])

    useEffect(() => {
        if(!index || !investAccount) return

        let investmentIndex:Investment[] = []
        for(let i = 0; i < index.length; i++){
            const portValue = 0
            const investPerPeriod = Number(investAccount[i].tokenInAmount._hex) / 10**6
            const period = () => {
                const cycleSecond = Number(investAccount[i].cycle._hex)
                if(cycleSecond === 86400)
                    return "Day"
                else if(cycleSecond === 604800)
                    return "Weekly"
                else if(cycleSecond === 2592000)
                    return "Monthly"
                else
                    return ""
            }

            investmentIndex.push({
                index: index[i],
                portValue: portValue,
                investPerPeriod: investPerPeriod,
                period: period()
            })
        }
        setInvestmentIndex(investmentIndex)
    }, [index,investAccount])

    return { investmentIndex }
}