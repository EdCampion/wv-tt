import { TestBed, getTestBed } from '@angular/core/testing';
import { PixabayImageService } from './pixabay-image.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PixaBayResponse, ImageAPIResponse } from './interfaces';

describe('PixabayImageService', () => {
  let injector: TestBed;
  let service: PixabayImageService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PixabayImageService]
    });
    injector = getTestBed();
    service = injector.get(PixabayImageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getImages', () => {
    it('should return an Observable<ImageAPIResponse> with 2 image hits', () => {
      const mockResponse: ImageAPIResponse = { 
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
       };

      const page = 1
      service.getImages(page).subscribe(imgRes => {
        expect(imgRes.hits.length).toBe(2);
        expect(imgRes).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${service.API_ROOT}?key=${service.API_KEY}&page=${page}&category=animals`)
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    })
  })
  describe('#getImageDetail', () => {
    it('should return a Observable<ImageAPIResponse> by image id', () => {
      const id = 4792149
      const mockResponse: ImageAPIResponse = { 
        totalHits:1,
        total:1,
        hits:[ 
           { 
              largeImageURL: 'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
              id:id,
              webformatURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
              tags:'blue tit, tit, songbird',
              downloads:1177,
              user:'Capri23auto',
              imageSize:1042156,
           }
         ]
       };

      service.getImageDetail(id).subscribe(imgRes => {
        expect(imgRes.hits.length).toBe(1);
        expect(imgRes.hits[0].id).toBe(id);
        expect(imgRes).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${service.API_ROOT}?key=${service.API_KEY}&id=${id}`)
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    })
  })
  describe('#getImagesAPI', () => {
    it('should return an Observable<Response> with 2 image hits', () => {
      const mockResponse: PixaBayResponse = { 
        totalHits:2,
        total:166248,
        hits:[ 
           { 
              largeImageURL: 'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
              webformatHeight:427,
              webformatWidth:640,
              likes:32,
              imageWidth:4000,
              id:4792149,
              user_id:1767157,
              imageURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2.jpg',
              views:1447,
              comments:24,
              pageURL:'https://pixabay.com/photos/blue-tit-tit-songbird-bird-4792149/',
              imageHeight:2672,
              webformatURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
              id_hash:'4792149',
              type:'photo',
              previewHeight:100,
              tags:'blue tit, tit, songbird',
              downloads:1177,
              user:'Capri23auto',
              favorites:15,
              imageSize:1042156,
              previewWidth:150,
              userImageURL:'https://cdn.pixabay.com/user/2019/06/21/09-21-09-355_250x250.jpg',
              fullHDURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1920.jpg',
              previewURL:'https://cdn.pixabay.com/photo/2020/01/25/10/35/blue-tit-4792149_150.jpg'
           },
           {
            largeImageURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
            webformatHeight: 366,
            webformatWidth: 640,
            likes: 84,
            imageWidth: 3898,
            id: 4801688,
            user_id: 11192675,
            imageURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2.jpg',
            views: 16205,
            comments: 20,
            pageURL: 'https://pixabay.com/photos/sunset-sky-boy-bird-ocean-4801688/',
            imageHeight: 2232,
            webformatURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
            id_hash: '4801688',
            type: 'photo',
            previewHeight: 85,
            tags: 'sunset, sky, boy',
            downloads: 9183,
            user: 'TerriAnneAllen',
            favorites: 53,
            imageSize: 2108094,
            previewWidth: 150,
            userImageURL: 'https://cdn.pixabay.com/user/2020/02/01/01-18-20-70_250x250.jpeg',
            fullHDURL: 'https://pixabay.com/get/52e8d5424c5aa414ea898279c02b327f1422dfe05b51764f752d79d2_1920.jpg',
            previewURL: 'https://cdn.pixabay.com/photo/2020/01/29/06/39/sunset-4801688_150.jpg',
            }
         ]
       };
          
      const page = 1
      service.getImagesAPI(page).subscribe(pixaRes => {
        expect(pixaRes.hits.length).toBe(2);
        expect(pixaRes).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${service.API_ROOT}?key=${service.API_KEY}&page=${page}&category=animals`)
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    

  });

  describe('#getImagesDetailAPI', () => {
      it('should return an Observable<PixaBayResponse> by image id', () => {
        const mockResponse: PixaBayResponse = { 
          totalHits:2,
          total:166248,
          hits:[ 
             { 
                largeImageURL: 'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1280.jpg',
                webformatHeight:427,
                webformatWidth:640,
                likes:32,
                imageWidth:4000,
                id:4792149,
                user_id:1767157,
                imageURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2.jpg',
                views:1447,
                comments:24,
                pageURL:'https://pixabay.com/photos/blue-tit-tit-songbird-bird-4792149/',
                imageHeight:2672,
                webformatURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_640.jpg',
                id_hash:'4792149',
                type:'photo',
                previewHeight:100,
                tags:'blue tit, tit, songbird',
                downloads:1177,
                user:'Capri23auto',
                favorites:15,
                imageSize:1042156,
                previewWidth:150,
                userImageURL:'https://cdn.pixabay.com/user/2019/06/21/09-21-09-355_250x250.jpg',
                fullHDURL:'https://pixabay.com/get/52e7dc414b56a514ea898279c02b327f1422dfe05b51764f752d79d2_1920.jpg',
                previewURL:'https://cdn.pixabay.com/photo/2020/01/25/10/35/blue-tit-4792149_150.jpg'
             }
          ]
        }
        const id = 4792149
        service.getImageDetailAPI(id).subscribe(pixaRes => {
          expect(pixaRes.hits.length).toBe(1);
          expect(pixaRes).toEqual(mockResponse);
        });
    
        const req = httpMock.expectOne(`${service.API_ROOT}?key=${service.API_KEY}&id=${id}`)
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
  })
});
});
