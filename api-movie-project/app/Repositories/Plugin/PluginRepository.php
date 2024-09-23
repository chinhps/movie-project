<?php

namespace App\Repositories\Plugin;

use App\Models\Plugin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class PluginRepository implements PluginInterface
{
    public function __construct(
        private Model $model = new Plugin
    ) {}

    public function getByKey(string $key)
    {
        $cacheKey = "plugin:key:$key";
        $plugins = Redis::get($cacheKey);

        if (! $plugins) {
            $data = $this->model->where('plugin_key', $key)->first();
            if (! $data) {
                return [];
            }
            $result = [];
            foreach (json_decode($data->data_public, true) as $item) {
                $result[$item['key']] = $item['value'];
            }
            Redis::set($cacheKey, json_encode($result), 3600 * 12);
        } else {
            $result = json_decode($plugins, true);
        }

        return $result;
    }

    public function detail(float $id)
    {
        return $this->model->find($id);
    }

    public function list(array $filter = [], float $limit = 15)
    {
        if ($limit == 0) {
            return $this->model->get();
        }
        $query = $this->model->orderBy('id', 'desc');

        return $query->paginate($limit);
    }

    public function updateOrInsert(?float $id, array $params)
    {
        if (! $id) {
            return $this->model->create($params);
        }

        $data = $this->model->find($id);
        $data->fill($params);
        $data->save();

        return $data;
    }
}
