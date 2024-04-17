<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\{BaseResponse, Controller};
use App\Http\Requests\User\{ChangePasswordRequest, UserLoginRequest, UserRegisterRequest};
use App\Repositories\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        private UserInterface $userRepository,
    ) {
    }

    public function getCurrentInfo(Request $request)
    {
        $user = $request->user();
        return BaseResponse::data([
            "providerId" => $user->provider_id,
            "name" => $user->name,
            "username" => $user->username,
            "level" => $user->level,
            "created_at" => $user->created_at,
        ]);
    }

    private function generateProviderId()
    {
        do {
            $providerId = rand(11111, 99999) . time();
        } while ($this->userRepository->exists([
            ['provider_id', $providerId],
            ['login_type', 'account']
        ]));
        return $providerId;
    }

    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $user = $this->userRepository->updateOrInsert(null, [
                "name" => $validated['username'],
                "username" => $validated['username'],
                "password" => Hash::make($validated['password']),
                "provider_id" => $this->generateProviderId(),
                "login_type" => "account",
                "status" => "inactive",
                "level" => 1,
                "email" => $validated['email'] ?? null,
            ]);

            DB::commit();
            return BaseResponse::token(token: generateToken($user), msg: "Tạo tài thành công! Đang chuyển hướng...", status: 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Tạo tài khoản thất bại! Liên hệ admin để được hỗ trợ", 500);
        }
    }

    public function login(UserLoginRequest $request)
    {
        $validated = $request->validated();

        # Login Fail
        if (!Auth::attempt([
            "username" => $validated['username'],
            "password" => $validated['password'],
            "login_type" => "account",
        ])) {
            return BaseResponse::msg("Mật khẩu không đúng! Vui lòng kiểm tra lại", 400);
        }

        $user = Auth::user();
        return BaseResponse::token(token: generateToken($user), msg: "Đăng nhập thành công!", status: 200);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $validated = $request->validated();
        $user = $request->user();

        if (!Hash::check($validated["current_password"], $user->password)) {
            return BaseResponse::msg("Mật khẩu cũ của bạn không khớp", 400);
        }

        DB::beginTransaction();
        try {
            $user = $this->userRepository->updateOrInsert($user->id, [
                "password" => Hash::make($validated['password']),
            ]);

            DB::commit();
            return BaseResponse::msg("Đổi mật khẩu thành công!", status: 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Tạo tài khoản thất bại! Liên hệ admin để được hỗ trợ", 500);
        }
    }
}