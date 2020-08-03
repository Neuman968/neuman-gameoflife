import * as React from "react";

function SvgSinglePoint(props) {
    return (
        <svg
            height="1em"
            cursor="default"
            width="1em"
            baseProfile="full"
            viewBox="0 0 30 30"
            {...props}
        >
            <path
                stroke="#fc0107"
                strokeWidth={5}
                fill="#fff"
                d="M14.563 12.625h1v1h-1z"
            />
        </svg>
    );
}

export default SvgSinglePoint;
