<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MovieSubtitle extends Model
{
    use HasFactory;
    protected $table = "movie_subtitles";
    protected $guarded = [];

    public function movieEpisode(): BelongsTo
    {
        return $this->belongsTo(MovieEpisode::class, "movie_episode_id");
    }
}
