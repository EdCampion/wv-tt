import { Injectable } from '@angular/core';
import { ImageAPIResponse } from './interfaces';
import { Observable } from 'rxjs';
/**
 *
 *
 * @export
 * @abstract
 * @class ImageService
 * Contract for Image API services to enable easy swapping of apis used to fetch images
 */
@Injectable()
export abstract class ImageService {

  /**
   *
   *
   * Fetch page of images
   * @abstract
   * @param {number} page page of images to fetch
   * @returns {Observable<ImageAPIResponse>} Observable<ImageAPIResponse> Generic API response interface
   * 
   * @memberof ImageService
   */
  abstract getImages(page:number): Observable<ImageAPIResponse>


   /**
   *
   *
   * Fetch image by id
   * @abstract
   * @param {number} page id of image to fetch
   * @returns {Observable<ImageAPIResponse>} Observable<ImageAPIResponse> Generic API response interface
   * @memberof ImageService
   */
  abstract getImageDetail(id:number): Observable<ImageAPIResponse>
}
