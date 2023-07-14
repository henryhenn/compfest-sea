<?php

namespace App\Http\Controllers;

use App\Http\Requests\BalanceRequest;
use App\Models\Balance;
use App\Services\UserBalanceCheckerService;

class BalanceController extends Controller
{
    public function index()
    {
        return inertia('Balance/Balance');
    }

    public function store(BalanceRequest $request)
    {
        $userBalance = Balance::where('user_id', auth()->id())->first();

        UserBalanceCheckerService::topup($request->validated(), $userBalance);
    }

    public function update(BalanceRequest $request, Balance $balance)
    {
        UserBalanceCheckerService::withdraw($request->validated(), $balance);

        return back()->with('message', 'Your withdrawal process completed!');
    }
}
