<?php

namespace App\Repositories\HLS;

use App\Models\HLS;
use Illuminate\Database\Eloquent\Model;

class HLSRepository implements HLSInterface
{
    public function __construct(
        private Model $model = new HLS()
    ) {
    }

    public function detail(string $slug)
    {
        return $this->model->where('slug',$slug)->firstOrFail();
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        $model = new HLS();
        if($id) {
            $model = $this->model->find($id);
        }
        $model->fill($params);
        $model->save();
        return $model;
    }
}
