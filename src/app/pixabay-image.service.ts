import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PixaBayResponse, ImageAPIResponse, GalleryImage } from "./interfaces";
import { ImageService } from "./image-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class PixabayImageService implements ImageService {
  API_KEY = "6473511-0417f2cad683f1bee54cafe15";
  API_ROOT = "https://pixabay.com/api/";
  constructor(private http: HttpClient) {}

  getImages(page: number): Observable<ImageAPIResponse> {
    return this.getImagesAPI(page).pipe(
      map(pixaRes => this.processPixaBayResponse(pixaRes))
    );
  }
  
  getImageDetail(id: string): Observable<ImageAPIResponse> {
    return this.getImageDetailAPI(id).pipe(
      map(pixaRes => this.processPixaBayResponse(pixaRes))
    );
  }

  getImagesAPI(page: number): Observable<PixaBayResponse> {
    const IMAGES_URL = `${this.API_ROOT}?key=${this.API_KEY}&page=${page}&per_page=40&category=animals`;
    return this.http.get<PixaBayResponse>(IMAGES_URL);
  }

  getImageDetailAPI(id: string): Observable<PixaBayResponse> {
    const IMAGE_DETAIL_URL = `${this.API_ROOT}?key=${this.API_KEY}&id=${id}`;
    return this.http.get<PixaBayResponse>(IMAGE_DETAIL_URL);
  }

  processPixaBayResponse(pixa: PixaBayResponse): ImageAPIResponse {
    var resp = {} as ImageAPIResponse;
    resp.totalHits = pixa.totalHits;
    resp.hits = pixa.hits as Array<GalleryImage>;
    return resp;
  }
}
