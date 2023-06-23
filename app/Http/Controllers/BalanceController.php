<?php

namespace App\Http\Controllers;

use App\Http\Resources\BalanceResource;
use App\Models\Balance;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    public function index()
    {
        $balance = new BalanceResource(Balance::query()
            ->where('user_id', auth()->id())
            ->first()
        );

        return inertia('Balance/Balance', compact('balance'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'store_balance' => 'required|numeric'
        ]);

        $userBalance = Balance::where('user_id', auth()->id())->first();

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

    public function update(Request $request, Balance $balance)
    {
        $request->validate([
            'withdraw_balance' => ['required', 'numeric', 'max:' . $balance->balance]
        ]);

        $balance->update([
            'balance' => $balance->balance - $request->integer('withdraw_balance')
        ]);

        return back()->with('message', 'Your withdrawal process completed!');
    }
}
