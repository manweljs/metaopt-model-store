import React, { useEffect, useState } from 'react'
import { GetAllModel } from '../api'
import { Model } from './Interfaces'
import style from "../styles/style.module.sass"
import { useNavigate } from 'react-router-dom'

const img1 = "https://meta-opt.s3.ap-southeast-1.amazonaws.com/images/metaopt-modelworkflow.svg"

const contents = {
    heading: {
        title: <span> Welcome to MetaOPT's <span className={style.has_text_primary}>Model Store</span> </span>,
        paragraph: ` Discover the ideal model for your unique challenge in our Model Store. 
        Whether you seek a solution, prediction or insight, 
        you're just minutes away from unlocking the optimal outcome with MetaOPT.`,
        image: img1,

    },
    section1: {
        title: `Explore Models`,
        paragraph: `Or Contact Us for Custom Solutions`,

    },
    section2: {
        title: `Interested in a Model Not Listed or Need a Custom Solution? `,
        paragraph: `Reach out to us, and our team will be more than happy to assist.`,
    }


}


export function ModelStore() {

    const [models, setModels] = useState<Model[]>([])
    const handleGetAllModel = async () => {
        const response = await GetAllModel()
    }

    useEffect(() => {
        handleGetAllModel()
    }, []);
    return (
        <div className={style.model_store}>
            <ModelStoreHeader />
        </div>
    )
}

const ModelStoreHeader = () => {
    return (
        <div className={`section ${style.header}`}>
            <div className="container">
                <div className={`columns ${style.columns}`}>
                    <div className={`column ${style.column} ${style.text}`}>
                        <div className="slide-up">
                            <h1 >{contents.heading.title}</h1>
                        </div>
                        <div className="slide-up">
                            <p >{contents.heading.paragraph}</p>
                        </div>
                    </div>
                    <div className={`column ${style.column} ${style.image}`} >
                        <img src={contents.heading.image}
                            className='slide-blur play'
                            alt="" />
                    </div>
                </div>
            </div>
        </div >
    )
}