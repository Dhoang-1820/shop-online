import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { BearerService } from 'src/app/services/bearer.service'

@Component({
    selector: 'app-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
    subscription: Subscription;
    message!: string;
    isFetch!: boolean;

    constructor(private bearerService: BearerService) {
        this.isFetch = false;
        this.subscription = bearerService.valuePassed$.subscribe(msg => {
            this.message = msg;
            this.checkCart();
        })
        
    }

    ngOnInit(): void {}

    checkCart(): void {
        this.isFetch = !this.isFetch;
    }
}
