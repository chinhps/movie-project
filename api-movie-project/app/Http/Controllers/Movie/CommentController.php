<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CommentRequest;
use App\Http\Resources\Comment\CommentResource;
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
        return CommentResource::collection($this->commentRepository->listBySlug($slug, 10));
    }

    public function addCommentMovie(CommentRequest $request)
    {
        $validated = $request->validated();

        $user = Auth::user();
        $movie = $this->movieRepository->getBySlug($validated['slug']);

        $this->commentRepository->updateOrInsert(null, [
            "message" => $validated['message'],
            "status" => "on",
            "parent_id" => $validated['parentId'] ?? null
        ], $user, $movie);

        return BaseResponse::msg("Thêm bình luận thành công!");
    }

    public function replies($idComment)
    {
        $data = $this->commentRepository->replies($idComment, limit: 15);
        return CommentResource::collection($data);
    }
}
