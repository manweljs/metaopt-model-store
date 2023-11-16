import React, { useEffect, useState } from 'react'
import { GetAllModel } from '../../api'
import style from "../../styles/style.module.sass"
import { Spin } from 'antd'
import { ModelCard } from './ModelCard'

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



    return (
        <div className={style.model_store}>
            <ModelStoreHeader />
            <ModelStoreList />
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

const ModelStoreList = () => {
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    const handleGetAllModel = async () => {
        setLoading(true)
        try {
            const response = await GetAllModel()
            console.log('response', response)
            setModels(response.result.items)

        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        handleGetAllModel()
    }, []);


    return (
        <div className="section section-3">
            <div className="container">
                <div className="header-box mb-5">
                    <h3 className='title is-4 mb-0'>Models</h3>
                </div>

                {loading &&
                    <div className="w-100 mt-6" style={{ textAlign: "center" }}>
                        <Spin />
                    </div>
                }
                <div className={style.model_list}>
                    {
                        !loading && models.map((item, index) => (
                            <ModelCard
                                key={"model-" + index}
                                model={item}
                            />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}