<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangeInfoRequest;
use App\Http\Resources\User\UserAdminResource;
use App\Repositories\User\UserInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct(
        private UserInterface $userRepository
    ) {}

    public function userListAdmin()
    {
        $users = $this->userRepository->list([], 15);

        return UserAdminResource::collection($users);
    }

    public function changeInfo(ChangeInfoRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();

        try {
            DB::beginTransaction();

            // UPLOAD IMAGE
            if ($validated['avatar'] !== 'undefined') {
                uploadAvatar($validated['avatar'], $user);
            }

            $this->userRepository->changeInfo(
                $user,
                fullName: $validated['name'],
            );
            DB::commit();

            return BaseResponse::msg('Chỉnh sửa thành công! Avatar sẽ tự động cập nhật sau!');
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::msg('Có lỗi đã xảy ra! Kiểm tra lại thông tin của bạn');
        }
    }
}
