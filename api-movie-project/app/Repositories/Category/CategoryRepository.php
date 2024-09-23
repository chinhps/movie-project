<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class CategoryRepository implements CategoryInterface
{
    public function __construct(
        private Model $model = new Category
    ) {}

    public function list(array $filter = [], float $limit = 15)
    {
        if ($limit == 0) {
            $cacheKey = 'category:all';
            $categories = Redis::get($cacheKey);
            if (! $categories) {
                $categories = $this->model->get();
                Redis::set($cacheKey, json_encode($categories), 3600 * 12);
            } else {
                $categories = json_decode($categories);
            }

            return $categories;
        }
        $movies = $this->model->withCount(['movies'])->orderBy('id', 'desc');

        return $movies;
    }

    public function listIn(array $filter = [])
    {
        return $this->model->whereIn('name', $filter)->pluck('id');
    }

    public function getBySlug($slug)
    {
        return $this->model->where('slug', $slug)->firstOrFail();
    }

    public function updateOrInsert(?float $id, array $params)
    {
        $model = new Category;
        if ($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->save();

        return $model;
    }

    public function detail(float $id)
    {
        $model = $this->model->find($id);

        return $model;
    }
}
