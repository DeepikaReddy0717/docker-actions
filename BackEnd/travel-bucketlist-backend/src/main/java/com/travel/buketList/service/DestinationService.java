package com.travel.buketList.service;
import com.travel.buketList.model.Destination;
import com.travel.buketList.repository.DestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {

    private final DestinationRepository repository;

    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    public List<Destination> getAllDestinations() {
        return repository.findAll();
    }

    public Optional<Destination> getDestinationById(Long id) {
        return repository.findById(id);
    }

    public Destination addDestination(Destination destination) {
        return repository.save(destination);
    }

    public Destination updateDestination(Destination destination) {
        return repository.save(destination);
    }

    public void deleteDestination(Long id) {
        repository.deleteById(id);
    }
}
