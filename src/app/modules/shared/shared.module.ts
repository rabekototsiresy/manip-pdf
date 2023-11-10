import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    NgxExtendedPdfViewerModule,
    NavbarComponent
  ]
})
export class SharedModule { }
