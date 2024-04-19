<?php

namespace App\Repositories\MovieEpisode;

use App\Models\MovieEpisode;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MovieEpisodeRepository implements MovieEpisodeInterface
{
    public function __construct(
        private Model $model = new MovieEpisode()
    ) {
    }

    public function moviesLatest(float $limit = 15)
    {
        return $this->model
            ->select('movie_id', DB::raw('MAX(created_at) as latest_episode_date'))
            ->groupBy('movie_id')
            ->orderBy('latest_episode_date', 'desc')
            ->with(['movie' => function ($query) {
                $query->with('movieEpisodeLaster')
                    ->withCount(['movieEpisodes'])
                    ->withAvg("movieRate", "rate");
            }])
            ->paginate($limit);
    }

    public function getBySlug($slug, array $filter = [])
    {
        $query = $this->model
            ->where('slug', $slug)
            ->where($filter)
            ->with(['movieSources' => function ($query) {
                $query->where("status", "on");
            }, 'movie' => function ($query) {
                $query->with(['movieEpisodeLaster', 'movieEpisodes' => function ($query) {
                    $query->where('status', 'on');
                }])
                    ->withCount('movieEpisodes')
                    ->withAvg("movieRate", "rate");
            }]);
        return $query->firstOrFail();
    }
}
