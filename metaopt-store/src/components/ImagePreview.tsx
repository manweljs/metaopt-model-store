import React from 'react'
import { unmountComponentAtNode } from 'react-dom';
import style from "../styles/model_detail.module.sass"

function ImagePreview(props: { src: string }) {

    const { src } = props;
    const removeMe = () => {
        const imageHolder = document.querySelector(".image-preview-holder")
        if (imageHolder) {
            unmountComponentAtNode(imageHolder)
        }
    }
    return (
        <div className={style.image_preview}>
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