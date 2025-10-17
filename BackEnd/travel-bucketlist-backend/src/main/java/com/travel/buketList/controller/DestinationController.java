package com.travel.buketList.controller;

import com.travel.buketList.model.Destination;
import com.travel.buketList.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travelapi/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    private final DestinationService service;

    public DestinationController(DestinationService service) {
        this.service = service;
    }

    // GET all
    @GetMapping("/all")
    public List<Destination> getAllDestinations() {
        return service.getAllDestinations();
    }

    // GET by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return service.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST add
    @PostMapping("/add")
    public Destination addDestination(@RequestBody Destination destination) {
        return service.addDestination(destination);
    }

    // PUT update
    @PutMapping("/update")
    public ResponseEntity<Destination> updateDestination(@RequestBody Destination destination) {
        if (destination.getId() == null || service.getDestinationById(destination.getId()).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.updateDestination(destination));
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        service.deleteDestination(id);
        return ResponseEntity.ok().build();
    }
}
