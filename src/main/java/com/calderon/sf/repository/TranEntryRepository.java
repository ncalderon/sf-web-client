package com.calderon.sf.repository;

import com.calderon.sf.domain.TranEntry;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TranEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranEntryRepository extends JpaRepository<TranEntry, Long> {

    @Query("select tran_entry from TranEntry tran_entry where tran_entry.user.login = ?#{principal.username}")
    List<TranEntry> findByUserIsCurrentUser();

}
