import { Component, OnInit, OnDestroy } from "@angular/core";

import { GalleryImage } from "../interfaces";
import { ImageService } from "../image-service";
import { PixabayImageService } from '../pixabay-image.service';
import { Subscription } from 'rxjs';
/**
 *
 *
 * @export
 * @class GalleryViewComponent
 * Provides an infinite scrolled gallery view which loads images via api
 * @implements {OnInit}
 */
@Component({
  selector: "app-gallery-view",
  templateUrl: "./gallery-view.component.html",
  styleUrls: ["./gallery-view.component.css"],
  providers: [{ provide: ImageService, useClass: PixabayImageService }]
})

export class GalleryViewComponent implements OnInit, OnDestroy {
  gridImages: Array<GalleryImage>
  currPage: number
  scrollable: boolean
  total: number
  imageSub: Subscription
  /**
   *Creates an instance of GalleryViewComponent.
   * @param {ImageService} imgSrv service fulfilling ImageService contract
   * @memberof GalleryViewComponent
   */
  constructor(private imgSrv: ImageService) {
    this.currPage = 1
    this.total = 0
    this.scrollable = true
    this.gridImages = <GalleryImage[]>[]
    this.imageSub = new Subscription
  }
/**
 *Retrieve images using service. On successful retrieval
  add the returned images to the store (gridImages) and advance page.
 *
 * @memberof GalleryViewComponent
 */
getImages() {
    this.imageSub.add(this.imgSrv.getImages(this.currPage).subscribe(
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
    ));
  }

  ngOnInit() {
    // load initial images
    this.getImages();
  }

  ngOnDestroy() {
    this.imageSub.unsubscribe();
  }

  onScrollUp() {}
/**
 * Handle callback from infinite scroll.
 * If there are images to fetch and we do not have a pending request
 * then fetch next batch
 *
 * @memberof GalleryViewComponent
 */
onScrollDown() {
    if (this.scrollable && this.gridImages.length < this.total) {
      this.scrollable = false;
      this.getImages();
    }
  }
}
