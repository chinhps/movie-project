<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MovieReport extends Model
{
    use HasFactory;
    protected $table = "movie_reports";
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function reportable(): MorphTo
    {
        return $this->morphTo("reportable");
    }

    public function movie(): MorphOne
    {
        return $this->morphOne(Movie::class, "reportable");
    }

    public function comment(): MorphOne
    {
        return $this->morphOne(Comment::class, "reportable");
    }
}
