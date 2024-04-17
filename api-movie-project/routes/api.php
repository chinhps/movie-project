<?php

use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Information\InforController;
use App\Http\Controllers\Movie\CommentController;
use App\Http\Controllers\Movie\EpisodeController;
use App\Http\Controllers\Movie\MovieController;
use App\Http\Controllers\Movie\ReportController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LogoutController;
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

# AUTH
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

Route::middleware(['decryptToken:sanctum'])->prefix('user')->group(function () {
    # Get infor current user
    Route::get('/infor', [AuthController::class, 'getCurrentInfo']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::get("notification", []);
    # Logout
    Route::prefix('logout')->group(function () {
        # Logout current device
        Route::post('/',  [LogoutController::class, 'logout']);
        # Logout all device
        Route::post('/all',  [LogoutController::class, 'logoutAll']);
    });
    Route::get('notification', [NotificationController::class, 'list']);
});

Route::prefix("movies")->group(function () {
    Route::get("/", [MovieController::class, 'movies']);
    Route::get("latest", [MovieController::class, 'moviesLatest']);
    Route::get("ranking", [MovieController::class, 'moviesRanking']);

    Route::get("detail/{slug}", [MovieController::class, 'movieDetail']);

    Route::prefix("episode")->group(function () {
        Route::get("{slug}", [EpisodeController::class, 'episodeWatch']);
    });

    Route::middleware(['decryptToken:sanctum'])->group(function () {
        Route::post("report", [ReportController::class, 'createReport']);
        Route::post("bookmark", [ReportController::class, 'createReport']);
    });
});

Route::prefix("comments")->group(function () {
    Route::get("movie/{slug}", [CommentController::class, 'commentMovie']);
    Route::middleware(['decryptToken:sanctum'])->group(function () {
        Route::post("movie", [CommentController::class, 'addCommentMovie']);
    });
});

Route::prefix("categories")->group(function () {
    Route::get("/", [CategoryController::class, 'list']);
    Route::get("{slug}", [CategoryController::class, 'detail']);
});

Route::get('informations', [InforController::class, 'list']);
