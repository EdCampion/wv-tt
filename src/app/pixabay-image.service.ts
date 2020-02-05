import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PixaBayResponse, ImageAPIResponse, GalleryImage } from "./interfaces";
import { ImageService } from "./image-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
/**
 * Service to communicate with the Pixabay API
 *
 * @export
 * @class PixabayImageService
 * @implements {ImageService} 
 */
@Injectable({
  providedIn: "root"
})

export class PixabayImageService implements ImageService {
  API_KEY = "6473511-0417f2cad683f1bee54cafe15";
  API_ROOT = "https://pixabay.com/api/";
  constructor(private http: HttpClient) {}
  

  getImages(page: number): Observable<ImageAPIResponse> {
    //Make http call (getImagesAPI) and then transform response (processPixaBayResponse) to generic response (ImageAPIResponse)
    return this.getImagesAPI(page).pipe(
      map(pixaRes => this.processPixaBayResponse(pixaRes))
    );
  }
  
  getImageDetail(id: number): Observable<ImageAPIResponse> {
    //Make http call (getImageDetailAPI) and then transform response (processPixaBayResponse) to generic response (ImageAPIResponse)
    return this.getImageDetailAPI(id).pipe(
      map(pixaRes => this.processPixaBayResponse(pixaRes))
    );
  }

  getImagesAPI(page: number): Observable<PixaBayResponse> {
    const IMAGES_URL = `${this.API_ROOT}?key=${this.API_KEY}&page=${page}&category=animals`;
    return this.http.get<PixaBayResponse>(IMAGES_URL);
  }

  getImageDetailAPI(id: number): Observable<PixaBayResponse> {
    const IMAGE_DETAIL_URL = `${this.API_ROOT}?key=${this.API_KEY}&id=${id}`;
    return this.http.get<PixaBayResponse>(IMAGE_DETAIL_URL);
  }
/**
 *
 *Transform the pixabay response to a generic response such that the ImageService contract can be fulfilled
 * @param {PixaBayResponse} pixa response from the pixabay api
 * @returns {ImageAPIResponse} generic image api response
 * @memberof PixabayImageService
 */
processPixaBayResponse(pixa: PixaBayResponse): ImageAPIResponse {
    var resp = {} as ImageAPIResponse;
    resp.totalHits = pixa.totalHits;
    resp.total = pixa.total;
    resp.hits = pixa.hits as Array<GalleryImage>;
    return resp;
  }
}
