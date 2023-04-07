package ua.kavyar.repository.unused;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.kavyar.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
