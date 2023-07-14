<?php

namespace App\Services;

use App\Models\Balance;

class UserBalanceCheckerService
{
    public static function topup(array $request, $userBalance = null)
    {
        if ($userBalance) {
            $userBalance->update([
                'balance' => $userBalance->balance + $request['balance']
            ]);

            return back()->with('message', 'Your topup process completed!');
        } else {
            Balance::create([
                'user_id' => auth()->id(),
                'balance' => $request['balance'],
            ]);

            return back()->with('message', 'Your topup process completed!');
        }
    }

    public static function withdraw(array $request, Balance $balance)
    {
        $balance->update([
            'balance' => $balance->balance - $request['balance']
        ]);
    }
}
