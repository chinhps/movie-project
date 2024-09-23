<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class BaseResource extends JsonResource
{
    public static function collection($resource)
    {
        return tap(new CustomResourceCollection($resource, static::class), function ($collection) {
            if (property_exists(static::class, 'preserveKeys')) {
                $collection->preserveKeys = (new static([]))->preserveKeys === true;
            }
        });
    }

    public function userCustom($user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username,
            'level' => $user->level,
            'provider_id' => $user->provider_id,
        ];
    }
}

class CustomResourceCollection extends AnonymousResourceCollection
{
    /**
     * Add the pagination information to the response.
     *
     * @param  Request  $request
     * @param  array  $paginated
     * @param  array  $default
     * @return array
     */
    public function paginationInformation($request, $paginated, $default)
    {
        return ['paginate' => Arr::only($default['meta'], ['current_page', 'total', 'last_page'])];
    }
}
