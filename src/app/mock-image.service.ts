import { Injectable } from "@angular/core";
import { ImageAPIResponse} from "./interfaces";
import { ImageService } from "./image-service";
import { Observable, of } from "rxjs";
/**
 *
 * Mock Image Service for tests
 * @export
 * @class MockImageService
 * @implements {ImageService}
 */
@Injectable({
  providedIn: "root"
})

export class MockImageService implements ImageService {
  constructor() {}
  
  getImages(page: number): Observable<ImageAPIResponse> {
    return of({ 
        totalHits:2,
        total:166248,
        hits:[ 
           { 
              largeImageURL: 'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
              id:4792149,
              webformatURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
              tags:'blue tit, tit, songbird',
              downloads:1177,
              user:'Capri23auto',
              imageSize:1042156,
           },
           {
            largeImageURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
            id: 4801688,
            webformatURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
            tags: 'sunset, sky, boy',
            downloads: 9183,
            user: 'TerriAnneAllen',
            imageSize: 2108094,
            }
         ]
       })
  }
  
  getImageDetail(id: number): Observable<ImageAPIResponse> {
    return of({ 
        totalHits:1,
        total:1,
        hits:[ 
           { 
              largeImageURL: 'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
              id:4792149,
              webformatURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
              tags:'blue tit, tit, songbird',
              downloads:1177,
              user:'Capri23auto',
              imageSize:1042156,
           }
         ]
       })
    }
  }