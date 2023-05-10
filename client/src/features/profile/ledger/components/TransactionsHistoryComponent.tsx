import {TransactionItem} from "../page/TransactionItem";
import {LedgerTransaction} from "../../../../data/models/profile/GetLedgerTransactionsResponse";

export interface TransactionsHistoryProps {
    transactions: LedgerTransaction[]
}

export function TransactionsHistoryComponent({transactions}: TransactionsHistoryProps) {
    return <div className="w-fit h-fit border-2 border-[#4a5058] rounded-lg p-2 items-center">
        <h1 className="text-3xl text-white ml-4 mr-4 mt-2">Last ten transactions</h1>
        <div className="max-h-[calc(100vh-300px)] scrollbar overflow-y-scroll">
            {transactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction}/>)}
            {transactions.length === 0 && <p className="ml-4 mt-2 text-[#8fadc0]">No transactions found</p>}
        </div>
    </div>
}