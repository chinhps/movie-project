<?php

namespace App\Repositories\Notification;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class NotificationRepository implements NotificationInterface
{
    public function __construct(
        private Model $model = new Notification()
    ) {
    }

    public function list(User $user, float $number = 15)
    {
        return $this->model->where('user_id', $user->id)->paginate($number);
    }
}
