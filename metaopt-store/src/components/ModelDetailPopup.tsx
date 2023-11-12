import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Skeleton, Space, Tag, message, notification } from 'antd';
import { DownloadOutlined, WarningOutlined } from "@ant-design/icons"

import { AboutSolverProps, ModelAttachment, ModelDetail, ModelDetailPopupProps, MultipleAttachmentViewerProps, RightPanelProps } from './Interfaces';
import { HOST } from '../variables';
import { GetModelDetail, PurchaseModel } from '../api';
import { getRandomImage, initImagePreview, isPhone, youtubeEmbedUrl } from '../functions';
import PDFViewer from './PDFVeiwer';

const docs = "https://meta-opt.s3.ap-southeast-1.amazonaws.com/images/docs.png"
const sheets = "https://meta-opt.s3.ap-southeast-1.amazonaws.com/images/sheets.png"
const pbix = "https://meta-opt.s3.ap-southeast-1.amazonaws.com/images/pbix.png"

export default function ModelDetailPopup(props: ModelDetailPopupProps) {
    // const { user, navigate, packageId, close, isOwner = false, chatSocket, theme } = props;

    const { modelId } = props;
    const [model, setModel] = useState<ModelDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [displayPDFAttachment, setDisplayPDFAttachment] = useState<boolean>(false)
    const [modelImage, setModelImage] = useState<string | null>(null)

    useEffect(() => {
        setModelImage(getRandomImage())
    }, []);

    const handleGetModel = async () => {
        setLoading(true);
        const response = await GetModelDetail(modelId);

        console.log(response);
        setModel(response.result);
        const root = document.querySelector('html') as HTMLElement;
        if (root) {
            root.style.overflow = "hidden";
        }
        setLoading(false);
    }



    useEffect(() => {
        handleGetModel()
    }, [modelId])


    useEffect(() => {
        initImagePreview()
    }, [model])

    const handleClose = () => {
        const root = document.querySelector('html') as HTMLElement;
        if (root) {
            root.style.overflow = "auto";
        }
        setModel(null)
        close()
    }

    return (
        <div className={isPhone() ? 'package-details popup is-mobile' : 'package-details popup '} id='package-details-popup'>
            {displayPDFAttachment && model &&
                <PDFViewer
                    url={`${HOST}/File/DownloadAttachment?PackageId=${model.id}`}
                    close={() => setDisplayPDFAttachment(false)} />}
            <div className='image-preview-holder' id="#image-preview-holder"></div>

            <div className="popup-box modal-box">
                {loading && <div className="p-5"><Skeleton /></div>}

                {model &&
                    <>
                        {isPhone() ?
                            <>
                                <div className="mobile-title-box">
                                    <p className="title is-6 mb-0">{model.title}</p>
                                    <div className="close delete" onClick={handleClose}></div>
                                </div>
                            </>
                            : null

                        }

                        <div className="modal-body">
                            <div className="left-panel p-5">
                                <div className="header">
                                    <div className="title-box" >
                                        <div className="title is-4 mb-2"

                                        >{model.title}</div>

                                        <div className="title-image">
                                            <img src={modelImage ? modelImage : ""} alt="" />
                                        </div>
                                    </div>

                                    <div className="content mb-3 image-preview-able">
                                        <div dangerouslySetInnerHTML={{ __html: model.description }} />
                                    </div>

                                    {/* {props.isPreview ? "" : <ReviewStars key={getKey(5)} />} */}

                                </div>

                                <div className="body">
                                    <div className="section">
                                        <div className="title">
                                            Category
                                        </div>
                                        <ul className='tags p-0'>
                                            {model.categories.map(e => <Tag key={e} >{e}</Tag>)}
                                        </ul>
                                    </div>
                                    <div className="section">
                                        <div className="title">
                                            Featured
                                        </div>
                                        <ul className='features p-0'>
                                            {model.features ? model.features.map((e, index) => e !== "" ? <li key={"feature-" + index} className='ml-4'>{e}</li> : <p className='tip' key={"feature-" + index} >No features documented.</p>) : ""}
                                        </ul>
                                    </div>

                                    {/* <ModelDiscussion
                                        model={model}
                                        type={"packageDiscussion"}
                                        user={user}
                                        {...props}
                                    /> */}


                                </div>
                            </div>

                            {/* right panel  */}

                            <RightPanel
                                setDisplayPDFAttachment={setDisplayPDFAttachment}
                                model={model}
                                {...props}
                            />


                        </div>
                    </>
                }

            </div>

            <div className="overlay" onClick={handleClose}></div>
        </div>
    )

}





