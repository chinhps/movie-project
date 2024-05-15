<?php

namespace App\Repositories\User;

interface UserInterface
{
    public function list(array $filter = [], float $limit = 15);
    public function updateOrInsert(float|null $id, array $params);
    public function exists(array $filter);
}
