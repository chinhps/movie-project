<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Http\Resources\Movie\MovieDetailResource;
use App\Http\Resources\Movie\MovieLatestResource;
use App\Http\Resources\Movie\MovieResource;
use App\Repositories\Category\CategoryInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{

    public function __construct(
        private MovieInterface $movieRepository,
        private MovieEpisodeInterface $movieEpisodeRepository,
        private CategoryInterface $categoryRepository
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
        ], 10);
        return MovieResource::collection($movies);
    }

    public function movieDetail($slug)
    {
        $user = Auth::user();
        $movie = $this->movieRepository->getFullBySlug($slug, $user);
        return new MovieDetailResource($movie, $user);
    }

    public function movieByCategory($slugCategory)
    {
        $movies = $this->movieRepository->list(["category_slug" => $slugCategory], 25);
        return MovieResource::collection($movies);
    }
}
