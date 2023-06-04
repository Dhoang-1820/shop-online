import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BearerService {

    private valuePassedCourse = new Subject<any>();
    valuePassed$ = this.valuePassedCourse.asObservable();

    private headerSource = new Subject<any>();
    headerPass = this.headerSource.asObservable();

    constructor() {}

    passValue(value: any): void {
        this.valuePassedCourse.next(value);
    }

    pass2Header(value: any): void {
        this.headerSource.next(value);
    }
}
