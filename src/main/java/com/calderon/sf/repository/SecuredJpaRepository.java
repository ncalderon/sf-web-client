package com.calderon.sf.repository;

import com.calderon.sf.domain.BaseUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface SecuredJpaRepository<T extends BaseUserEntity> extends JpaRepository<T, Long> {
    @Override
    @Query("select t from #{#entityName} t where 1=?#{hasRole('ROLE_ADMIN') ? 1 : 0} or  t.user.login = ?#{principal.username}")
    List<T> findAll();

    @Override
    @Query("select t from #{#entityName} t where 1=?#{hasRole('ROLE_ADMIN') ? 1 : 0} or  t.user.login = ?#{principal.username}")
    Page<T> findAll(Pageable pageable);

    @Override
    @Query("select t from #{#entityName} t where t.id = ?1 and (t.user.login = ?#{principal.username} or 1=?#{hasRole('ROLE_ADMIN') ? 1 : 0})")
    Optional<T> findById(Long aLong);

}
