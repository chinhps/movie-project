<?php

namespace App\Http\Requests\Report;

use App\Http\Requests\BaseRequest;

class ReportActionRequest extends BaseRequest
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
            'id' => 'exists:movie_reports,id',
            'status' => 'in:pending,success,spam',
            'report' => 'nullable',
        ];
    }
}
