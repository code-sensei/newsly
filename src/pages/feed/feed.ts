import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  newsapi_key: string = 'bb760047fe38451480798662b487c974'
  user_interests: any[] = []
  user_sources: any[] = []
  valid_sources: any[] = []
  articles: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {

    //Get user_interests pushed from the interests page during signup
    let interests = this.navParams.get('user_interests')

    //Assign pushed interests into local user_interests array
    this.user_interests = interests
    console.log(this.user_interests)

    //Get user sources 
    this.get_sources()     

          // //Get articles
          // this.get_articles()

  }

  //Function to format sources into valid sources supplied by newsapi.org
  format_sources() {

    //Specify starting point
    let index: number = 0

    this.storage.ready().then(() => {
      this.storage.get('user_sources').then((res) => {
        let sources = res

        //resulting sources
        console.log(sources)

        while (index < sources.length) {

          console.log('Source: ' + sources[index])

          //Format source to lower case
          let formatted_source = sources[index].toLowerCase()
          console.log('Formatted Source: ' + formatted_source)

          //Format resulting source using either space character or dot character
          let valid_source = formatted_source.split(' ').join('-')
          console.log('Valid source: ' + valid_source)
          
          //push valid_source into valid_sources array
          this.valid_sources.push(valid_source)
          console.log(this.valid_sources)

          //Store valid sources in localDB
          this.storage.ready().then(() => {
            this.storage.set('valid_sources', this.valid_sources)
            console.log('Saved valid_sources: ' + this.valid_sources)
              console.log('Valid sources saved!')

              //Get articles
              this.get_articles()
            })

          //increment index
          index += 1
        }

      })

    })

          
  }


  get_sources() {
    
    for(let interest of this.user_interests){

      let source_index = 0;
      let valid_interest: string = interest.toLowerCase();

      this.http.get('https://newsapi.org/v1/sources?category=' + valid_interest).map((res) => res.json()).subscribe((data) => {
        console.log(data)
        console.log('data length: ' + data.sources.length)

        while (source_index < data.sources.length) {
          console.log('Current index: ' + source_index)
          this.user_sources.push(data.sources[source_index].name)
          source_index += 1
          console.log('Sources: ' + this.user_sources)
          
        }

        this.storage.ready().then(() => {
          this.storage.set('user_sources', this.user_sources)
          console.log('User sources saved');
          console.log('Formating Sources...')
          this.format_sources();
        })
        
      })

    }

  }

  get_articles() {

    console.log("Getting articles")

    this.storage.ready().then(() => {
      this.storage.get('valid_sources').then((res) => {
        let source = res

        for(let i: number = 0; i < source.length; i++){
          this.http.get('https://newsapi.org/v1/articles?source=' + source[i] + '&sortby=latest&apiKey=' + this.newsapi_key)
          .map((res) => res.json())
          .subscribe((data) => {
            console.log(data)
            this.articles.push(data.articles)
          })
        }
      })
    })

    

    // for(let source of this.valid_sources){

    //   let index: number = 0

    //   while(index < this.valid_sources.length) {

    //     this.http.get('https://newsapi.org/v1/articles?source=' + this.valid_sources[index] + '&sortBy=latest&apiKey=' + this.newsapi_key)
    //       .map((res) => res.json())
    //       .subscribe((data) => {
    //         console.log(data)
    //         this.articles.push(data.articles)
    //         console.log(this.articles)

    //         //save articles to localDB
    //         this.storage.ready().then(() => {
    //           this.storage.set('latest_articles', this.articles)
    //           console.log('Articles saved to local DB')
    //         })
    //         index += 1
    //       })
    //   }

    // }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
