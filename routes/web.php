<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\OrderTicketController;
use App\Http\Controllers\ShowtimeController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name('home');
Route::resource('/movies', MovieController::class)->only('index', 'show');
Route::get('/showtimes', ShowtimeController::class)->name('showtimes');

Route::middleware('auth')->group(function () {
    Route::resource('balance', BalanceController::class)->only('index', 'store', 'update');

    Route::get('order-ticket/{movie:id}', [OrderTicketController::class, 'index'])->name('order-ticket.index');
    Route::post('order-ticket', [OrderTicketController::class, 'store'])->name('order-ticket.store');

    Route::resource('transactions', TransactionController::class)->only('index', 'show', 'update');
});

require __DIR__ . '/auth.php';
