<?php

namespace App\Http\Requests\Movie;

use App\Http\Requests\BaseRequest;

class MovieRequest extends BaseRequest
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
            'slug' => 'required|exists:movies,slug',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.*' => 'Lỗi liên quan đến slug',
        ];
    }
}
