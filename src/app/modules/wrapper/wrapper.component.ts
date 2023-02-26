import { Component, OnInit } from '@angular/core';
import { BearerService } from 'src/app/services/bearer.service';

@Component({
    selector: 'app-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
    providers: [BearerService],
})
export class WrapperComponent implements OnInit {
    astronauts = ['Lovell', 'Swigert', 'Haise'];
    history: string[] = [];
    missions = ['Fly to the moon!', 'Fly to mars!', 'Fly to Vegas!'];
    nextMission = 0;

    constructor() {}

    ngOnInit(): void {}
}
