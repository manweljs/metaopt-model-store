import React from "react";
import { render } from "react-dom";
import ImagePreview from "../components/model/ImagePreview";
import cookie from "react-cookies"
import style from "../styles/model_detail.module.sass"
import { USER_AUTH_TOKEN } from "../variables";

export const getToken = (): string => {
    return cookie.load(USER_AUTH_TOKEN)
}

export function getRandomInt(max: number = 100) {
    return Math.floor(Math.random() * max);
}


export const getRandomImage = (): string => {
    const n = getRandomInt(60);
    return `https://meta-opt.s3.ap-southeast-1.amazonaws.com/abstracts/${n}.jpg`;
};

export function youtubeEmbedUrl(url: string): string {
    const regex = /[?&]v=([^&#]*)/; // Regular expression to match the video ID
    const match = url.match(regex);

    if (match && match[1]) {
        const link = `https://www.youtube.com/embed/${match[1]}`
        return link;
    } else {
        return ""; // Video ID not found in the URL
    }
}


export function isPhoneOrTablet(): boolean {
    const userAgent = navigator.userAgent;
    const phoneRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
    const tabletRegex = /iPad|Tablet/i;

    return phoneRegex.test(userAgent) || tabletRegex.test(userAgent);
}

export function isTablet(): boolean {
    const userAgent = navigator.userAgent;
    const tabletRegex = /iPad|Tablet/i;

    return tabletRegex.test(userAgent);
}

export function isPhone(): boolean {
    const userAgent = navigator.userAgent;
    const phoneRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
    const tabletRegex = /iPad|Tablet/i;

    return phoneRegex.test(userAgent) && !tabletRegex.test(userAgent);
}

export function initImagePreview() {
    const images = document.querySelectorAll(".image-preview-able img")
    Array.from(images).forEach((item: Element) => {
        if (item instanceof HTMLElement) {
            item.classList.add(style.is_preview_able)
            let src = item.getAttribute('src') as string;
            item.onclick = function () {
                previewImage(src);
            };
        }
    });


    function previewImage(src: string) {
        return render(<ImagePreview src={src} />, document.querySelector(".image-preview-holder"))
    }
}

