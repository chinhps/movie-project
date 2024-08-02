<?php

namespace App\Repositories\Plugin;

interface PluginInterface
{
    public function detail(float $id);
    public function list(array $filter = [], float $limit = 15);
    public function updateOrInsert(float|null $id, array $params);
}
