<?php

namespace App\Repositories\User;

interface UserInterface
{
    public function updateOrInsert(float|null $id, array $params);
    public function exists(array $filter);
}
