<?php

namespace App\Http\Controllers\Movie;

use App\Http\Controllers\Controller;
use App\Repositories\Comment\CommentInterface;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function __construct(
        private CommentInterface $commentRepository
    ) {
    }

    public function commentMovie($slug)
    {
        return $this->commentRepository->listBySlug($slug);
    }
}
