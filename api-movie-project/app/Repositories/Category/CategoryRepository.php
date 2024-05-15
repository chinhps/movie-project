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

    public function list(array $filter = [], float $limit = 15)
    {
        if ($limit == 0) {
            return $this->model->get();
        }
        $query = $this->model->withCount(["movies"])->orderBy('id', 'desc');
        return $query->paginate($limit);
    }

    public function getBySlug($slug)
    {
        return $this->model->where('slug', $slug)->firstOrFail();
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        $model = new Category();
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
