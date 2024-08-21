<?php

namespace App\Http\Requests\Proxy;

use App\Http\Requests\BaseRequest;

class ProxyConvertRequest extends BaseRequest
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
            "m3u8_link" => "required|url",
            "header_custom" => ["required", "array"]
        ];
    }
}
