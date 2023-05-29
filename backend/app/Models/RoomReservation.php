<?php

namespace App\Models;

use App\Models\Room;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class RoomReservation extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'start_time', 'end_time',  'date', 'room_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->with('team');
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
