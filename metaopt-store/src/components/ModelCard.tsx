import React, { useEffect, useState } from "react";
import { ModelCardProps } from "./Interfaces";
import { getRandomImage } from "../functions";
import ModelDetailPopup from "./ModelDetailPopup";
import { Tag } from "antd";
import style from "../styles/model_card.module.sass"

export function ModelCard(props: ModelCardProps) {
    const { model } = props;
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
    const [modelImage, setModelImage] = useState<string>("")

    const showDetails = () => {
        setShowDetailModal(true)
    }

    useEffect(() => {
        const image = getRandomImage()
        setModelImage(image)
    }, [model])


    return (
        <>
            {showDetailModal &&
                <ModelDetailPopup
                    modelId={model.id}
                    close={() => setShowDetailModal(false)}
                />
            }

            <div onClick={showDetails}
                className={style.model_card}
            >
                <div className={style.header}>

                    <div className={style.title_box}>
                        {model.isPendingRelease &&
                            <Tag className={"PendingRelease"}>Pending Release</Tag>
                        }
                        <div className={`${style.title} title is-6  mb-3 ${style.model_title}`}
                        >
                            {model.title}
                        </div>
                        <div className={style.model_card_image}>
                            <img src={modelImage} alt="" />
                        </div>

                    </div>
                </div>

                <div className="p-3">
                    <div className={style.short_description}>
                        {model.shortDescription}
                    </div>
                </div>

                <div className={style.industry_tag_box}>
                    {model.industries.map((item, index) => {
                        return <div className="tag" key={"industry-" + index}> {item} </div>
                    })}

                    {model.categories.map((item, index) => {
                        return <div className="tag" key={"category-" + index}> {item} </div>
                    })}
                </div>

            </div>
        </>
    )
}