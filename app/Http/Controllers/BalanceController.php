<?php

namespace App\Http\Controllers;

use App\Http\Resources\BalanceResource;
use App\Models\Balance;
use App\Services\UserBalanceCheckerService;
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

        UserBalanceCheckerService::check($request, $userBalance);
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
