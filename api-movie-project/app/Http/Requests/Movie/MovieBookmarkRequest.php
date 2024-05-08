<?php

namespace App\Http\Requests\Movie;

use App\Http\Requests\BaseRequest;

class MovieBookmarkRequest extends BaseRequest
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
            "data" => "array",
            "data.*.slug" => "exists:movies,slug",
        ];
    }

    public function messages()
    {
        return [
            "data" => "Dữ liệu phải dạng mảng",
            "data.*.slug" => "Có tập phim không tồn tại",
        ];
    }
}
