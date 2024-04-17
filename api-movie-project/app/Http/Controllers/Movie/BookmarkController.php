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

    public function add(MovieRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);

        try {
            DB::beginTransaction();
            $this->bookmarkRepository->updateOrInsert(null, [], $user, $movie);
            DB::commit();
            return BaseResponse::msg("Lưu thành công bạn có thể kiểm tra lại trong Bookmark!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Đã có trong bookmark!", 400);
        }
    }

    public function remove(MovieRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);
        try {
            DB::beginTransaction();
            $this->bookmarkRepository->remove($user, $movie);
            DB::commit();
            return BaseResponse::msg("Đã xoá khỏi Bookmark!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Phim không tồn tại!");
        }
    }
}
