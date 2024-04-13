<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory;
    protected $table = "movies";

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, "category_movie", "movie_id", "category_id");
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, "movie_id");
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class, "movie_id");
    }

    public function movieRate(): HasMany
    {
        return $this->hasMany(MovieRate::class, "movie_id");
    }

    public function movieEpisodes(): HasMany
    {
        return $this->hasMany(MovieEpisode::class, "movie_id");
    }

    public function movieHistories(): HasMany
    {
        return $this->hasMany(MovieHistory::class, "movie_id");
    }

    public function movieReports(): HasMany
    {
        return $this->hasMany(MovieReport::class, "movie_id");
    }
}