import MainLayout from "@/Layouts/MainLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import {Heading} from "@/Components/Heading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Alert} from "@/Components/Alert.jsx";
import InputError from "@/Components/InputError.jsx";
import {formatCurrency} from '@/Functions/FormatCurrency.jsx'

export default function Balance({auth, session}) {
    const {post, processing, setData, errors, put} = useForm({
        balance: null
    });

    const submitBalance = e => {
        e.preventDefault()
        post(route('balance.store'), {
            preserveScroll: true,
        })
    }

    const withdrawBalance = e => {
        e.preventDefault()
        put(route('balance.update', auth.user.balance.id), {
            preserveScroll: true,
            preserveState: true
        })
    }

    return (
        <MainLayout>
            <Head title="Your Balance"/>

            <div className="min-h-screen">
                <Heading title="Your Balance"/>

                {session.message && <Alert/>}

                <div
                    className="w-full flex mx-auto mt-4 shadow-lg shadow-gray-700 rounded-md">
                    <div className="pt-3 ml-4 mr-2 mb-3">
                        <h2 className="text-4xl group-hover:text-red-600 hover-transition font-bold text-gray-100">
                            {auth.user.name}
                        </h2>
                        <p className="text-sm mt-1 font-semibold">{auth.user.username}</p>
                        <div className="mt-6 text-lg">
                            <p className="text-gray-100">Your balance right now: <span
                                className="font-semibold">{formatCurrency.format(auth.user.balance ? auth.user.balance.balance : 0)}</span>
                            </p>
                        </div>

                    </div>
                </div>

                <div
                    className="w-full flex mx-auto mt-20 items-center shadow-md shadow-gray-700 rounded-md">
                    <div className="pt-3 ml-4 mr-2 pb-3 flex flex-col gap-6 md:gap-10 md:flex-row">
                        <h3 className="text-2xl font-semibold">Topup Your Balance Here: </h3>
                        <div className="flex flex-col">
                            <form method="post" onSubmit={submitBalance} className="inline-flex">
                                <TextInput
                                    type="number"
                                    name="balance"
                                    onChange={e => setData('balance', e.target.value)}
                                />

                                <PrimaryButton disabled={processing} className="ml-4">Submit</PrimaryButton>
                            </form>

                            {errors.balance && <InputError message={errors.balance} className="mt-2"/>}
                        </div>
                    </div>
                </div>

                <div
                    className="w-full flex mx-auto mt-20 items-center shadow-md shadow-gray-700 rounded-md">
                    <div className="pt-3 ml-4 mr-2 pb-3 flex flex-col gap-6 md:gap-10 md:flex-row">
                        <h3 className="text-2xl font-semibold">Withdraw Your Balance Here: </h3>
                        <div className="flex flex-col">
                            <form method="post" onSubmit={withdrawBalance} className="inline-flex">
                                <TextInput
                                    type="number"
                                    name="balance"
                                    onChange={e => setData('balance', e.target.value)}
                                />

                                <PrimaryButton disabled={processing} className="ml-4">Submit</PrimaryButton>
                            </form>

                            {errors.balance && <InputError message={errors.balance} className="mt-2"/>}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
