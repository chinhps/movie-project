<?php

namespace App\Http\Controllers\Plugin;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Plugin\PluginUpsertRequest;
use App\Http\Resources\Plugin\PluginAdminResource;
use App\Repositories\Plugin\PluginInterface;
use Illuminate\Http\Request;

class PluginController extends Controller
{

    public function __construct(
        private PluginInterface $pluginRepository
    ) {
    }

    public function pluginListAdmin()
    {
        return PluginAdminResource::collection($this->pluginRepository->list([], 15));
    }

    public function pluginDetailAdmin($id)
    {
        return new PluginAdminResource($this->pluginRepository->detail($id));
    }

    public function pluginUpsertAdmin(PluginUpsertRequest $request)
    {
        $validated = $request->validated();
        $plugin = $this->pluginRepository->detail($validated['id']);
        $publicForm = $this->getDataForm(json_decode($plugin->form_public, true), $validated['data']);

        $this->pluginRepository->updateOrInsert($validated['id'], [
            "data_public" => json_encode($publicForm)
        ]);
        return BaseResponse::msg("Cập nhật thành công!");
    }

    private function getDataForm(array $array, array $values)
    {
        $result = [];
        foreach ($array as $item) {
            $result[] = [
                "key" => $item['name'],
                "name" => $item['label'],
                "value" => $values[$item['name']]
            ];
        }
        return $result;
    }
}
