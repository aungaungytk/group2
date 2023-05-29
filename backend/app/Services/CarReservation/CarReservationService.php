<?php

namespace App\Services\CarReservation;

use App\Models\CarReservation;
use Carbon\Carbon;

class CarReservationService implements CarReservationServiceInterface
{
    public function store($data)
    {
        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);
        $inputTime = Carbon::parse($data['start_time']);
        $currentTime = Carbon::now()->format('h:i A');

        if ($inputDate >= $currentDateTime || $inputTime >= $currentTime) {
            if ($data['car_id'] != null && isset($data['car_id'])) {
                $inputCar = $data['car_id'];

                $existingReservation = CarReservation::all();
                $inputStartTime = $data['start_time'];
                $inputEndTime = $data['end_time'];
                foreach ($existingReservation as $reservation) {
                    $overlap = $this->checkCarReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputCar);
                    if ($overlap) {
                        return "Unable to make reservation within that time.";
                        exit();
                    }
                }
                return CarReservation::create($data);
            }
        } else {
            return "Please select the date greater than current date.";
        }
    }
    public function checkCarReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputCar)
    {
        $overlap = CarReservation::where('car_id', $inputCar)->where('date', '=', $inputDate)->where(function ($query) use ($inputStartTime, $inputEndTime) {
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
    public function update($data, $id)
    {
        // $currentDateTime = Carbon::now();
        // $inputDate = Carbon::parse($data['date']);

        // if ($inputDate < $currentDateTime) {
        //     return "Please select the date greater than current date.";
        // }
        // $inputCarId = $data['car_id'];
        // //$inputDate = $data['date'];
        // $existingReservation = CarReservation::where('car_id', $inputCarId)
        //     ->where('date', $inputDate)
        //     ->where('status', 1)
        //     ->first();

        // if ($existingReservation) {
        //     return "Unable to make reservation within this time.";
        //     exit();
        // }
        $carReservation = CarReservation::where('id', $id)->first();
        return $carReservation->update($data);
    }
    public function delete($id)
    {
        return CarReservation::where('id', $id)->delete();
    }
}
