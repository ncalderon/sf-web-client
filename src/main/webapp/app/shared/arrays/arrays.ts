import {Injectable} from '@angular/core';

@Injectable()
export class Arrays {

    constructor() {

    }

    mapToMultiDimensionalArray(arr: Array<any>, property: string, offset: number): Array<any> {
        const newArr = [];
        let currentRow = {};
        currentRow[property] = [];
        for (let i = 0; i < arr.length; i++) {
            currentRow[property].push(arr[i]);
            if ((i + 1) % offset === 0) {
                newArr.push(currentRow);
                currentRow = {};
                currentRow[property] = [];
            }
        }
        if (currentRow[property].length > 0)
            newArr.push(currentRow);
        return newArr;
    }
}
