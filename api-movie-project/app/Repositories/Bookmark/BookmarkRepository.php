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
            },'movie.movieEpisodeLaster']);
        $query = queryRepository($query, $filter);
        return $query->paginate($paginate);
    }

    public function updateOrInsert(float|null $id, array $params, User $user, Movie $movie)
    {
        $bookmark = new Bookmark();
        if ($id) {
            $bookmark = $this->model->find($id);
        }
        $bookmark->fill($params);
        $bookmark->user()->associate($user);
        $bookmark->movie()->associate($movie);
        $bookmark->save();
        return $bookmark;
    }

    public function remove(User $user, Movie $movie)
    {
        $bookmark = $this->model->where([
            ['user_id', $user->id],
            ['movie_id', $movie->id]
        ])->delete();

        if (!$bookmark) {
            throw new \Exception("Dont found any rows");
        }

        return $bookmark;
    }
}
