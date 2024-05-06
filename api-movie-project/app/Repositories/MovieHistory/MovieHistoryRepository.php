<?php

namespace App\Repositories\MovieHistory;

use App\Models\MovieHistory;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MovieHistoryRepository implements MovieHistoryInterface
{
    public function __construct(
        private Model $model = new MovieHistory()
    ) {
    }

    public function list(User $user, float $limit = 15)
    {
        return $this->model
            ->where('user_id', $user->id)
            ->with(['movie' => function ($query) {
                $query->with('movieEpisodeLaster')
                    ->withAvg("movieRate", "rate");
            }])
            ->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        return 123;
    }
}
