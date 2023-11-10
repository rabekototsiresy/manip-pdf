import { Component, HostListener, Inject, OnInit,ViewChild, ElementRef } from '@angular/core';
import { createWorker } from 'tesseract.js';
import html2canvas from "html2canvas";
import { DOCUMENT } from '@angular/common';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
 
  title = 'AngularApp';
}
