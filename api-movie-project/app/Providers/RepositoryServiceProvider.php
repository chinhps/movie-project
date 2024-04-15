<?php

namespace App\Providers;

use App\Repositories\Movie\MovieInterface;
use App\Repositories\Movie\MovieRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MovieInterface::class, MovieRepository::class);
    }
}
