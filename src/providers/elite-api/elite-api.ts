

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class EliteApiProvider {

  private baseUrl = 'https://elite-schedule-app-i2-eeb59.firebaseio.com';
  private currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: HttpClient) {
   
  }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res));
        });
    }

    getTournamentData(tourneyId, forceRefresh : boolean = false) : Observable<any> {
       if(!forceRefresh && this.tourneyData[tourneyId]) {
           this.currentTourney = this.tourneyData[tourneyId];
           Observable.of(this.currentTourney);
       }

       return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
        .map(response => {
            this.tourneyData[tourneyId] = response;
            this.currentTourney = this.tourneyData[tourneyId];
            return this.currentTourney;
        });
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTourney.tournament.id, true);
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

}
