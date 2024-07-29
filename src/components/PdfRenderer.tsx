"use client";

import {
    ChevronDown,
    ChevronUp,
    Loader2,
    RotateCw,
    Search,
  } from 'lucide-react'
  import { Document, Page, pdfjs } from 'react-pdf'
  
  import 'react-pdf/dist/Page/AnnotationLayer.css'
  import 'react-pdf/dist/Page/TextLayer.css'
  import { useToast } from './ui/use-toast'
  
  import { useResizeDetector } from 'react-resize-detector'
  import { Button } from './ui/button'
//   import { Input } from './ui/input'
  import { useState } from 'react'
  
  import { useForm } from 'react-hook-form'
  import { z } from 'zod'
  
//   import { zodResolver } from '@hookform/resolvers/zod'
  import { cn } from '@/lib/utils'
//   import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from './ui/dropdown-menu'
  
//   import SimpleBar from 'simplebar-react'
//   import PdfFullscreen from './PdfFullscreen'
  
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
  
interface PdfRendererProps {
  url: string;
}

const PdfRenderer: React.FC<PdfRendererProps> = ({ url }) => {
    const { toast } = useToast()
    const [numPages, setNumPages] = useState<number>()
    const [currPage, setCurrPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [renderedScale, setRenderedScale] = useState<
      number | null
    >(null)
  
    const isLoading = renderedScale !== scale

    const CustomPageValidator = z.object({
      page: z
        .string()
        .refine(
          (num) => Number(num) > 0 && Number(num) <= numPages!
        ),
    })
  
    type TCustomPageValidator = z.infer<
      typeof CustomPageValidator
    >
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<TCustomPageValidator>({
      defaultValues: {
        page: '1',
      },
    //   resolver: zodResolver(CustomPageValidator),
    })
  
    console.log(errors)
  
    const { width, ref } = useResizeDetector()
  
    const handlePageSubmit = ({
      page,
    }: TCustomPageValidator) => {
      setCurrPage(Number(page))
      setValue('page', String(page))
    }
  
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-slate-200 flex items-center justify-between">
        <div className="flex mx-5 items-center gap-1.5">
          top bar
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen overflow-auto">
      <Document
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
              }}
              onLoadSuccess={({ numPages }) =>
                setNumPages(numPages)
              }
              file={url}
              className='max-h-full'>
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={'@' + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? 'hidden' : '')}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={'@' + scale}
                loading={
                  <div className='flex justify-center'>
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                  </div>
                }
                onRenderSuccess={() =>
                  setRenderedScale(scale)
                }
              />
            </Document>
      </div>
    </div>
  );
};

export default PdfRenderer;