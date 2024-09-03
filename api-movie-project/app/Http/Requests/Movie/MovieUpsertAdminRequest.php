<?php

namespace App\Http\Requests\Movie;

use App\Http\Requests\BaseRequest;
use App\Rules\UrlOrFileImage;

class MovieUpsertAdminRequest extends BaseRequest
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
        $data = $this->all();
        $modifiedData = $this->mergeArrays(json_decode($data['dataDefault'], true), $data);
        $this->replace($modifiedData);
        return [
            "id" => "nullable|exists:movies,id",
            "movie_name" => "required|string",
            "movie_name_other" => "nullable|string",
            "release" => "required|string",
            "status" => "boolean",
            "categories.*" => "required|string", #|exists:categories,name",
            "episodes_counter" => "nullable|numeric",
            "description" => "required|string",
            "banner_image.*" =>  ["nullable", new UrlOrFileImage],
            "movie_image.*" =>  ["nullable", new UrlOrFileImage],
        ];
    }

    public function mergeArrays($arrayA, $arrayB)
    {
        foreach ($arrayB as $key => $valueB) {
            if (array_key_exists($key, $arrayA)) {
                if (is_array($valueB) && is_array($arrayA[$key])) {
                    $arrayA[$key] = $this->mergeArrays($arrayA[$key], $valueB);
                } else {
                    if (gettype($arrayA[$key]) !== "boolean" && gettype($arrayA[$key]) !== "integer" && gettype($arrayA[$key]) !== "NULL") {
                        $arrayA[$key] = $valueB;
                    }
                }
            } else {
                $arrayA[$key] = $valueB;
            }
        }
        return $arrayA;
    }
}
