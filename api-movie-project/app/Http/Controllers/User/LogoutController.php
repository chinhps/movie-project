<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;

class LogoutController extends Controller
{
    public function logout()
    {
        try {
            auth()->logout();
            return BaseResponse::data([
                "msg" => "Đăng xuất thành công!"
            ]);
        } catch (\Exception) {
            return BaseResponse::data([
                "msg" => "Đăng xuất thất bại!"
            ], 500);
        }
    }

    public function logoutAll()
    {
        try {
            auth()->logout();
            return BaseResponse::data([
                "msg" => "Đăng xuất thành công!"
            ]);
        } catch (\Exception) {
            return BaseResponse::data([
                "msg" => "Đăng xuất thất bại!"
            ], 500);
        }
    }
}