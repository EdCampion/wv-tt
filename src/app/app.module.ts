import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
@NgModule({
  declarations: [
    AppComponent,
    GalleryViewComponent,
    ImageDetailComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
