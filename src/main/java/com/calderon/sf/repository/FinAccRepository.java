package com.calderon.sf.repository;

import com.calderon.sf.domain.FinAcc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the FinAcc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinAccRepository extends SecuredJpaRepository<FinAcc> {

    @Query("select fin_acc from FinAcc fin_acc where fin_acc.user.login = ?#{principal.username}")
    List<FinAcc> findByUserIsCurrentUser();

}
