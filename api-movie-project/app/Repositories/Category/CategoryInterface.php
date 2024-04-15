<?php

namespace App\Repositories\Category;

interface CategoryInterface
{
    public function list();
    public function detail($slug);
}
