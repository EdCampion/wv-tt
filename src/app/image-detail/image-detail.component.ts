import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {GalleryImage} from '../interfaces'
import { PixabayImageService } from '../pixabay-image.service';
import { ImageService } from '../image-service';

@Component({
  selector: 'image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers: [{ provide: ImageService, useClass: PixabayImageService }]
})
export class ImageDetailComponent implements OnInit {
  image: GalleryImage | undefined
  constructor( private route: ActivatedRoute,
    private imgSrv: ImageService
    ) {
      
     }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.imgSrv.getImageDetail(id)
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
