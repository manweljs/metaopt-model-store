
import React from 'react';
import { FileViewer } from 'react-file-viewer';
interface PDFViewerProps {
    url: string;
    close: () => void;
}
export default function PDFViewer(props: PDFViewerProps) {
    const { url, close } = props

    const handleError = (e: any) => {
        console.log('error ------->', e)
    }
    return (
        <div className="modal show" style={{ zIndex: 999 }}>
            <div className="delete" onClick={close}></div>
            <div className='pdf-viewer-box'>
                {
                    url &&
                    <FileViewer
                        fileType={"pdf"}
                        filePath={url}
                        onError={handleError}
                    />
                }
            </div>
        </div>
    );
}
