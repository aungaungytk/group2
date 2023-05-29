<?php

namespace App\Services\Car;

use App\Models\Car;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class CarService implements CarServiceInterface
{
    public function store($data)
    {
        if ($data['image'] ?? false) {
            $imageName = time() . '.' . $data['image']->extension();
            $data['image']->storeAs('public/car_images', $imageName);
            $data['image'] = $imageName;
        }
        //dd($data);
        return Car::create($data);
    }
    public function update($data, $id)
    {
        $car = Car::where('id', $id)->first();
        if ($data['image'] ?? false) {
            $imageName = time() . '.' . $data['image']->extension();

            if (Storage::exists('public/car_images' . $car->image)) {
                Storage::delete('public/car_images' . $car->image);
            }
            $data['image']->storeAs('public/car_images', $imageName);
            $data['image'] = $imageName;
        }

        return $car->update($data);
    }
    public function delete($id)
    {
        $car = Car::where('id', $id)->first();
        if (Storage::exists('public/car_images/' . $car->image)) {
            Storage::delete('public/car_images/' . $car->image);
        }
        return $car->delete();
    }
}
