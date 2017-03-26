import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule, StorageConfig } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { InterestPage } from '../pages/interest-page/interest-page';
import { FeedPage } from '../pages/feed/feed';

import { CloudModule, CloudSettings } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '6baf9c31'
  }
};

const storageSettings: StorageConfig = {
  name: '--myDB',
  driverOrder: ['localstorage', 'Indexeddb', 'sqlite', 'websql']
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InterestPage,
    FeedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(storageSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InterestPage,
    FeedPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
