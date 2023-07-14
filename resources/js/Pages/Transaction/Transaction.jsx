import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";
import {Heading} from "@/Components/Heading.jsx";
import {formatCurrency} from "@/Functions/FormatCurrency.jsx";
import {LinkButton} from "@/Components/LinkButton.jsx";
import {Alert} from "@/Components/Alert.jsx";
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";

export default function Transaction({transactions, session}) {
    const [state, setState] = useState(false)
    const [transaction, setTransaction] = useState(null)

    return (
        <MainLayout>
            <Head title="Transactions History"/>

            <div className="min-h-screen">
                <Heading title="Transactions History"/>

                <div className="mt-12 relative h-max overflow-auto">
                    {session.message && <Alert/>}

                    <table className="w-full table-auto text-left">
                        <thead className="text-gray-100 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">#</th>
                            <th className="py-3 pr-6">Date</th>
                            <th className="py-3 pr-6">Total Cost</th>
                            <th className="py-3 pr-6">See Ticket</th>
                            <th className="py-3 pr-6">Cancel Transaction/Canceled at</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-100 divide-y">
                        {transactions.length > 0 ?
                            transactions.map((transaction, key) => (
                                <tr key={key}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{key + 1}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{transaction.created_at}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {formatCurrency.format(transaction.total_cost)}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {!transaction.is_canceled ? (
                                            <LinkButton href={route('transactions.show', transaction)}
                                                        classname="font-medium hover:bg-gray-100 border-gray-100 hover:text-red-600">
                                                See Ticket
                                            </LinkButton>
                                        ) : (
                                            <p className="font-semibold">Transaction canceled</p>
                                        )}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {!transaction.is_canceled ? (
                                            <button
                                                onClick={e => {
                                                    setState(true)
                                                    setTransaction(transaction)
                                                }}
                                                className="block py-3 px-4 text-center text-gray-100 border hover-transition 600 rounded-lg shadow font-medium bg-red-600 border-red-600 hover:bg-red-700">
                                                Cancel
                                            </button>
                                        ) : (
                                            <p>Canceled at: <span
                                                className="font-semibold">{transaction.updated_at}</span></p>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td className="pr-6 py-4 whitespace-nowrap" colSpan="5">
                                        <h3 className="text-center font-bold text-2xl">Hmm...no transactions yet. Have
                                            you made at least one transaction?</h3>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {state? (
                <Modal transaction={transaction}>
                    <p className="font-bold text-xl mb-6">This can't be undone!</p>
                    <p>Are you sure to cancel transaction on <span className="font-semibold">{transaction.created_at}</span>?</p>
                </Modal>
            ) : ""}
        </MainLayout>
    )
}
