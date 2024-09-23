<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MovieEpisode extends Model
{
    use HasFactory;

    protected $table = 'movie_episodes';

    protected $guarded = [];

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }

    public function movieSources(): HasMany
    {
        return $this->hasMany(MovieSource::class, 'movie_episode_id');
    }

    public function movieSubtitles(): HasMany
    {
        return $this->hasMany(MovieSubtitle::class, 'movie_episode_id');
    }

    public function vocabulary(): HasOne
    {
        return $this->hasOne(EpisodeVocabulary::class, 'movie_episode_id');
    }
}
