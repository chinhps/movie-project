<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\Category\CategoryAdminResource;
use App\Http\Resources\Category\CategoryResource;
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
        return CategoryResource::collection($this->categoryRepository->list([], 0));
    }

    public function detail($slug)
    {
        return new CategoryResource($this->categoryRepository->getBySlug($slug));
    }

    # ADMIN
    public function categoryListAdmin()
    {
        $categories = $this->categoryRepository->list([],15);
        return CategoryAdminResource::collection($categories);
    }
}
