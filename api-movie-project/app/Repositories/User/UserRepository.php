<?php

namespace App\Repositories\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserInterface
{
    public function __construct(
        private Model $model = new User
    ) {}

    public function exists(array $conditions = [])
    {
        return User::select('provider_id')
            ->where($conditions)
            ->exists();
    }

    public function changeInfo(User $user, string $fullName)
    {
        $user->name = $fullName;
        $user->save();

        return $user;
    }

    public function blockUser(User $user, bool $block)
    {
        $user->block = $block ? 1 : 0;
        $user->save();

        return $user;
    }

    public function updateOrInsert(?float $id, array $params)
    {
        $user = new User;
        if ($id) {
            $user = User::find($id);
            $user->update($params);

            return $user;
        }
        $user->fill($params);
        $user->save();

        return $user;
    }

    public function list(array $filter = [], float $limit = 15)
    {
        $query = $this->model->withCount('comments');
        $query = queryRepository($query, $filter);

        return $query->paginate($limit);
    }
}
