<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use App\Rules\AvatarValidation;

class ChangeInfoRequest extends BaseRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "avatar" => [new AvatarValidation],
            "name" => "required|string|min:1|max:200",
            "description" => "nullable|max:500"
        ];
    }

    public function messages(): array
    {
        return [
            "avatar.*" => "Ảnh đại diện của bạn không hợp lệ",
            "name.*" => "Tên của bạn không phù hợp",
            "description.max" => "Tiểu sử tối đa chỉ 500 ký tự"
        ];
    }
}
