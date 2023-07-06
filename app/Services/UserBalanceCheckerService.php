<?php

namespace App\Services;

use App\Models\Balance;
use Illuminate\Http\Request;

class UserBalanceCheckerService
{
    public static function check(Request $request, $userBalance = null)
    {
        if ($userBalance) {
            $userBalance->update([
                'balance' => $userBalance->balance + $request->integer('store_balance')
            ]);

            return back()->with('message', 'Your topup process completed!');
        } else {
            Balance::create([
                'user_id' => auth()->id(),
                'balance' => $request->integer('store_balance'),
            ]);

            return back()->with('message', 'Your topup process completed!');
        }
    }
}
