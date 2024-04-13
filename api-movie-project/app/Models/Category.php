<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;
    protected $table = "categories";

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, "category_movie", "category_id", "movie_id");
    }
}