const RightPanel = (props: RightPanelProps) => {
    const { model, close } = props
    const navigate = useNavigate()

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        const btn = (
            <Space>
                <Button type="primary" size="small" onClick={() => navigate("/credits")}>
                    Purchase Credits
                </Button>
            </Space>
        );
        api.info({
            message: `We are sorry`,
            description:
                `You haven't enough credits`,
            placement: "top",
            btn,
            icon: <WarningOutlined style={{ color: "var(--warning)" }} />
        });
    };

    const handleGetContactPackageId = async () => {
        const data = {
            packageId: model.id,
        }
        const response = await PurchaseModel(JSON.stringify(data))
        console.log(response)
        if (response.success) {
            return response.result.contactPackageId
        } else {
            message.error(response.error.message)
        }

    }

    const handleRunModel = async () => {
        // check user Credits, if 0 then cancel 

        const contactPackageId = await handleGetContactPackageId()
        // console.log(contactPackageId)
        if (contactPackageId) {
            close()
            navigate(`/package/run?contactPackageId=${contactPackageId}&packageId=${model.id}&packageName=${model.title}`)
        }
    }


    const isPendingRelease = model && model.status === "PendingRelease"

    return (
        <>
            {contextHolder}
            <div className={isPhone() ? "dn" : "right-panel py-5 pr-5 "}>
                <div className="sections">

                    <div className="overview">
                        {model && model.videoUrl ?
                            <iframe
                                width="234"
                                height="150"
                                src={youtubeEmbedUrl(model.videoUrl)}
                                title="YouTube Video Embed"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe> :
                            <img src="https://images.unsplash.com/photo-1640622842223-e1e39f4bf627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80" alt="" />
                        }

                        <div className="flex-column gap-1 p-3 pb-5">
                            {isPendingRelease ? (
                                <Button type="primary" disabled>Pending Release</Button>
                            ) : (
                                <Button type="primary" onClick={handleRunModel}>
                                    <i className="las la-play mr-2"></i> Run Model
                                </Button>
                            )}
                        </div>

                    </div>

                    {/* <ModelCourses model={model} /> */}


                    {model.attachments?.length > 0 &&
                        <div className="mt-4">
                            <MultipleAttachmentViewer
                                model={model} />
                        </div>
                    }

                    {!isPhone() && <AboutSolver {...props} />}

                </div>
            </div >
        </>
    )
}


export const AboutSolver = (props: AboutSolverProps) => {
    const { model } = props;
    const solver = model.solver

    return (
        <div className="about-solver p-4 my-5">
            <div className="title is-6">About Solver</div>
            <div className="avatar p-0 mb-3" style={{ width: '80px' }}>
                <img src={`https://ui-avatars.com/api/?name=${solver.firstName} ${solver.lastName}&rounded=true&background=random`} alt="" />
            </div>
            <div className="name">
                {solver.firstName} {solver.lastName}
            </div>
            <div className="bio">
                {solver.aboutMe}
            </div>
        </div>
    )
}


const MultipleAttachmentViewer = (props: MultipleAttachmentViewerProps) => {
    const { model } = props;

    // console.log(model.attachments)
    const [attachments, setAttachments] = useState<ModelAttachment[]>([])

    useEffect(() => {
        setAttachments(model.attachments)

    }, [model.attachments])

    const handleAttachmentThumbnail = (attachment: any) => {
        const fileName = attachment.fileName
        const ext = fileName.split(".").pop()

        switch (ext) {
            case "pdf":
                return <img src={attachment.thumbnailUrl} alt={fileName} />
            case "csv":
                return <img src={sheets} alt={fileName} />
            case "xls":
                return <img src={sheets} alt={fileName} />
            case "xlsx":
                return <img src={sheets} alt={fileName} />
            case "doc":
                return <img src={docs} alt={fileName} />
            case "docx":
                return <img src={docs} alt={fileName} />
            case "pbix":
                return <img src={pbix} alt={fileName} />
            case "png":
                return <img src={attachment.url} alt={fileName} />
        }
    }

    return (
        <div className="attachment-viewer">
            <div className="title is-6 mb-2">Attachment</div>
            <div className="thumbs">
                {attachments &&
                    attachments.map((item, index) => (
                        <a href={item.url} title={item.fileName} target='blank_' className='thumb' key={"attachment_" + index}>
                            <DownloadOutlined className='icon' />
                            {handleAttachmentThumbnail(item)}
                            <p className='filename'>{item.fileName}</p>
                        </a>
                    ))
                }
            </div>
            {/* <Button onClick={handleDownloadAll}>Download All</Button> */}
        </div>
    );
}

