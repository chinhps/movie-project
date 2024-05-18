<?php

namespace App\Repositories\Category;

interface CategoryInterface
{
    public function detail(float $id);
    public function list(array $filter = [], float $limit = 15);
    public function getBySlug($slug);
    public function updateOrInsert(float|null $id, array $params);
    public function listIn(array $filter = []);
}
