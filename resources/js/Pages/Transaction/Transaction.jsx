import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head} from "@inertiajs/react";
import {Heading} from "@/Components/Heading.jsx";
import {formatCurrency} from "@/Components/FormatCurrency.jsx";
import {LinkButton} from "@/Components/LinkButton.jsx";
import {Alert} from "@/Components/Alert.jsx";

export default function Transaction({transactions, session}) {
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
                                        <LinkButton href={route('transactions.update', transaction)}
                                                    classname="font-medium hover:bg-gray-100 border-gray-100 hover:text-red-600">
                                            See Ticket
                                        </LinkButton>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {transaction.is_canceled === 0 ? (
                                            <LinkButton href={route('transactions.update', transaction)} method="put"
                                                        onClick={e => confirm("Are you sure?")}
                                                        disabled={transaction.is_canceled}
                                                        classname="font-medium bg-red-600 border-red-600 hover:bg-red-700">
                                                Cancel
                                            </LinkButton>) : (
                                            transaction.updated_at
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

        </MainLayout>
    )
}
