<?php

use Illuminate\Database\Eloquent\Builder;

if (! function_exists('queryRepository')) {
    function queryRepository(Builder $model, array $filter)
    {
        if (isset($filter['query'])) {
            $model->where($filter['query']);
        }
        if (isset($filter['sort'])) {
            foreach ($filter['sort'] as $valueSort) {
                $model->orderBy($valueSort[0], $valueSort[1]);
            }
        }
        if (isset($filter['category_slug'])) {
            $model->whereHas('categories', function ($subquery) use ($filter) {
                $subquery->where('slug', $filter['category_slug']);
            });
        }
        if (isset($filter['between'])) {
            $model->whereBetween(
                $filter['between']['column'],
                [
                    $filter['between']['between'][0],
                    $filter['between']['between'][1],
                ]
            );
        }
        if (! isset($filter['sort'])) {
            $model->orderBy('id', 'desc');
        }

        return $model;
    }
}
