<?php

namespace App\Repositories\Bookmark;

use App\Models\Bookmark;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class BookmarkRepository implements BookmarkInterface
{
    public function __construct(
        private Model $model = new Bookmark()
    ) {
    }

    public function list(array $filter = [], User $user, float $paginate = 15)
    {
        $query = $this->model->where('user_id', $user->id)
            ->with(['movie' => function ($query) {
                $query->withAvg("movieRate", "rate");
            }, 'movie.movieEpisodeLaster']);
        $query = queryRepository($query, $filter);
        return $query->paginate($paginate);
    }

    public function toggle(User $user, Movie $movie)
    {
        $bookmark = $movie->bookmark()->toggle([$user->id]);
        return $bookmark;
    }

    public function listSlug(User $user)
    {
        $query = $user->movies()->pluck("slug");
        return $query;
    }
}
