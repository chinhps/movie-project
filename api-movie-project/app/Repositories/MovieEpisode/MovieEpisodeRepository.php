<?php

namespace App\Repositories\MovieEpisode;

use App\Models\Movie;
use App\Models\MovieEpisode;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class MovieEpisodeRepository implements MovieEpisodeInterface
{
    public function __construct(
        private Model $model = new MovieEpisode
    ) {}

    public function moviesLatest(float $limit = 15)
    {
        return $this->model
            ->select('movie_id', DB::raw('MAX(created_at) as latest_episode_date'))
            ->groupBy('movie_id')
            ->orderBy('latest_episode_date', 'desc')
            ->with(['movie' => function ($query) {
                $query->with('movieEpisodeLaster')
                    ->withCount(['movieEpisodes'])
                    ->withAvg('movieRate', 'rate');
            }])
            ->paginate($limit);
    }

    public function getBySlug($slug, array $filter = [])
    {
        $cacheKey = "episode:watch:slug:$slug";
        $episode = Redis::get($cacheKey);

        if (! $episode) {
            $query = $this->model
                ->where('slug', $slug)
                ->where($filter)
                ->with(['movieSources' => function ($query) {
                    $query->where('status', 'on');
                }, 'movie' => function ($query) {
                    $query->with(['movieEpisodes' => function ($query) {
                        $query->where('status', 'on');
                    }])
                        ->withCount('movieEpisodes')
                        ->withAvg('movieRate', 'rate');
                }, 'movieSubtitles', 'vocabulary']);
            $episode = $query->firstOrFail();
            Redis::set($cacheKey, json_encode($episode), 3600 * 12);

        } else {
            $episode = json_decode($episode);
        }

        return $episode;
    }

    public function getListHistory(array $array, float $limit = 15)
    {
        $query = $this->model->whereIn('slug', $array)->with(['movie' => function ($query) {
            $query->with('movieEpisodeLaster')
                ->withAvg('movieRate', 'rate');
        }])->paginate($limit);

        return $query;
    }

    public function updateOrInsert(?float $id, array $params, Movie $movie)
    {
        $model = new MovieEpisode;
        if ($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->movie()->associate($movie);
        $model->save();

        return $model;
    }
}
