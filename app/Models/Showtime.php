<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Showtime extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = 'movie';

    protected $guarded = ['id'];

    protected $casts = [
        'play_time' => 'datetime:d M Y H:i'
    ];

    public function scopeSearchShowtime($query)
    {
        $query->when(request('search') ?? false, function ($query) {
            $query->whereHas('movie', fn($query) => $query->where('title', 'like', '%' . request('search') . '%'));
        });
    }

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    public function seats(): BelongsToMany
    {
        return $this->belongsToMany(Seat::class,
            'showtime_seat',
            'showtime_id',
            'seat_id');
    }
}
