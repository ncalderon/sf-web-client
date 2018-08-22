package com.calderon.sf.repository;

import com.calderon.sf.domain.UserPreference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserPreference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    @Query("select user_preference from UserPreference user_preference where user_preference.user.login = ?#{principal.username}")
    List<UserPreference> findByUserIsCurrentUser();

}
