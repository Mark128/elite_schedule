import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage) {
    
  }

  favoriteTeam(team, tournamentId, tournamentName){
    let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team){
    this.storage.remove(team.id.toString());
  }

  isFavoriteTeam(teamId: string) : Promise<boolean>{
    return this.storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites() {
    let results = [];
    this.storage.forEach(data => {
      results.push(JSON.parse(data));
    });
    return results;
  }

}
