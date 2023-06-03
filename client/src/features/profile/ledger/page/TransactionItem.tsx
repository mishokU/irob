import {LedgerTransaction} from "../../../../data/models/profile/GetLedgerTransactionsResponse";

export interface TransactionItemProps {
    transaction: LedgerTransaction
}

export function TransactionItem({transaction}: TransactionItemProps) {
    const link = `https://sepolia.etherscan.io/address/${transaction.contractAddress}`
    return <div className="pl-4 pr-8 pt-2 pb-2 space-y-2">
        <div className="flex items-center space-x-2">
            <h1>From:</h1>
            <h2 className="text-sm">{transaction.from}</h2>
        </div>
        {!transaction.isContractCreation && <div className="flex items-center space-x-2">
            <h1>To:</h1>
            <h2 className="text-sm">{transaction.to}</h2>
        </div>}
        {transaction.isContractCreation && <div className="flex items-center space-x-2">
            <h1>Creation: </h1>
            <a target="_blank" href={link} className="hover:underline sm:underline text-sm">{transaction.contractAddress}</a>
        </div>}
        <div className="flex justify-between">
            <div className="flex items-center space-x-2">
                <h1>Date:</h1>
                <h1>{transaction.date}</h1>
            </div>
            <div className="flex items-center space-x-2">
                <h1>Price:</h1>
                <h1>{transaction.value}</h1>
            </div>
        </div>
        <div className="w-full h-0.5 bg-[#4a5058] mt-2"/>
    </div>
}