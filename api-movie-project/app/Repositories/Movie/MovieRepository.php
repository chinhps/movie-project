<?php

namespace App\Repositories\Movie;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Model;

class MovieRepository implements MovieInterface
{
    public function __construct(
        private Model $model = new Movie()
    ) {
    }

    public function list(array $filter = [], float $limit = 15)
    {
        $query = $this->model
            ->with('movieEpisodeLaster')
            ->withAvg("movieRate", "rate");

        $query = queryRepository($query, $filter);

        return $query->paginate($limit);
    }

    public function detail(float $id)
    {
        $query = $this->model->where('id', $id)->with(['categories', 'movieEpisodes.movieSources']);
        return $query->firstOrFail();
    }

    public function getFullBySlug(string $slug)
    {
        $query = $this->model
            ->where("slug", $slug)
            ->with(['movieEpisodeLaster', 'categories', 'movieEpisodes' => function ($query) {
                $query->where('status', 'on');
            }])
            ->withCount('movieRate')
            ->withAvg("movieRate", "rate");

        return $query->firstOrFail();
    }

    public function getBySlug(string $slug)
    {
        $query = $this->model
            ->where("slug", $slug)
            ->with(['movieEpisodeLaster'])
            ->withAvg("movieRate", "rate");
        return $query->firstOrFail();
    }

    public function getListHistory(array $array, float $limit = 15)
    {
        $query = $this->model->whereIn('slug', $array)->with('movieEpisodeLaster')
            ->withAvg("movieRate", "rate")->paginate($limit);
        return $query;
    }

    public function updateOrInsert(float|null $id, array $params, array $categoryIds = [])
    {
        $model = new Movie();
        if ($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->save();
        $model->categories()->sync($categoryIds);
        return $model;
    }
}
