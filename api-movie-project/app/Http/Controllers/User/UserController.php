<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserAdminResource;
use App\Repositories\User\UserInterface;

class UserController extends Controller
{
    public function __construct(
        private UserInterface $userRepository
    ) {
    }

    public function userListAdmin()
    {
        $users = $this->userRepository->list([], 15);
        return UserAdminResource::collection($users);
    }
}
