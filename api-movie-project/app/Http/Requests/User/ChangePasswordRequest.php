<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class ChangePasswordRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => 'bail|required|min:8',
            'password' => 'bail|required|min:8|max:255|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'Bạn cần nhập mật khẩu hiện tại',
            'current_password.min' => 'Mật khẩu hiện tại ít nhất phải 8 ký tự',
            'password.required' => 'Bạn cần nhập mật khẩu mới',
            'password.min' => 'Mật khẩu ít nhất phải 8 ký tự',
            'password.max' => 'Mật khẩu tối đa 255 ký tự',
            'password.confirmed' => 'Xác nhận lại mật khẩu không đúng!',
        ];
    }
}
