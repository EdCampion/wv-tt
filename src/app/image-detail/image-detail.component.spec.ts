import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailComponent } from './image-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {NgxFilesizeModule} from 'ngx-filesize';
import { ImageService } from '../image-service';
import { MockImageService } from '../mock-image.service';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('ImageDetailComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;
  let debugElement: DebugElement;
  let imageSrv: ImageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), NgxFilesizeModule],
      declarations: [ImageDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1, 
              },
            },
          },
        },
      ],
    })
    .compileComponents();
    TestBed.overrideComponent(ImageDetailComponent, 
      {set: {providers: [{provide: ImageService, useClass: MockImageService}]}}
    )
    fixture = TestBed.createComponent(ImageDetailComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    imageSrv = debugElement.injector.get(ImageService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch image on init', (() =>{
    const imgSpy = spyOn(imageSrv, 'getImageDetail').and.callThrough();
    component.ngOnInit();
    expect(imgSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(component.image).toBeTruthy();
    });
  }))
});
