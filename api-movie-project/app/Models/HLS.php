<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HLS extends Model
{
    use HasFactory;
    protected $table = "hls_list";
    protected $guarded = [];
}