<?php

namespace App\Services;

use App\Models\Balance;
use App\Models\Ticket;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StoreOrderTicketService
{
    public static function order(Request $request)
    {
        $userBalance = Balance::where('user_id', auth()->id())->first();

        return DB::transaction(function () use ($request, $userBalance) {
            $transaction = Transaction::create([
                'user_id' => auth()->id(),
                'total_cost' => $request->integer('ticket_price')
            ]);

            Ticket::create([
                'user_id' => auth()->id(),
                'movie_id' => $request->integer('movie_id'),
                'seat_id' => $request->integer('seat_number'),
                'transaction_id' => $transaction->id
            ]);

            DB::table('showtime_seat')->insert([
                'showtime_id' => $request->integer('showtime'),
                'seat_id' => $request->integer('seat_number'),
            ]);

            $userBalance->update(['balance' => $userBalance->balance - $request->integer('ticket_price')]);
        });
    }
}
