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
            if (tran.tranType === TranType.EXPENSE) {
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
        let arr = [];
        let lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        for (const tran of this.transactions) {
            if (tran.postDate.getFullYear() !== year) {
                continue;
            }
            let month = tran.postDate.getMonth();
            arr.push(month);
        }
        arr.sort((a, b) => {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        });
        let labels = [];
        for(const val of arr) {
            labels.push(lineChartLabels[val]);
        }
        return labels;
    }

}
