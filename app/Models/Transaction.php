<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime:d M Y H:i',
        'updated_at' => 'datetime:d M Y H:i',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->timezone('Asia/Jakarta');
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class);
    }

    public function showtime(): HasOne
    {
        return $this->hasOne(Showtime::class);
    }
}
