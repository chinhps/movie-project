<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseRequest extends FormRequest
{
    // use ValidateRulesTrait;

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(
            [
                'data' => [
                    'msg' => $validator->errors()->all(),
                ],
            ],
            422
        ));
    }
}
