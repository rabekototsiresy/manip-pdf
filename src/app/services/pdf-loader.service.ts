import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfLoaderService {

  constructor() { }
  async loadPdf(pdfUrl: string): Promise<any> {
    return await pdfjsLib.getDocument(pdfUrl);
  }
}
