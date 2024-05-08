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
}
