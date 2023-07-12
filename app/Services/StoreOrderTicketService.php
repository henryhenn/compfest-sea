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
                'total_cost' => $request->integer('ticket_price') * count($request->seat_numbers),
                'showtime_id' => $request->integer('showtime')
            ]);

            foreach ($request->seat_numbers as $seat_number) {
                Ticket::create([
                    'user_id' => auth()->id(),
                    'movie_id' => $request->integer('movie_id'),
                    'seat_id' => $seat_number,
                    'transaction_id' => $transaction->id
                ]);
            }

            foreach ($request->seat_numbers as $seat_number) {
                DB::table('showtime_seat')->insert([
                    'showtime_id' => $request->integer('showtime'),
                    'seat_id' => $seat_number,
                ]);
            }

            $userBalance->update([
                'balance' => $userBalance->balance - $request->integer('ticket_price') * count($request->seat_numbers)
            ]);
        });
    }
}
