/**
 * @format
 */
import React from "react"

function Spinner({ style_CLASS, type }) {
    const defaultClasses = {
        style_CLASS: ""
    }
    const SPINNER_TYPES = {
        DARK: 'DARK',
        LIGHT: 'LIGHT'
    }
    const getSpinnerClass = () => {
        switch (type) {
            case SPINNER_TYPES?.DARK:
                return 'dark-loader loader'
            case SPINNER_TYPES?.LIGHT:
                return 'light-loader loader'
            default:
                return 'dark-loader loader'
        }
    }
    return (
        <div className={style_CLASS || defaultClasses?.style_CLASS}>
            <div className={getSpinnerClass()}></div>
            {/* <div className='common-loader2'></div> */}
        </div>
    )
}

export default Spinner
