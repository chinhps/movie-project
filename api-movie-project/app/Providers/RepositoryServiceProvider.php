<?php

namespace App\Providers;

use App\Repositories\Bookmark\BookmarkInterface;
use App\Repositories\Bookmark\BookmarkRepository;
use App\Repositories\Category\CategoryInterface;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Comment\CommentInterface;
use App\Repositories\Comment\CommentRepository;
use App\Repositories\EpisodeSource\EpisodeSourceInterface;
use App\Repositories\EpisodeSource\EpisodeSourceRepository;
use App\Repositories\HLS\HLSInterface;
use App\Repositories\HLS\HLSRepository;
use App\Repositories\Information\InformationInterface;
use App\Repositories\Information\InformationRepository;
use App\Repositories\Movie\MovieInterface;
use App\Repositories\Movie\MovieRepository;
use App\Repositories\MovieEpisode\MovieEpisodeInterface;
use App\Repositories\MovieEpisode\MovieEpisodeRepository;
use App\Repositories\MovieHistory\MovieHistoryInterface;
use App\Repositories\MovieHistory\MovieHistoryRepository;
use App\Repositories\Notification\NotificationInterface;
use App\Repositories\Notification\NotificationRepository;
use App\Repositories\Plugin\PluginInterface;
use App\Repositories\Plugin\PluginRepository;
use App\Repositories\Report\ReportInterface;
use App\Repositories\Report\ReportRepository;
use App\Repositories\User\UserInterface;
use App\Repositories\User\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MovieInterface::class, MovieRepository::class);
        $this->app->bind(MovieEpisodeInterface::class, MovieEpisodeRepository::class);
        $this->app->bind(CommentInterface::class, CommentRepository::class);
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(NotificationInterface::class, NotificationRepository::class);
        $this->app->bind(ReportInterface::class, ReportRepository::class);
        $this->app->bind(BookmarkInterface::class, BookmarkRepository::class);
        $this->app->bind(MovieHistoryInterface::class, MovieHistoryRepository::class);
        $this->app->bind(EpisodeSourceInterface::class, EpisodeSourceRepository::class);
        $this->app->bind(HLSInterface::class, HLSRepository::class);
        $this->app->bind(PluginInterface::class, PluginRepository::class);
    }
}
