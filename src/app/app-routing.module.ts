import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryViewComponent} from './gallery-view/gallery-view.component'
import {ImageDetailComponent} from './image-detail/image-detail.component'
const routes: Routes = [
  { path: 'gallery', component: GalleryViewComponent},
    {path: 'image/:id', component: ImageDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
