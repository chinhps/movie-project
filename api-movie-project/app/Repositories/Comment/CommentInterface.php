<?php

namespace App\Repositories\Comment;

use App\Models\Movie;
use App\Models\User;

interface CommentInterface
{
    public function listBySlug($slug);
    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie);
}