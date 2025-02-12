<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\UserLoginRequest;
use App\Http\Requests\User\UserRegisterRequest;
use App\Models\User;
use App\Repositories\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        private UserInterface $userRepository,
    ) {}

    public function getCurrentInfo(Request $request)
    {
        /** @var \Tymon\JWTAuth\JWTGuard $auth */
        $auth = auth('api');
        $payload = $auth->payload();
        $user = [
            'providerId' => $payload->get('providerId'),
            'name' => $payload->get('name'),
            'username' => $payload->get('username'),
            'level' => $payload->get('level'),
            'role' => $payload->get('role'),
            'created_at' => $payload->get('created_at'),
            'avatar_url' => $payload->get('avatar_url'),
        ];

        return BaseResponse::data($user);
    }

    private function user($user)
    {
        return [
            "providerId" => $user->provider_id,
            "name" => $user->name,
            "username" => $user->username,
            "level" => $user->level,
            "role" => $user->role,
            "created_at" => $user->created_at,
            "avatar_url" => $user->avatar_url
        ];
    }

    private function generateProviderId()
    {
        do {
            $providerId = rand(11111, 99999) . time();
        } while ($this->userRepository->exists([
            ['provider_id', $providerId],
            ['login_type', 'account'],
        ]));

        return $providerId;
    }

    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $user = $this->userRepository->updateOrInsert(null, [
                'name' => $validated['username'],
                'username' => $validated['username'],
                'password' => Hash::make($validated['password']),
                'provider_id' => $this->generateProviderId(),
                'login_type' => 'account',
                'status' => 'inactive',
                'level' => 1,
                'email' => $validated['email'] ?? null,
                'block' => 0,
            ]);
            
            $customClaims = $this->user($user);

            /** @var \Tymon\JWTAuth\JWTGuard $auth */
            $auth = auth('api');
            $token = $auth->claims($customClaims)->fromUser($user);

            DB::commit();

            return BaseResponse::data([
                'token' => $token,
                'msg' => 'Tạo tài thành công! Đang chuyển hướng...',
                'user' => $customClaims,
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg('Tạo tài khoản thất bại! Liên hệ admin để được hỗ trợ', 500);
        }
    }

    public function login(UserLoginRequest $request)
    {
        $validated = $request->validated();

        // Login Fail
        if (! $token = auth('api')->attempt([
            'username' => $validated['username'],
            'password' => $validated['password'],
            'login_type' => 'account',
        ])) {
            return BaseResponse::msg('Mật khẩu không đúng! Vui lòng kiểm tra lại', 400);
        }

        $user = Auth::user();
        $customClaims = $this->user($user);

        /** @var \Tymon\JWTAuth\JWTGuard $auth */
        $auth = auth('api');
        $token = $auth->claims($customClaims)->fromUser($user);

        return BaseResponse::data([
            'token' => $token,
            'msg' => 'Đăng nhập thành công! Đang chuyển hướng...',
            'user' => $customClaims,
            'status' => 200,
        ]);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $validated = $request->validated();
        $user = $request->user();

        if (! Hash::check($validated['current_password'], $user->password)) {
            return BaseResponse::data(['msg' => 'Mật khẩu cũ của bạn không khớp'], 400);
        }

        DB::beginTransaction();
        try {
            $user = $this->userRepository->updateOrInsert($user->id, [
                'password' => Hash::make($validated['password']),
            ]);

            DB::commit();

            return BaseResponse::data(['msg' => 'Đổi mật khẩu thành công!'], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return BaseResponse::data(['msg' => 'Tạo tài khoản thất bại! Liên hệ admin để được hỗ trợ'], 400);
        }
    }
}
