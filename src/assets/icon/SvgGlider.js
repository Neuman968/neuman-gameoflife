import * as React from "react";

function SvgGlider(props) {
    return (
        <svg
            height="1em"
            style={{
                zoom: 8,
            }}
            cursor="default"
            width="1em"
            baseProfile="full"
            viewBox="0 0 30 30"
            {...props}
        >
            <g stroke="#fc0107" strokeWidth={5} fill="#fff">
                <path d="M14.375 18.75h1v1h-1zM8.25 18.875h1v1h-1zM20.625 12.75H22.5v1h-1.875zM14.5 12.625h1v1h-1zM8.625 6.625h.75v1h-.75z" />
            </g>
        </svg>
    );
}

export default SvgGlider;
