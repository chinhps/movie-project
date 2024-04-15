<?php

use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Movie\CommentController;
use App\Http\Controllers\Movie\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("movies")->group(function () {
    Route::get("/", [MovieController::class, 'movies']);
    Route::get("latest", [MovieController::class, 'moviesLatest']);
    Route::get("ranking", [MovieController::class, 'moviesRanking']);

    Route::get("detail/{slug}", [MovieController::class, 'movieDetail']);
});

Route::prefix("comments")->group(function () {
    Route::get("movie/{slug}", [CommentController::class, 'commentMovie']);
});

Route::prefix("categories")->group(function () {
    Route::get("/", [CategoryController::class, 'list']);
    Route::get("{slug}", [CategoryController::class, 'detail']);
});
