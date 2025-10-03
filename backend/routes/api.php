<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ProfileController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/recommendations', [ApiController::class, 'recommendations']);
    Route::post('/swipe', [ApiController::class, 'swipe']);
    Route::get('/likes', [ApiController::class, 'liked']);
    Route::put('/profile', [ProfileController::class, 'update']);
});
