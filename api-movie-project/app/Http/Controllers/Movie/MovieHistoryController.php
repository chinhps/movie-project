<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\MovieHistoryRequest;
use App\Http\Resources\Movie\MovieHistoryAccountResource;
use App\Http\Resources\Movie\MovieHistoryResource;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use App\Repositories\MovieHistory\MovieHistoryInterface;
use Illuminate\Support\Facades\Auth;

class MovieHistoryController extends Controller
{
    public function __construct(
        private MovieHistoryInterface $movieHistoryRepository,
        private MovieEpisodeInterface $movieEpisodeRepository
    ) {}

    public function listAccount()
    {
        $user = Auth::user();

        return MovieHistoryAccountResource::collection($this->movieHistoryRepository->list($user));
    }

    public function listClient(MovieHistoryRequest $request)
    {
        /**
         * @var array
         */
        $data = collect($request->data)->map(function ($episode) {
            return $episode['slug'];
        })->toArray();

        $movieList = $this->movieEpisodeRepository->getListHistory($data);

        return MovieHistoryResource::collection($movieList);
    }
}
