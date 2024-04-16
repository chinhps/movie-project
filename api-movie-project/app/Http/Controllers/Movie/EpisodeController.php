<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{

    public function __construct(
        private MovieEpisodeInterface $movieEpisodeRepository
    ) {
    }

    public function episodeWatch($slug)
    {
        return $this->movieEpisodeRepository->getBySlug($slug);
    }
}
