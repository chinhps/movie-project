<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class CommentRepository implements CommentInterface
{
    public function __construct(
        private Model $model = new Comment()
    ) {
    }

    public function detail(float $id)
    {
        return $this->model->find($id);
    }

    public function listBySlug($slug, float $limit = 15)
    {
        return $this->model->whereHas('movie', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })->with('user')->orderBy('id','desc')->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie)
    {
        $comment = new Comment();
        if ($id) {
            $comment =  $this->model->find($id);
        }
        $comment->movie()->associate($movie);
        $comment->user()->associate($user);
        $comment->fill($params);
        $comment->save();
        return $comment;
    }
}
