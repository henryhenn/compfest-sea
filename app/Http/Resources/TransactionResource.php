<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => auth()->user(),
            'total_cost' => $this->total_cost,
            'is_canceled' => $this->is_canceled,
            'created_at' => $this->created_at->format('d M Y H:i'),
            'updated_at' => $this->updated_at->format('d M Y H:i'),
            'showtime' => $this->showtime_id
        ];
    }
}
