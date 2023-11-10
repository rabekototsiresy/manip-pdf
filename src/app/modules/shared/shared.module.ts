import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    FormsModule,

  ],
  exports: [
    NgxExtendedPdfViewerModule,
    NavbarComponent,
    FormsModule
  ]
})
export class SharedModule { }
