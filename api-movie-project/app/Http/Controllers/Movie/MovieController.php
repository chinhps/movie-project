<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
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
        return $this->movieRepository->list(["sort"], 25);
    }

    public function moviesLatest()
    {
        return $this->movieEpisodeRepository->moviesLatest();
    }

    public function moviesRanking()
    {
        return $this->movieRepository->list([
            "sort" => [["views", "desc"]]
        ]);
    }

    public function movieDetail($slug)
    {
        return $this->movieRepository->getBySlug($slug);
    }
}
