<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class StoreOrderTicketService
{
    public static function order(array $request, $userBalance)
    {
        return DB::transaction(function () use ($request, $userBalance) {
            $transaction = Transaction::create([
                'user_id' => auth()->id(),
                'total_cost' => $request['ticket_price'] * count($request['seat_numbers']),
                'showtime_id' => $request['showtime']
            ]);

            foreach ($request['seat_numbers'] as $seat_number) {
                Ticket::create([
                    'user_id' => auth()->id(),
                    'movie_id' => $request['movie_id'],
                    'seat_id' => $seat_number,
                    'transaction_id' => $transaction->id
                ]);
            }

            foreach ($request['seat_numbers'] as $seat_number) {
                DB::table('showtime_seat')->insert([
                    'showtime_id' => $request['showtime'],
                    'seat_id' => $seat_number,
                ]);
            }

            $userBalance->update([
                'balance' => $userBalance->balance - $request['ticket_price'] * count($request['seat_numbers'])
            ]);
        });
    }
}
