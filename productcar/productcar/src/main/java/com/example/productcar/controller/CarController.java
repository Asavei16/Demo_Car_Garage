package com.example.productcar.controller;

import com.example.productcar.exception.ResourceNotFoundException;
import com.example.productcar.model.Car;
import com.example.productcar.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/garage")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    //get all cars
    @GetMapping("/cars")
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    //create cars rest api
    @PostMapping("/cars")
    public Car createCar(@RequestBody Car car){
        return carRepository.save(car);
    }

    // get car by id rest api
    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id :" + id));
        return ResponseEntity.ok(car);
    }

    // update car rest api

    @PutMapping("/cars/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        car.setName(carDetails.getName());
        car.setBrand(carDetails.getBrand());
        car.setMadein(carDetails.getMadein());
        car.setPrice(carDetails.getPrice());

        Car updatedCar = carRepository.save(car);
        return ResponseEntity.ok(updatedCar);
    }

    // delete car rest api
    @DeleteMapping("/cars/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCar(@PathVariable Long id){
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not exist with id :" + id));

        carRepository.delete(car);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
