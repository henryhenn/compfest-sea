<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Showtime extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = 'movie';

    protected $guarded = ['id'];

    protected $casts = ['play_time'];

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }
}
