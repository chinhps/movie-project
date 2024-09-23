<?php

namespace App\Repositories\Notification;

use App\Models\User;

interface NotificationInterface
{
    public function list(User $user, float $number = 15);
}
