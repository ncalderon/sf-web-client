package com.calderon.sf.repository;

import com.calderon.sf.domain.TranCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the TranCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranCategoryRepository extends JpaRepository<TranCategory, Long> {

    @Query("select tran_category from TranCategory tran_category where tran_category.user.login = ?#{principal.username}")
    List<TranCategory> findByUserIsCurrentUser();

    @Query("select tran_category from TranCategory tran_category where tran_category.user.login = ?#{principal.username}")
    Page<TranCategory> findByUserIsCurrentUser(Pageable pageable);


}
