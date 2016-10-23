import { createConnection } from '../../lib/typeorm/index'
import "reflect-metadata";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {Photo} from "../database/tables/Photo";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(async () => {

      createConnection({
        driver: {
          type: "websql",
          database: "test"
        },
        entities: [
          Photo
        ],
        logging: {
         logFailedQueryError: true,
          logQueries: true,
          logSchemaCreation: true,
          logOnlyFailedQueries: true
        },
        autoSchemaSync: true,
      }).then(async connection => {
        console.log(connection);

        let photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.fileName = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;

        let photoRepository = connection.getRepository(Photo);

        await photoRepository.persist(photo);
        console.log("Photo has been saved");

        let allPublishedPhotos = await photoRepository.find({ isPublished: true });
        console.log("All published photos: ", allPublishedPhotos);

        // here you can start to work with your entities
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
