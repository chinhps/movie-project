<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MovieEpisode extends Model
{
    use HasFactory;
    protected $table = "movie_episodes";

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, "movie_id");
    }

    public function movieSources(): HasMany
    {
        return $this->hasMany(MovieSource::class, 'movie_episode_id');
    }
}