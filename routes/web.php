<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowtimeController;
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
});

require __DIR__ . '/auth.php';
