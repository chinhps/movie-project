<?php

use App\Helper\Crypto;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

// if (!function_exists('generateToken')) {
//     function generateToken($user)
//     {
//         return Crypto::encrypt($user->createToken(env('APP_KEY'))->plainTextToken, env('APP_KEY'));
//     }
// }

if (! function_exists('RedisFormatPaginate')) {
    function redisFormatPaginate(object $moviesArray)
    {
        return new LengthAwarePaginator(
            $moviesArray->data,
            $moviesArray->total,
            $moviesArray->per_page,
            $moviesArray->current_page,
            [
                'path' => Paginator::resolveCurrentPath(),
                'pageName' => 'page',
            ]
        );
    }
}
