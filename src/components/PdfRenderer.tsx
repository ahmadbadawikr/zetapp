"use client";

import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
  
interface PdfRendererProps {
  url: string;
}

const PdfRenderer: React.FC<PdfRendererProps> = ({ url }) => {
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-slate-200 flex items-center justify-between">
        <div className="flex mx-5 items-center gap-1.5">
          top bar
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen overflow-auto">
        <div>
          <Document
            file={url}
            className="max-h-full"
            onLoadError={(error) => console.error('Error while loading document:', error)}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfRenderer