package com.calderon.sf.repository;

import com.calderon.sf.domain.TranCategoryRegex;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the TranCategoryRegex entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranCategoryRegexRepository extends JpaRepository<TranCategoryRegex, Long> {

    @Query("select tran_category_regex from TranCategoryRegex tran_category_regex where tran_category_regex.user.login = ?#{principal.username}")
    List<TranCategoryRegex> findByUserIsCurrentUser();

    @Query("select tran_category_regex from TranCategoryRegex tran_category_regex where tran_category_regex.user.login = ?#{principal.username}")
    Page<TranCategoryRegex> findByUserIsCurrentUser(Pageable pageable);


}
