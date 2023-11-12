import React, { useEffect, useState } from "react";
import { ModelCardProps } from "./Interfaces";
import { getRandomImage } from "../functions";
import ModelDetailPopup from "./ModelDetailPopup";
import { Dropdown, Spin, Tag } from "antd";


export default function PackageCard(props: ModelCardProps) {
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


    // console.log(pack)
    return (
        <>
            {showDetailModal &&
                <ModelDetailPopup
                    modelId={model.id}
                    close={() => setShowDetailModal(false)}
                />
            }

            <div onClick={showDetails}
                className={"package-card"}
            >
                <div className={`header`}>

                    <div className="title-box">
                        {model.isPendingRelease &&
                            <Tag className={"PendingRelease"}>Pending Release</Tag>
                        }
                        <div className="title is-6 is-link mb-3 package-title"
                        >
                            {model.title}
                        </div>
                        <div className="package-card-image">
                            <img src={modelImage} alt="" />
                        </div>

                    </div>
                </div>


                <div className="short-description">
                    {model.shortDescription}
                </div>

                <div className="industry-tag-box">
                    {model.industries.map((item, index) => {
                        return <div className="tag" key={"industry-" + index}> {item} </div>
                    })}

                    {model.categories.map((item, index) => {
                        return <div className="tag" key={"category-" + index}> {item} </div>
                    })}
                </div>

                <div className="footer">
                    <img src={`https://ui-avatars.com/api/?name=${model.solverName}&rounded=true&background=random`} alt="" />
                    <div className="author-name">
                        {model.solverName}
                    </div>
                </div>

            </div>
        </>
    )
}