<?php

namespace App\Repositories\HLS;

interface HLSInterface
{
    public function detail(string $slug);
    public function updateOrInsert(float|null $id, array $params);
}
