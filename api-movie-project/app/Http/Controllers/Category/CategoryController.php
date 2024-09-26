<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryUpsertRequest;
use App\Http\Resources\Category\CategoryAdminResource;
use App\Http\Resources\Category\CategoryResource;
use App\Repositories\Category\CategoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryInterface $categoryRepository
    ) {}

    public function list()
    {
        return CategoryResource::collection($this->categoryRepository->listAll());
    }

    public function detail($slug)
    {
        return new CategoryResource($this->categoryRepository->getBySlug($slug));
    }

    // ADMIN
    public function categoryListAdmin()
    {
        $categories = $this->categoryRepository->list([], 15);

        return CategoryAdminResource::collection($categories);
    }

    public function categoryDetailAdmin($id)
    {
        $category = $this->categoryRepository->detail($id);

        return new CategoryAdminResource($category);
    }

    public function categoryUpsertAdmin(CategoryUpsertRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $this->categoryRepository->updateOrInsert($validated['id'] ?? null, [
                'name' => $validated['name'],
                'description' => $validated['description'],
                'slug' => Str::slug($validated['name']),
            ]);
            DB::commit();

            return BaseResponse::msg('Thao tác thành công!');
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::msg($e->getMessage(), 422);
        }
    }
}
