import React from 'react'
import { unmountComponentAtNode } from 'react-dom';

function ImagePreview(props: { src: string }) {

    const { src } = props;
    const removeMe = () => {
        const imageHolder = document.querySelector(".image-preview-holder")
        if (imageHolder) {
            unmountComponentAtNode(imageHolder)
        }
    }
    return (
        <div className='image-preview'>
            <div className="preview-box">
                <div className="delete" onClick={removeMe}></div>
                <div className="preview-body">
                    <img src={src} alt="" />
                </div>
            </div>
            <div className="overlay" onClick={removeMe}></div>
        </div>
    )
}

export default ImagePreview