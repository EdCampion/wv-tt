import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { GalleryViewComponent } from './gallery-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ImageService } from '../image-service';
import { By } from '@angular/platform-browser';
import { MockImageService } from '../mock-image.service';
describe('GalleryViewComponent', () => {
  let component: GalleryViewComponent;
  let fixture: ComponentFixture<GalleryViewComponent>;
  let debugElement: DebugElement;
  let imageSrv: ImageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryViewComponent ],
      imports: [RouterTestingModule, InfiniteScrollModule, LazyLoadImageModule, HttpClientTestingModule]
    })
    .compileComponents();
    TestBed.overrideComponent(GalleryViewComponent, 
      {set: {providers: [{provide: ImageService, useClass: MockImageService}]}}
    )
    fixture = TestBed.createComponent(GalleryViewComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    imageSrv = debugElement.injector.get(ImageService);
    console.log(imageSrv)
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch images on init', (() =>{
    const imgSpy = spyOn(imageSrv, 'getImages').and.callThrough();
    component.ngOnInit();
    expect(imgSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(component.gridImages.length > 0);
      expect(component.currPage === 2);
      expect(component.scrollable === true);
    });
  }))

  it('should fetch new images on scrolled event', () => {
    const imgSpy = spyOn(imageSrv, 'getImages').and.callThrough();
    const cards = fixture.debugElement.query(By.css('.card-columns'));
    const imgLength = component.gridImages.length;
    cards.triggerEventHandler('scrolled', {});
    fixture.detectChanges();
    expect(imgSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(component.gridImages.length > imgLength);
      expect(component.currPage === 3);
      expect(component.scrollable === true);
    });
  });
});
