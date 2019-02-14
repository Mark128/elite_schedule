import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
    public favorites = []; 


    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private loadingController: LoadingController,
        private eliteApi: EliteApiProvider,
        private userSettings: UserSettingsProvider) {
    }

    ionViewDidLoad() {
    
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
    }

    goToTournaments(){
        this.navCtrl.push(TournamentsPage); 
    }

    ionViewDidEnter(){
        this.favorites = this.userSettings.getAllFavorites();
    }

}
