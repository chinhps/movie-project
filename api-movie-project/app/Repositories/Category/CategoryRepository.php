<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;

class CategoryRepository implements CategoryInterface
{
    public function __construct(
        private Model $model = new Category()
    ) {
    }

    public function list()
    {
        return $this->model->get();
    }

    public function detail($slug)
    {
        return $this->model->where('slug', $slug)->with(['movies' => function ($query) {
            $query->with('movieEpisodeLaster')
                ->withAvg("movieRate", "rate");
        }])

            ->first();
    }
}
