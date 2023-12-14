import { useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';
import { TiTimes } from "react-icons/ti";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import style from "./ImagePreview.module.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const  BookIcon=({file})=>{

  return (
    <div className={style.container}>
      
      <div className={style.box}>
      <Document file={file} >
        <Page pageNumber={1}/>
      </Document>
      </div>
    </div>
  );
}

export default BookIcon