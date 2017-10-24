package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.Bank;
import com.calderon.sf.reader.CsvReader;
import com.calderon.sf.reader.Reader;
import com.calderon.sf.service.mapper.TransactionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.List;

@Service
public class TranFileReaderService {

    private final Logger log = LoggerFactory.getLogger(TranFileReaderService.class);

    private TransactionMapper tranMapper;
    @Autowired
    public void setTranMapper(TransactionMapper tranMapper) {
        this.tranMapper = tranMapper;
    }

    public List<AccountTransaction> read(Bank bank, Path from){
        return tranMapper.TransactionToAccountTransaction(Readers.of(Integer.parseInt(bank.getId().toString()), from).getTransactions());
    }


    private static class Readers {
        public static Reader of(int bankId, Path from){
            switch (bankId){
                case 1:
                    return new CsvReader(from);
                default:
                    return new CsvReader(from);
            }
        }
    }

}


