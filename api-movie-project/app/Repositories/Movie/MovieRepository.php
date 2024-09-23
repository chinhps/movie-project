<?php

namespace App\Repositories\Movie;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class MovieRepository implements MovieInterface
{
    public function __construct(
        private Model $model = new Movie
    ) {}

    public function autoBannerMovie()
    {
        $query = $this->model
            ->with('movieEpisodeLaster')
            ->withAvg('movieRate', 'rate')
            ->whereNotNull('banner_image')
            ->orderBy('id', 'desc');

        return $query->limit(5)->get();
    }

    public function list(array $filter = [], float $limit = 15)
    {
        $page = request()->input('page', 1);
        $filter2 = json_encode($filter);
        $cacheKey = "movie:all:{$filter2}:page:$page";
        $movies = Redis::get($cacheKey);

        if (! $movies) {
            $query = $this->model
                ->with('movieEpisodeLaster')
                ->withAvg('movieRate', 'rate');

            $query = queryRepository($query, $filter);
            $movies = $query->paginate($limit);
            Redis::set($cacheKey, json_encode($movies), 3600 * 12);
        } else {
            $moviesArray = json_decode($movies);
            $movies = redisFormatPaginate($moviesArray);
        }

        return $movies;
    }

    public function detail(float $id)
    {
        $query = $this->model->where('id', $id)->with(['categories', 'movieEpisodes.movieSources']);

        return $query->firstOrFail();
    }

    public function getFullBySlug(string $slug)
    {
        $cacheKey = "movie:detail:$slug";
        $movie = Redis::get($cacheKey);

        if (! $movie) {
            $query = $this->model
                ->where('slug', $slug)
                ->with(['movieEpisodeLaster', 'categories', 'movieEpisodes' => function ($query) {
                    $query->where('status', 'on');
                }])
                ->withCount('movieRate')
                ->withAvg('movieRate', 'rate');

            $movie = $query->firstOrFail();
            Redis::set($cacheKey, json_encode($movie), 3600 * 12);
        } else {
            $movie = json_decode($movie);
        }

        return $movie;
    }

    public function getBySlug(string $slug)
    {
        $query = $this->model
            ->where('slug', $slug)
            ->with(['movieEpisodeLaster'])
            ->withAvg('movieRate', 'rate');

        return $query->firstOrFail();
    }

    public function getListHistory(array $array, float $limit = 15)
    {
        $query = $this->model->whereIn('slug', $array)->with('movieEpisodeLaster')
            ->withAvg('movieRate', 'rate')->paginate($limit);

        return $query;
    }

    public function updateOrInsert(?float $id, array $params, array $categoryIds = [])
    {
        $model = new Movie;
        if ($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->save();
        $model->categories()->sync($categoryIds);

        return $model;
    }
}
