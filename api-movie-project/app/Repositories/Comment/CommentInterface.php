<?php

namespace App\Repositories\Comment;

interface CommentInterface
{
    public function listBySlug($slug);
}
