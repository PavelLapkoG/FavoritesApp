import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";
import { QuotePage } from "../quote/quote";
import { SettingsService } from "../../services/settings";

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  quotes: Quote[];

  constructor (private quotesService: QuotesService,
               private modalCtrl: ModalController,
               private settingsService: SettingsService) {}

  ionViewWillEnter(){
    this.quotes = this.quotesService.getFavouritesQuotes();
  }

  onViewQuote(quote: Quote){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove) {
        this.onRemoveFromFavourites(quote);
      }
    } )
  }

  onRemoveFromFavourites(quote: Quote) {
    this.quotesService.removeQuoteFromFavourites(quote);
    this.quotes = this.quotesService.getFavouritesQuotes();
  }

  getBackgroundColor(){
    return this.settingsService.getBackground()? 'altQuoteBackground': 'quoteBackground';
  }

  isAltBackground(){
    return this.settingsService.getBackground();
  }

}
