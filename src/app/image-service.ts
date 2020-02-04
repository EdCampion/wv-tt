import { Injectable } from '@angular/core';
import { ImageAPIResponse } from './interfaces';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ImageService {
  abstract getImages(page:number): Observable<ImageAPIResponse>;
  abstract getImageDetail(id:string): Observable<ImageAPIResponse>;
}