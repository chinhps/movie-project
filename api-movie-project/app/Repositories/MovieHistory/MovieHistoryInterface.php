<?php

namespace App\Repositories\MovieHistory;

use App\Models\User;

interface MovieHistoryInterface
{
    public function list(User $user, float $limit = 15);
    public function updateOrInsert(float|null $id, array $params);
}
