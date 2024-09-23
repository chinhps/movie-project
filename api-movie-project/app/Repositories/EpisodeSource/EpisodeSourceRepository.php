<?php

namespace App\Repositories\EpisodeSource;

use App\Models\MovieEpisode;
use App\Models\MovieSource;
use Illuminate\Database\Eloquent\Model;

class EpisodeSourceRepository implements EpisodeSourceInterface
{
    public function __construct(
        private Model $model = new MovieSource
    ) {}

    public function updateOrInsert(?float $id, array $params, MovieEpisode $episode)
    {
        $model = new MovieSource;
        if ($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->movieEpisode()->associate($episode);
        $model->save();

        return $model;
    }
}
