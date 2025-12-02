package Api.InstantPlay.repository;

import Api.InstantPlay.models.Role;
import Api.InstantPlay.models.enums.RoleName;
import org.springframework. data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}