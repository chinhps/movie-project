<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MovieReport extends Model
{
    use HasFactory;
    protected $table = "movie_reports";

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, "movie_id");
    }
}
