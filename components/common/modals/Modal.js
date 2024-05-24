/**
 * @format
 */
import React from "react";
function Modal({floatTransition, children }) {

  return (
    <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black-600 z-[30]" >
            <div className={`lg:w-[550px] flex bg-white py-6 px-5 rounded-2xl text-center ease-linear ${floatTransition} duration-700 `} onClick={(e) => { e.stopPropagation() }}>
                {children}
            </div>
        </div>
  );
}

export default Modal;
