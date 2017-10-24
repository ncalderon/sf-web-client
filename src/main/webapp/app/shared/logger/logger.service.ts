import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {

    constructor() {
    }

    public log(msg: any) {
        console.log(msg);
    }

    info(msg: any){
        console.info(msg);
    }

    error(msg: any) {
        console.error(msg);
    }

    warn(msg: any) {
        console.warn(msg);
    }
}
