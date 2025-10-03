<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/recommendations', [ApiController::class, 'recommendations']);
    Route::post('/swipe', [ApiController::class, 'swipe']);
    Route::get('/likes', [ApiController::class, 'liked']);
});