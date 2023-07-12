<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Http\Resources\TransactionResource;
use App\Models\Balance;
use App\Models\Showtime;
use App\Models\Ticket;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function index()
    {
        $transactions = TransactionResource::collection(
            Transaction::query()
                ->where('user_id', auth()->id())
                ->latest()
                ->get()
        );

        return inertia('Transaction/Transaction', compact('transactions'));
    }

    /**
     * @param Transaction $transaction
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    public function show(Transaction $transaction)
    {
        if (count($transaction->tickets) == 0) abort(404);

        $tickets = TicketResource::collection(
            Ticket::query()
                ->whereHas('transaction', fn($query) => $query->where('id', $transaction->id))
                ->get()
        );

        return inertia('Transaction/Ticket', compact('tickets'));
    }

    /**
     * @param Transaction $transaction
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Transaction $transaction)
    {
        $userBalance = Balance::query()
            ->where('user_id', auth()->id())
            ->first();

        DB::transaction(function () use ($transaction, $userBalance) {
            $userBalance->update(['balance' => $userBalance->balance + $transaction->total_cost]);

            $transaction->update(['is_canceled' => 1]);

            $transaction->ticket()->delete();

            Showtime::query()
                ->find($transaction->showtime_id)
                ->seats()
                ->detach();
        });

        return back()->with('message', 'Transaction was successfully canceled. Your balance has been refunded!');
    }
}
