"use client"
import { ChevronDownCircle, ChevronDownIcon, ChevronUpCircle, ChevronUpIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = { pdf_url: string }

const PDFViewer = ({ pdf_url }: Props) => {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(true);
  return (
    <div className="relative w-full">
      <div className={`${isPDFViewerOpen ? '' : 'hidden'}`}>
        <iframe
          title="PDF Viewer"
          src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
          className='w-[100%] h-[50vh]'
        >
        </iframe>
      </div>

      <div className="pl-[50%] pt-5">
        <button
          className="focus:outline-none"
          onClick={() => setIsPDFViewerOpen(!isPDFViewerOpen)}
        >
          {isPDFViewerOpen ? (
            <ChevronDownCircle className="w-10 h-10 text-gray-500" />
          ) :
            (
              <ChevronUpCircle className="w-10 h-10 text-gray-500" />
            )}
        </button>
      </div>
    </div>

  )
}

export default PDFViewer