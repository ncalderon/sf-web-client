package com.calderon.sf.service.mapper;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.transport.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TransactionMapper {

    public List<AccountTransaction> TransactionToAccountTransaction(List<Transaction> trans) {
        return trans.stream()
            .filter(Objects::nonNull)
            .map(this::TransactionToAccountTransaction)
            .collect(Collectors.toList());
    }
    public AccountTransaction TransactionToAccountTransaction(Transaction tran) {
        if (tran == null) {
            return null;
        } else {
            AccountTransaction transaction = new AccountTransaction();
            transaction.setAmount(tran.getTranAmount());
            transaction.setDescription(tran.getTranDesc());
            transaction.setPostDate(tran.getTranPostDate());
            transaction.setReferenceNumber(tran.getTranRefNum());
            transaction.setTranNumber(tran.getTranNum());
            transaction.setTranType(tran.getType().id() == 1? TranType.EXPENSE:TranType.INCOME);
            return transaction;
        }
    }
}
