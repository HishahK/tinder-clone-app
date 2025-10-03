<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Picture extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'url', 'order'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}