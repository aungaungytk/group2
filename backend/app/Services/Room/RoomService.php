<?php

namespace App\Services\Room;

use App\Models\Room;
use Illuminate\Support\Facades\Storage;

class RoomService implements RoomServiceInterface
{
    public function store($data)
    {
        if ($data['image'] ?? false) {
            $imageName = time() . '.' . $data['image']->extension();
            $data['image']->storeAs('public/room_images', $imageName);
            $data['image'] = $imageName;
        }
        return Room::create($data);
    }
    public function update($data, $id)
    {
        $room = Room::where('id', $id)->first();

        if ($data['image'] ?? false) {
            $imageName = time() . '.' . $data['image']->extension();

            if (Storage::exists('public/room_images' . $room->image)) {
                Storage::delete('public/room_images' . $room->image);
            }
            $data['image']->storeAs('public/room_images', $imageName);
            $data['image'] = $imageName;
        }

        return $room->update($data);
    }
    public function delete($id)
    {
        $room = Room::where('id', $id)->first();
        if (Storage::exists('public/room_images/' . $room->image)) {
            Storage::delete('public/room_images/' . $room->image);
        }
        return $room->delete();
    }
}
