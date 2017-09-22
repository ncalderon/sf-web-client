import {Injectable} from '@angular/core';

@Injectable()
export class DatetimeService {

    constructor() {
    }

    now(): string {
        const date: Date = new Date();
        return date.toString();
    }

    nowLocalDate(): any {
        const date: Date = new Date();
        return {
            year: date.getFullYear()
            , month: date.getMonth()+1
            , day: date.getDate()
        };
    }

}
