<?php

namespace Tests\Feature;

use App\Models\Balance;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BalanceTest extends TestCase
{
    use RefreshDatabase;

    protected function getUser()
    {
        return User::factory()->create();
    }

    public function test_only_auth_user_can_access_balance_page()
    {
        $response = $this->get(route('balance.index'));

        $response->assertStatus(Response::HTTP_FOUND);
    }

    public function test_auth_user_can_see_their_balance()
    {
        $user = $this->getUser();

        $response = $this->actingAs($user)->get(route('balance.index'));

        $response->assertStatus(Response::HTTP_OK);
        $response->assertInertia(fn(Assert $inertia) => $inertia
            ->component('Balance/Balance', fn(Assert $inertia) => $inertia
                ->has('auth', fn(Assert $inertia) => $inertia
                    ->has('user.name', fn(Assert $inertia) => $inertia
                        ->where('user.name', $user->name)
                        ->where('user.username', $user->username)
                    )
                    ->has('user.balance', fn(Assert $inertia) => $inertia
                        ->where('user.balance.balance', $user->balance->balance)
                    )
                )
                ->has('balance')
                ->has('session')
            )
        );
    }

    public function test_auth_user_can_topup_their_balance()
    {
        $user = $this->getUser();

        $balanceData = [
            'user_id' => $user->id,
            'balance' => 150000
        ];

        $response = $this->actingAs($user)->post(route('balance.store'), $balanceData);

        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('balances', $balanceData);
    }

    public function test_auth_user_can_withdraw_their_balance()
    {
        $user = $this->getUser();

        $balanceData = Balance::create([
            'user_id' => $user->id,
            'balance' => 150000
        ]);

        $response = $this->actingAs($user)->put(route('balance.update', $balanceData->id), [
            'user_id' => $user->id,
            'balance' => 20000
        ]);

        $response->assertStatus(Response::HTTP_FOUND);
        $this->assertDatabaseHas('balances', [
            'user_id' => $user->id,
            'balance' => $balanceData->balance - 20000
        ]);
    }
}
