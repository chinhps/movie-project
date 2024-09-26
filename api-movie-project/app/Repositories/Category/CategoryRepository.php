<?php

namespace App\Repositories\Category;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redis;

class CategoryRepository implements CategoryInterface
{
    public function __construct(
        private Category $model
    ) {}

    public function listAll()
    {
        $cacheKey = 'category:all';
        $categories = Redis::get($cacheKey);
        if (! $categories) {
            $categories = $this->model->get();
            Redis::set($cacheKey, json_encode($categories), 3600 * 12);
        } else {
            $categories = collect(json_decode($categories));
        }

        return $categories;
    }

    /**
     * @return LengthAwarePaginator<Category>
     */
    public function list(array $filter = [], float $limit = 15): LengthAwarePaginator
    {
        $categories = $this->model->withCount(['movies'])->orderBy('id', 'desc');

        return $categories->paginate($limit);
    }

    public function listIn(array $filter = []): array
    {
        return $this->model->whereIn('name', $filter)->pluck('id')->toArray();
    }

    public function getBySlug($slug): Category
    {
        return $this->model->where('slug', $slug)->firstOrFail();
    }

    public function updateOrInsert(?float $id, array $params): Category
    {
        $model = $this->model->updateOrCreate([
            'id' => $id,
        ], $params);

        return $model;
    }

    public function detail(float $id): Category
    {
        $model = $this->model->find($id);
        if (! $model) {
            throw new ModelNotFoundException('Category not found');
        }

        return $model;
    }
}
