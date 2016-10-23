import { createConnection } from '../../lib/typeorm/index'
import "reflect-metadata";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {

      createConnection({
        driver: {
          type: "sqlite",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "admin",
          database: "test"
        },
        autoSchemaSync: true,
      }).then(connection => {
        console.log(connection);
        // here you can start to work with your entities
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
