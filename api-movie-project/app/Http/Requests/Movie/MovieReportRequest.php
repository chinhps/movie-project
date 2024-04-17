<?php

namespace App\Http\Requests\Movie;

use App\Http\Requests\BaseRequest;

class MovieReportRequest extends BaseRequest
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
            "message" => "bail|required|max:350",
            "slug" => "required|exists:movies,slug"
        ];
    }

    public function messages(): array
    {
        return [
            "message.required" => 'Bạn cần phải nhập gì đó',
            "message.min" => 'Bạn nhắn hơi dài quá rồi :(',
            "slug.*" => "Lỗi liên quan đến slug"
        ];
    }
}
