<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CommentRequest;
use App\Repositories\Comment\CommentInterface;
use App\Repositories\Movie\MovieInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function __construct(
        private CommentInterface $commentRepository,
        private MovieInterface $movieRepository
    ) {
    }

    public function commentMovie($slug)
    {
        return $this->commentRepository->listBySlug($slug);
    }

    public function addCommentMovie(CommentRequest $request, $slug)
    {
        $validated = $request->validated();

        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($slug);

        $this->commentRepository->updateOrInsert(null, [
            "message" => $validated['message'],
            "status" => "on"
        ], $user, $movie);

        return BaseResponse::msg("Thêm bình luận thành công!");
    }
}
