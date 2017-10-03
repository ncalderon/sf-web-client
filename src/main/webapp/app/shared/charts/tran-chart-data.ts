import {AccountTransaction, TranType} from '../../sf-entities/account-transaction/account-transaction.model';

export class TranChartData {

    constructor(private transactions: AccountTransaction[]) {

    }

    getChartData(year: number): Array<any> {
        let arr = [];
        let expenseDataObj = { data: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], label: 'EXPENSES'};
        let incomesDataObj = { data: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], label: 'INCOMES'};

        for(const tran of this.transactions){
            if (tran.postDate.getFullYear() !== year) {
                continue;
            }

            let month = tran.postDate.getMonth();
            let currentVal = expenseDataObj.data[month];
            currentVal = currentVal == -1 ? 0 : currentVal;
            let acc = tran.amount + currentVal;
            /*let label = new DecimalPipe('USD').transform(acc, '2.2-2');*/
            if (<string><any>tran.tranType === 'EXPENSE') {
                incomesDataObj.data[month] = 0;
                expenseDataObj.data[month] = acc;
            }else {
                expenseDataObj.data[month] = 0;
                incomesDataObj.data[month] = acc;
            }
        }

        expenseDataObj.data = expenseDataObj.data.filter((value) => {
            return value !== -1;
        });

        incomesDataObj.data = incomesDataObj.data.filter((value) => {
            return value !== -1;
        });

        arr.push(expenseDataObj);
        arr.push(incomesDataObj);
        return arr;
    }

    getChartLabels(year: number) {
        const arr = [];
        const months = {
            'Jan' : false,
            'Feb' : false,
            'Mar' : false,
            'Apr' : false,
            'May' : false,
            'Jun' : false,
            'Jul' : false,
            'Aug' : false,
            'Sept': false,
            'Oct' : false,
            'Nov' : false,
            'Dec' : false
        };
        const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        for (const tran of this.transactions) {
            if (tran.postDate.getFullYear() !== year) {
                continue;
            }
            const month = tran.postDate.getMonth();
            months[chartLabels[month]] = true;
        }

        for (const val in months) {
            if (months[val] === true) {
                arr.push(val);
            }
        }
        return arr;
    }

}
