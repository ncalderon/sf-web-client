package com.calderon.sf.domain.predicates;

import com.calderon.sf.domain.QAccountTransaction;
import com.calderon.sf.security.SecurityUtils;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import java.util.Objects;

public class TransactionPredicate {
    private static QAccountTransaction qTransaction;
    public static final Predicate of(Long accountId, TransactionCriteria tranCriteria){
        BooleanExpression expression = null;
        qTransaction = QAccountTransaction.accountTransaction;
        expression = AndOf(expression, qTransaction.user.login.eq(SecurityUtils.getCurrentUserLogin()));
        expression = AndOf(expression, qTransaction.financeAccount.id.eq(accountId));
        if(!Objects.isNull(tranCriteria.getDesc()) && !tranCriteria.getDesc().isEmpty())
            expression = AndOf(expression, qTransaction.description.likeIgnoreCase(tranCriteria.getDesc()));

        if(!Objects.isNull(tranCriteria.getStartDate()) && !Objects.isNull(tranCriteria.getStartDate()))
            expression = AndOf(expression, qTransaction.postDate.goe(tranCriteria.getStartDate()).and(qTransaction.postDate.loe(tranCriteria.getStartDate())));

        if(!Objects.isNull(tranCriteria.getStartAmount()))
            expression = AndOf(expression, qTransaction.amount.goe(tranCriteria.getStartAmount()));

        if(!Objects.isNull(tranCriteria.getEndAmount()))
            expression = AndOf(expression, qTransaction.amount.loe(tranCriteria.getEndAmount()));

        return expression;
    }

    private static BooleanExpression AndOf(BooleanExpression ex1, BooleanExpression ex2){
        if(ex1 == null)
            return ex2;
        if(ex2 == null)
            return ex1;
        return ex1.and(ex2);
    }



}
