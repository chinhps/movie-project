<?php

namespace App\Repositories\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserInterface
{
    public function __construct(
        private Model $model = new User()
    ) {
    }

    public function exists(array $conditions = [])
    {
        return User::select('provider_id')
            ->where($conditions)
            ->exists();
    }

    public function updateOrInsert(float|null $id, array $params)
    {
        $user = new User();
        if ($id) {
            $user = User::find($id);
            $user->update($params);
            return $user;
        }
        $user->fill($params);
        $user->save();
        return $user;
    }
}
