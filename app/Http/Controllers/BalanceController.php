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
        return inertia('Balance/Balance');
    }

    public function store(Request $request)
    {
        $request->validate([
            'balance' => 'required|numeric'
        ]);

        $userBalance = Balance::where('user_id', auth()->id())->first();

        UserBalanceCheckerService::check($request, $userBalance);
    }

    public function update(Request $request, Balance $balance)
    {
        $request->validate([
            'balance' => ['required', 'numeric', 'max:' . $balance->balance]
        ]);

        $balance->update([
            'balance' => $balance->balance - $request->integer('balance')
        ]);

        return back()->with('message', 'Your withdrawal process completed!');
    }
}
