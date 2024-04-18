<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Http\Resources\Movie\MovieLatestResource;
use App\Http\Resources\Movie\MovieResource;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use Illuminate\Http\Request;

class MovieController extends Controller
{

    public function __construct(
        private MovieInterface $movieRepository,
        private MovieEpisodeInterface $movieEpisodeRepository,

    ) {
    }

    public function movies()
    {
        $movies = $this->movieRepository->list(["sort"], 25);
        return MovieResource::collection($movies);
    }

    public function moviesLatest()
    {
        $movies = $this->movieEpisodeRepository->moviesLatest();
        return MovieLatestResource::collection($movies);
    }

    public function moviesRanking()
    {
        $movies = $this->movieRepository->list([
            "sort" => [["views", "desc"]]
        ],10);
        return MovieResource::collection($movies);
    }

    public function movieDetail($slug)
    {
        $movie = $this->movieRepository->getBySlug($slug);
        return new MovieResource($movie);
    }
}
