<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\BaseRequest;

class CategoryUpsertRequest extends BaseRequest
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
            "id" => "nullable,exists:categories,id",
            "name" => "required",
            "description" => "required"
        ];
    }

    public function messages()
    {
        return [
            "name.required" => "Bạn cần nhập tên thể loại",
            "description.required" => "Bạn cần nhập nội dung"
        ];
    }
}
