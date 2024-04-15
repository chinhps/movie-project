<?php

namespace App\Providers;

use App\Repositories\Category\CategoryInterface;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Comment\CommentInterface;
use App\Repositories\Comment\CommentRepository;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\Movie\MovieRepository;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use App\Repositories\MovieEpisode\MovieEpisodeRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MovieInterface::class, MovieRepository::class);
        $this->app->bind(MovieEpisodeInterface::class, MovieEpisodeRepository::class);
        $this->app->bind(CommentInterface::class, CommentRepository::class);
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);
    }
}
