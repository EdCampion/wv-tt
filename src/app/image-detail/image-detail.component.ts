import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {GalleryImage} from '../interfaces'
import { PixabayImageService } from '../pixabay-image.service';
import { ImageService } from '../image-service';
/**
 *
 *
 * @export
 * @class ImageDetailComponent
 * Provides a detail view of an image and its metadata loaded via api 
 * @implements {OnInit}
 */
@Component({
  selector: 'image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers: [{ provide: ImageService, useClass: PixabayImageService }]
})
export class ImageDetailComponent implements OnInit {
  image: GalleryImage | undefined
  /**
   *Creates an instance of ImageDetailComponent.
   * @param {ActivatedRoute} route pull image id
   * @param {ImageService} imgSrv service fulfilling ImageService contract - swap out for future image apis
   * @memberof ImageDetailComponent
   */
  constructor( private route: ActivatedRoute,
    private imgSrv: ImageService
    ) {
      
     }

  ngOnInit() {
    this.getImage();
  }
/**
 * Fetch image from service by id (from url)
 *
 * @memberof ImageDetailComponent
 */
getImage() {
    const idParam = this.route.snapshot.paramMap.get('id')|| '';
    if(idParam) {
    this.imgSrv.getImageDetail(+idParam)
      .subscribe(imageRes  => {
        if(imageRes.totalHits > 0) {
          this.image = imageRes.hits[0]
        }
        else {
          console.log("No image");
        }
      } );
    }
  }
}
