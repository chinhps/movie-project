<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpisodeVocabulary extends Model
{
    use HasFactory;

    protected $table = 'episode_vocabularies';

    protected $guarded = [];
}
