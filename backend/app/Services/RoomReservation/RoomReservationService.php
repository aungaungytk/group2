<?php

namespace App\Services\RoomReservation;

use Carbon\Carbon;
use App\Models\Room;
use App\Models\RoomReservation;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;


class RoomReservationService implements RoomReservationServiceInterface
{
    public function store($data)
    {
        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);
        $inputTime = Carbon::parse($data['start_time']);
        $currentTime = Carbon::now()->format('h:i A');

        if ($inputDate >= $currentDateTime || $inputTime >= $currentTime) {
            if ($data['room_id'] != null && isset($data['room_id'])) {

                $reservations = RoomReservation::all();
                $inputStartTime = $data['start_time'];
                $inputEndTime = $data['end_time'];

                $inputRoom = $data['room_id'];
                if (!empty($reservations)) {
                    foreach ($reservations as $reservation) {
                        $overlap = $this->checkRoomReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputRoom);

                        if ($overlap) {
                            //return response()->json(['error' => 'Unable to make reservation during that time.'], 500);
                            return "Unable to make reservation withing that time";
                            exit();
                        } else {
                            return $this->makeRoomReservation($data);
                        }
                    }
                }
                return $this->makeRoomReservation($data);
            }
        } else {
            return "Error in your selected date time";
        }
    }

    public function update($data, $id)
    {

        $result = RoomReservation::where('id', $id)->first();
        if($result['user_id'] !== Auth::user()->id){
            return "You have no permission to update this record.";
        }
        // dd($result['user_id']);

        $inputDate = Carbon::parse($data['date']);
        $currentDateTime = Carbon::now();

        if ($inputDate >= $currentDateTime && isset($data['room_id'])) {
            $reservations = RoomReservation::all();
            $inputStartTime = $data['start_time'];
            $inputEndTime = $data['end_time'];

            $inputRoom = $data['room_id'];
            foreach ($reservations as $reservation) {

                $overlap = $this->checkRoomReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputRoom);

                if ($overlap) {
                    return "Unable to make reservation within that time";
                    exit();
                } else {
                    return $result->update([
                        'title' => $data['title'],
                        'description' => $data['description'],
                        'start_time' => $data['start_time'],
                        'end_time' => $data['end_time'],
                        'date' => $data['date'],
                        'user_id' => $data['user_id'],
                        'room_id' => $data['room_id'],
                    ]);
                }
            }
        } else {
            return "Error in your input .";
        }
    }

    public function delete($id)
    {
        $data = RoomReservation::where('id', $id)->first();
        if($data['user_id'] !== Auth::user()->id){
            return "You have no permission to delete this record.";
        }
        return $data->delete();
    }


    public function makeRoomReservation($data)
    {
        return RoomReservation::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'date' => $data['date'],
            'user_id' => $data['user_id'],
            'room_id' => $data['room_id'],
        ]);
    }

    public function checkRoomReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputRoom)
    {
        $overlap = RoomReservation::where('room_id', $inputRoom)->where('date', '=', $inputDate)->where(function ($query) use ($inputStartTime, $inputEndTime) {
            $query->where(function ($query) use ($inputStartTime, $inputEndTime) {
                $query->where('start_time', '>=', $inputEndTime)
                    ->where('end_time', '<=', $inputStartTime);
            })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '<', $inputStartTime)
                        ->where('end_time', '>', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '>', $inputStartTime)
                        ->where('end_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '<', $inputStartTime)
                        ->where('end_time', '=', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '>', $inputStartTime)
                        ->where('start_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('start_time', '=', $inputStartTime)
                        ->where('start_time', '<=', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('end_time', '>', $inputStartTime)
                        ->where('end_time', '<', $inputEndTime);
                })
                ->orWhere(function ($query) use ($inputStartTime, $inputEndTime) {
                    $query->where('end_time', '>=', $inputStartTime)
                        ->where('end_time', '=', $inputEndTime);
                });
        })->exists();
        return $overlap;
    }
}
