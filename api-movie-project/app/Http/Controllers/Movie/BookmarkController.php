<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\MovieRequest;
use App\Repositories\Bookmark\BookmarkInterface;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\User\UserInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookmarkController extends Controller
{

    public function __construct(
        private BookmarkInterface $bookmarkRepository,
        private UserInterface $userRepository,
        private MovieInterface $movieRepository
    ) {
    }

    public function list()
    {
        $user = Auth::user();
        return $this->bookmarkRepository->list([], $user, 20);
    }

    public function toggle(MovieRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);

        try {
            DB::beginTransaction();
            $toggle = $this->bookmarkRepository->toggle($user, $movie);
            DB::commit();
            return BaseResponse::msg(!!$toggle['attached'] ? "Thêm bookmark thành công!" : "Xoá thành công!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi gì đã xảy ra!", 400);
        }
    }
}
