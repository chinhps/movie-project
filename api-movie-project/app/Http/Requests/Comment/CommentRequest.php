<?php

namespace App\Http\Requests\Comment;

use App\Http\Requests\BaseRequest;

class CommentRequest extends BaseRequest
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
            "message" => "bail|required|max:350",
        ];
    }

    public function messages(): array
    {
        return [
            "message.required" => 'Bạn cần phải nhập bình luận gì đó',
            "message.min" => 'Bạn bình luận hơi dài quá rồi :(',
        ];
    }
}
