<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Repositories\Notification\NotificationInterface;
use Illuminate\Http\Request;

class NotificationController extends Controller
{

    public function __construct(
        private NotificationInterface $notificationRepository
    ) {
    }

    public function list(Request $request)
    {
        $user = $request->user();
        return $this->notificationRepository->list($user, 15);
    }
}
