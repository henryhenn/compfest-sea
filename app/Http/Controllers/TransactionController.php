<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Http\Resources\TransactionResource;
use App\Models\Ticket;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = TransactionResource::collection(
            Transaction::where('user_id', auth()->id())->latest()->get()
        );

        return inertia('Transaction/Transaction', compact('transactions'));
    }

    public function show(Transaction $transaction)
    {
        $userTicket = Ticket::with(['movie', 'seat'])->where('transaction_id', $transaction->id)->first();

        $transaction = new TransactionResource($transaction);
        $ticket = new TicketResource($userTicket);

        return inertia('Transaction/Ticket', compact('ticket', 'transaction'));
    }

    public function update(Transaction $transaction)
    {
        $transaction->update([
            'is_canceled' => true
        ]);

        return back()->with('message', 'Transaction was successfully canceled. Your balance has been refunded!');
    }
}
