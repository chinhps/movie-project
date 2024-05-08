<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'status',
        'level',
        'login_type',
        'provider_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, "user_id");
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class, "user_id");
    }

    public function movieHistories(): HasMany
    {
        return $this->hasMany(MovieHistory::class, "user_id");
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, "user_id");
    }

    public function movieRates(): HasMany
    {
        return $this->hasMany(MovieRate::class, "user_id");
    }

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, "bookmarks", "user_id", "movie_id");
    }
}
