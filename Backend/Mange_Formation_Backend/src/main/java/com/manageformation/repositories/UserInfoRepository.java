package com.manageformation.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.manageformation.entities.UserInfo;
import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByEmail(String username);
}
