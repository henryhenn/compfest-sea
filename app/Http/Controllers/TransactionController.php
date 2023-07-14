<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Http\Resources\TransactionResource;
use App\Models\Balance;
use App\Models\Ticket;
use App\Models\Transaction;
use App\Services\CancelTransactionService;

class TransactionController extends Controller
{
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

    public function update(Transaction $transaction)
    {
        $userBalance = Balance::query()
            ->where('user_id', auth()->id())
            ->first();

        CancelTransactionService::cancel($transaction, $userBalance);

        return back()->with('message', 'Transaction was successfully canceled. Your balance has been refunded!');
    }
}
