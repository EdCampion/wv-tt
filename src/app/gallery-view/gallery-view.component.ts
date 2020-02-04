import { Component, OnInit } from "@angular/core";

import { GalleryImage } from "../interfaces";
import { ImageService } from "../image-service";
import { PixabayImageService } from "../pixabay-image.service";
@Component({
  selector: "app-gallery-view",
  templateUrl: "./gallery-view.component.html",
  styleUrls: ["./gallery-view.component.css"],
  providers: [{ provide: ImageService, useClass: PixabayImageService }]
})
export class GalleryViewComponent implements OnInit {
  gridImages: Array<GalleryImage>;
  currPage: number;
  scrollable: boolean;
  total: number;
  constructor(private imgSrv: ImageService) {
    this.currPage = 1;
    this.total = 0;
    this.scrollable = true;
    this.gridImages = <GalleryImage[]>[];
  }

  getImages() {
    this.imgSrv.getImages(this.currPage).subscribe(
      imgRes => {
        if (!this.total) {
          this.total = imgRes.totalHits;
        }
        this.gridImages = this.gridImages.concat(imgRes.hits);
        this.currPage++;
        this.scrollable = true;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.getImages();
  }

  onScrollUp() {}

  onScrollDown() {
    if (this.scrollable && this.gridImages.length < this.total) {
      this.scrollable = false;
      this.getImages();
    }
  }
}
