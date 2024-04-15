<?php

namespace App\Repositories\Movie;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Model;

class MovieRepository implements MovieInterface
{
    public function __construct(
        private Model $model = new Movie()
    ) {
    }

    public function moviesRecent()
    {
        return 123;
    }
}
