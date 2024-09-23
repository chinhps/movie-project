<?php

namespace App\Http\Requests\Report;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

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
            'reason' => 'required|array',
            'reason.*' => [
                'required',
                Rule::in(['vietsub', 'wrong_episode', 'cantWatch']),
            ],
            'slug' => 'required|exists:movies,slug',
        ];
    }

    public function messages(): array
    {
        return [
            'reason.*' => 'Bạn cần phải chọn lý do!',
            'slug.*' => 'Lỗi liên quan đến slug',
        ];
    }
}
