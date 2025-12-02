package Api.InstantPlay.config;

import Api.InstantPlay.models.Role;
import Api.InstantPlay.models.enums.RoleName;
import Api.InstantPlay.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(RoleRepository roleRepository) {
        return args -> {
            // Vérifier si les rôles existent déjà
            if (roleRepository.findByName(RoleName.ROLE_USER).isEmpty()) {
                Role userRole = new Role();
                userRole.setName(RoleName.ROLE_USER);
                roleRepository.save(userRole);
                System.out.println("✅ Role ROLE_USER créé");
            }

            if (roleRepository.findByName(RoleName.ROLE_ADMIN).isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName(RoleName.ROLE_ADMIN);
                roleRepository.save(adminRole);
                System.out.println("✅ Role ROLE_ADMIN créé");
            }
        };
    }
}
