import { Component, HostListener, Inject, OnInit,ViewChild, ElementRef } from '@angular/core';
import { createWorker } from 'tesseract.js';
import html2canvas from "html2canvas";
import { DOCUMENT } from '@angular/common';
import { NgxExtendedPdfViewerComponent, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('pdfViewerCanvas') pdfViewerCanvas: ElementRef | undefined;
  @ViewChild('pdfViewer') pdfViewer: NgxExtendedPdfViewerComponent | any;
  imageSelected = ""
  resultList: string[] = [];
  public files: any[] = [];
  isPdf = false;
  position = {
    sx: 0,
    sy: 0,
    ex: 0,
    ey: 0
  }


  constructor (@Inject(DOCUMENT) private document: Document) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';

  }

  onTextLayerRendered() {
    console.log("render text layer");
  }
  async ngOnInit() {



    //load pdf


    //end load pdf

    console.log(this.document,'document');
    const worker = await createWorker('eng');
    const ret = await worker.recognize('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBb7gnXWJBq-ifNBbBmgqm9yFcoSFVzB4TdA&usqp=CAU');
    console.log(ret.data.text);
    await worker.terminate();
  }


  // loadPDF(): void {
  //   const pdfUrl = './../assets/sample.pdf'; // Replace with your PDF file path or URL

  //   this.pdfLoaderService.loadPdf(pdfUrl)
  //     .then((pdf) => {
  //       console.log('PDF loaded', pdf);

  //       // Render the first page of the PDF on the canvas
  //       pdf.getPage(1).then((page: any) => {
  //         const canvas: HTMLCanvasElement = this.pdfViewerCanvas?.nativeElement;
  //         const context = canvas.getContext('2d');

  //         const viewport = page.getViewport({ scale: 1.5 }); // You can adjust the scale as needed

  //         canvas.height = viewport.height;
  //         canvas.width = viewport.width;

  //         const renderContext = {
  //           canvasContext: context,
  //           viewport: viewport
  //         };

  //         page.render(renderContext);
  //       }).catch((error: any) => {
  //         console.error('Error rendering PDF page: ', error);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error loading PDF: ', error);
  //     });
  // }


   isSelecting = false;
   startX: any; startY: any;endX: any; endY: any;
   startPdfX: any; startPdfY: any;endPdfX: any; endPdfY: any;
    top = 0;
    left = 0;
    width = 0;
    height = 0
    results = ""
    fileToDisplay = '';

  // Add an event listener to detect clicks on an element
  @HostListener('document:click', ['$event'])
  onMousemo(event: MouseEvent) {
    if (event.button === 0) {
      console.log('Left click detected!');
      // Do something for left click
    }
  }

  public startSelection() {
    if(!this.fileToDisplay){
      Swal.fire({
        title: "Attention!",
        text: "Pdf non importé",
        icon: "warning"
      });
      return
    }
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.startX = undefined;
    this.startY = undefined;
    this.endX = undefined;
    this.endY = undefined;
  
   console.log('top', this.top);
   console.log('left', this.left);
  
    
    this.document.body.style.cursor = "crosshair";
    this.results = ""
    this.isSelecting = true;
    const selectionRectangle = this.document.createElement("div");
    this.document.body.appendChild(selectionRectangle);

    this.document.addEventListener("mousedown", (e) =>this.handleMouseDown(e,this));
    this.document.addEventListener("mousemove",  (e) =>this.handleMouseMove(e,this));
    this.document.addEventListener("mouseup",  (e) =>this.handleMouseUp(e,this));
  }

  public handleMouseDown(e: any,that: any) {

    console.log('mouse down');
    console.log('seee',that.isSelecting);
    if (that.isSelecting) {
      const rect = this.pdfViewer.elementRef.nativeElement.getBoundingClientRect();
    


       that.startPdfX = e.clientX - rect.left;
       that.startPdfY = e.clientY - rect.top;

      that.startX = e.pageX;
      that.startY = e.pageY;


      console.log(that.startX,'start x');
      console.log(that.startY,'start y');
    }
  }

  public handleMouseMove(e: any,that: any) {
    if (that.isSelecting) {
      that.endX = e.pageX;
      that.endY = e.pageY;

      const rect = this.pdfViewer.elementRef.nativeElement.getBoundingClientRect();
    


      that.endPdfX = e.clientX - rect.left;
      that.endPdfY = e.clientY - rect.top;

      

      const selectionRectangle : any = that.
      document.getElementById(
        "selectionRectangle"
      );
      that.left = Math.min(that.startX, that.endX) + "px";
      that.top = Math.min(that.startY, that.endY) + "px";
      that.width = Math.abs(that.endX - that.startX) + "px";
      that.height = Math.abs(that.endY - that.startY) + "px";

      console.log(that.startX, 'start x');
      console.log(that.startY, 'start y');
      console.log(that.endY, that.endX);

      console.log("elft",Math.min(that.startX, that.endX) + "px");
      console.log("top", Math.min(that.startY, that.endY) + "px");
    }
  }

  public handleMouseUp(e: any,that: any) {
    if (this.isSelecting) {
      this.isSelecting = false;
      this.document.addEventListener("mousedown", (e) =>this.handleMouseDown(e,this));
      this.document.addEventListener("mousemove",  (e) =>this.handleMouseMove(e,this));
      this.document.addEventListener("mouseup",  (e) =>this.handleMouseUp(e,this));
      this.document.body.style.cursor = "default";
    

      this.isSelecting = false;
      // const selectionRectangle: any = this.document.getElementById(
      //   "selectionRectangle"
      // );
      // this.document.body.removeChild(selectionRectangle);


      const pdfRect = this.pdfViewer.elementRef.nativeElement.getBoundingClientRect();
      console.log("recetttttttt", pdfRect,this.startPdfX,this.startPdfY,this.endPdfX,this.endPdfY,'kkkk',this.pdfViewer.elementRef.nativeElement.width); 

      console.log("elelemtn native",this.pdfViewer);
       this.position.sx = (this.startPdfX / pdfRect.width) * this.pdfViewer.elementRef.nativeElement.offsetWidth;
       this.position.sy = (this.startPdfY / pdfRect.height) * this.pdfViewer.elementRef.nativeElement.offsetHeight;
       this.position.ex = (this.endPdfX / pdfRect.width) * this.pdfViewer.elementRef.nativeElement.offsetWidth;
       this.position.ey = (this.endPdfY / pdfRect.height) * this.pdfViewer.elementRef.nativeElement.offsetHeight;

      

      this.takeScreenshot(this.startX, this.startY, this.endX, this.endY);
     
    }
  }

  public takeScreenshot(x1: number, y1: number, x2: number, y2: number) {
    console.log('x1: ', x1, );
    console.log('y1: ', y1, );
    console.log('x2: ', x2, );
    console.log('y2: ', y2, );
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);

    html2canvas(this.document.getElementById("capture-area") as any, {
      x: left-15,
      y: top - 80,
      width: width + 15,
      height: height
    }).then((canvas) => {

      console.log(canvas,'canvas');
      // const img = new Image();
      const image = canvas.toDataURL();
      this.imageSelected = image

      console.log(image,'image');
      this.performOCR(image)
      // const screenshotResult: any = this.document.getElementById("screenshotResult");
      // screenshotResult.innerHTML = ""; // Clear previous screenshot
      // screenshotResult.appendChild(img);

    }).catch(e => {
      alert('Selection non reussi')
    });
  }

  // Include Tesseract.js from a CDN

  // Function to perform OCR
    async performOCR(image: string)  {
    // Assuming you have captured the image and assigned it to 'capturedImage' variable
    // const capturedImage = this.document
    //   .getElementById("screenshotResult")
    //   .querySelector("img");

    // if (!capturedImage) {
    //   alert("Please take a screenshot first.");
    //   return;
    // }


    const worker = await createWorker('eng');
  const response = await worker.recognize(image);
  this.results = response.data.text
  this.resultList = [...this.resultList,this.results]
  console.log(response.data.text);
  await worker.terminate();
    // Start Tesseract.js and perform OCR on the captured image
    // Tesseract.recognize(
    //   capturedImage,
    //   "eng" // You can specify the language here
    // )
    //   .then((data) => {
    //     console.log(data.text);
    //     // Display the extracted text
    //     displayExtractedText(data.text);
    //   })
    //   .catch((error) => {
    //     console.error("Error during OCR:", error);
    //   });
  }

  // public displayExtractedText(text) {
  //   const extractedTextElement = document.getElementById("extractedText");
  //   extractedTextElement.innerText = text;
  // }

  onFileChange(event: any){

    console.log(event,'eventttt');
    if(event.target?.files) {
      const type = event.target.files[0].type;
      if(type ==='application/pdf') {
        this.isPdf = true
      } else {
        this.isPdf = false

      }
      console.log("import tsotra");
      const pFileList = event.target?.files
      const image = URL.createObjectURL(event.target.files[0]);
      this.files = Object.keys(pFileList).map((key: any) => pFileList[key]);
      this.fileToDisplay = image;

    } else {

      const type = event[0].type;
      if(type ==='application/pdf') {
        this.isPdf = true
      } else {
        this.isPdf = false

      }
      const image = URL.createObjectURL(event[0]);
      this.fileToDisplay = image;

    }
    console.log(event.target,'files');


  }

  deleteFile(f:any){
    this.files = this.files.filter(function(w){ return w.name != f.name });
   
  }

  openConfirmDialog(pIndex:any): void {
  
  }

  deleteFromArray(index:any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }
  title = 'AngularApp';
}

