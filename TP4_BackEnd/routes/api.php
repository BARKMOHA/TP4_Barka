<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\SearchHistoryController;
use App\Http\Controllers\Api\MealPlanController;

use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{recipeId}', [FavoriteController::class, 'destroy']);


    Route::get('/history', [SearchHistoryController::class, 'index']);
    Route::post('/history', [SearchHistoryController::class, 'store']);

});



Route::get('/mealplan', [MealPlanController::class, 'index']);
Route::post('/mealplan', [MealPlanController::class, 'store']);
Route::delete('/mealplan/{id}', [MealPlanController::class, 'destroy']);
