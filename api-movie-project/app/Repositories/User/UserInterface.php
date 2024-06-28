<?php

namespace App\Repositories\User;

use App\Models\User;

interface UserInterface
{
    public function list(array $filter = [], float $limit = 15);
    public function changeInfo(User $user, string $fullName);
    public function updateOrInsert(float|null $id, array $params);
    public function exists(array $filter);
    public function blockUser(User $user, bool $block);
}
