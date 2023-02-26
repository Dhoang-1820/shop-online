import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BearerService {
    private missionAnnouncedSource = new Subject<string>()
    private missionConfirmedSource = new Subject<string>()

    missionAnnounced$ = this.missionAnnouncedSource.asObservable()
    missionConfirmed$ = this.missionConfirmedSource.asObservable()

    // Service message commands
    announceMission(mission: string) {
        this.missionAnnouncedSource.next(mission)
    }

    confirmMission(astronaut: string) {
        this.missionConfirmedSource.next(astronaut)
    }

    constructor() {}
}
