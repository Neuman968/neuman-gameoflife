import * as React from "react";

function SvgBar(props) {
    return (
        <svg
            height="1em"
            cursor="default"
            width="1em"
            baseProfile="full"
            viewBox="0 0 30 30"
            {...props}
        >
            <g stroke="#fc0107" strokeWidth={5} fill="#fff">
                <path d="M21.188 12.625h1.875v1h-1.875zM14.563 12.625h1v1h-1zM8.25 12.5H9v1h-.75z" />
            </g>
        </svg>
    );
}

export default SvgBar;
