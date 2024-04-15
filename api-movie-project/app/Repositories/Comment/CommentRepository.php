<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;

class CommentRepository implements CommentInterface
{
    public function __construct(
        private Model $model = new Comment()
    ) {
    }

    public function listBySlug($slug)
    {
        return $this->model->whereHas('movie', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })->paginate(15);
    }
}
