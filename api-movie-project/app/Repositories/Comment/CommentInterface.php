<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use App\Models\Movie;
use App\Models\User;

interface CommentInterface
{
    public function detail(float $id);
    public function listBySlug($slug, float $limit = 15);
    public function statusComment(Comment $comment, string $status);
    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie);
}
