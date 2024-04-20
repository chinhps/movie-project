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

    public function getBySlug($slug)
    {
        return $this->model->where('slug', $slug)->firstOrFail();
    }
}
