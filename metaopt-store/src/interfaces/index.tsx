import { Dispatch, SetStateAction } from "react";


export type Model = {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    rating: number;
    numberOfRates: number;
    estimatedProcessingMinutes: number;
    solverId: string;
    solverName: string;
    isPendingRelease: boolean;
    categories: string[];
    industries: string[];
}

export type ModelAttachment = {
    url: string;
    thumbnailUrl: string;
    fileName: string;
}

export type SolverPackage = {
    id: string;
    title: string;
}
export type Solver = {
    id: string;
    firstName: string;
    lastName: string;
    industry: string;
    country: string;
    aboutMe: string;
    emailAddress: string;
    packages: SolverPackage[]
}

export type ModelDetail = {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    packageType: string;
    attachments: ModelAttachment[];
    features: string[];
    estimatedProcessingMinutes: number;
    videoUrl: string;
    solver: Solver;
    numberOfRates: 0;
    rating: 0;
    accessType: string;
    categories: string[];
    industries: string[];
    isOwner: true;
    isPrivate: true;
    status: string;
}

// -------------------------------------------- INTERFACES ---------------------------------------------

export interface ModelCardProps {
    model: Model;
}

export interface ModelDetailPopupProps {
    modelId: string;
    close: () => void;
}

export interface RightPanelProps extends ModelDetailPopupProps {
    model: ModelDetail;
    setDisplayPDFAttachment: Dispatch<SetStateAction<boolean>>;
}

export interface AboutSolverProps {
    model: ModelDetail;

}

export interface MultipleAttachmentViewerProps {
    model: ModelDetail;

}

export interface ModelStoreListProps {
    models: Model[] | []
}

export interface FormForgotPasswordProps {
    setForgotPassword: Dispatch<SetStateAction<boolean>>
}