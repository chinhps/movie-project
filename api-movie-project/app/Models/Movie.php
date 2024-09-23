<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies';

    protected $guarded = [];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_movie', 'movie_id', 'category_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'movie_id');
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class, 'movie_id');
    }

    public function movieRate(): HasMany
    {
        return $this->hasMany(MovieRate::class, 'movie_id');
    }

    public function movieEpisodes(): HasMany
    {
        return $this->hasMany(MovieEpisode::class, 'movie_id');
    }

    public function movieEpisodeLaster(): HasOne
    {
        return $this->hasOne(MovieEpisode::class, 'movie_id')->latest('id');
    }

    public function movieHistories(): HasMany
    {
        return $this->hasMany(MovieHistory::class, 'movie_id');
    }

    public function reports(): MorphMany
    {
        return $this->morphMany(MovieReport::class, 'reportable');
    }

    public function bookmark(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'movie_id', 'user_id');
    }
}
