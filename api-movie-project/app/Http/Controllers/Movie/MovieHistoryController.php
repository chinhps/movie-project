<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Repositories\MovieHistory\MovieHistoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MovieHistoryController extends Controller
{

    public function __construct(
        private MovieHistoryInterface $movieHistoryRepository
    ) {
    }

    public function list()
    {
        $user = Auth::user();
        return $this->movieHistoryRepository->list($user);
    }
}
