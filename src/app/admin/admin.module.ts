import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDesign } from '../material-design/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'gallery',
        component:GalleryComponent
      },
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'',
        redirectTo:'/admin/dashboard',
        pathMatch:'full'
      }
    ]
  },
  
]


@NgModule({
  declarations: [AdminComponent, DashboardComponent, GalleryComponent, ImageUploaderComponent, ProductComponent, ProductDetailComponent, FileUploaderComponent],
  entryComponents:[
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    ImageCropperModule,
    FormsModule
  ]
})
export class AdminModule { }
