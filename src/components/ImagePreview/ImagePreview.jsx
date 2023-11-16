import { useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';
import { TiTimes } from "react-icons/ti";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import style from "./ImagePreview.module.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const  ImagePreview=({file,deleteFile})=>{

  return (
    <div className={style.container}>
      
      <div className={style.box}>
      <Document file={file} >
        <Page pageNumber={1}/>
      </Document>

      <div className={style.btnContainer}>
          <button className={style.btn}
            onClick={()=>deleteFile()}
          >
            <TiTimes/>
          </button>
      </div>
      </div>
    </div>
  );
}

export default ImagePreview