<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Seat extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['seat_number'];

    public function showtimes(): BelongsToMany
    {
        return $this->belongsToMany(
            Showtime::class,
            'showtime_seat',
            'seat_id',
            'showtime_id'
        );
    }
}
