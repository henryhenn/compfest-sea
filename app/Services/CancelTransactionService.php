<?php

namespace App\Services;

use App\Models\Showtime;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class CancelTransactionService
{
    public static function cancel(Transaction $transaction, object $userBalance)
    {
        return DB::transaction(function () use ($transaction, $userBalance) {
            $userBalance->update(['balance' => $userBalance->balance + $transaction->total_cost]);

            $transaction->update(['is_canceled' => 1]);

            $transaction->tickets()->delete();

            Showtime::query()
                ->find($transaction->showtime_id)
                ->seats()
                ->detach();
        });
    }
}
