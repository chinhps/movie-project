<?php

namespace App\Http\Requests\Report;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class CommentReportRequest extends BaseRequest
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
            "id" => "required|exists:comments,id",
            "reason" => "required|array",
            "reason.*" => [
                'required',
                Rule::in(['spam', 'trouble', 'other']),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            "reason.*" => "Bạn cần phải chọn lý do!",
            "id.*" => "Không tồn tại bình luận này nữa!"
        ];
    }
}
