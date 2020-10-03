import { transform } from "lodash";
import React from "react";
import { CSSProperties } from "react";
import { JsxEmit } from "typescript";

export type Props = {
    isOpen: boolean;
    children: JSX.Element;
};

export const Modal = ({children, isOpen}: Props): JSX.Element => {
    const modalStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        visibility: isOpen ? 'visible' : 'hidden',
    }

    const modalBodyStyle: CSSProperties = {
        position: 'absolute', 
        zIndex: 1,
        backgroundColor: 'white', 
        marginLeft: '50%',
        marginTop: '200px',
        transform: 'translateX(-50%)',
        padding: '20px'
    }

    const modalBackdropStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }

    return <div style={modalStyle}>
        <div style={modalBackdropStyle} / >
            <div style={modalBodyStyle}>{children}</div>
    </div>
}