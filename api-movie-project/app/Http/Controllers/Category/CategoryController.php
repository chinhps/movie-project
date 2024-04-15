<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryInterface;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function __construct(
        private CategoryInterface $categoryRepository
    ) {
    }

    public function list()
    {
        return $this->categoryRepository->list();
    }

    public function detail($slug)
    {
        return $this->categoryRepository->detail($slug);;
    }
}
