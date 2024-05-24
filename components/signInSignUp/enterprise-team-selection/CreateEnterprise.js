/**@format */

import React, { useContext } from "react"
import { categories, CREATE_ENTERPRISE_DATA, LOGIN_TYPES, SELECT_DROPDOWN_REVENUE, sessionStorageKeys } from "../config"
import SignInSignUpContext from "../context"
import Image from "next/image"
import PhoneInput from "react-phone-input-2"
import { useSelector } from "react-redux"
import Spinner from "@/components/common/Spinner"

function CreateEnterprise(props) {
    const { formClassName, createEntBtnClassName, validateInput, googleStrategy, formatInput, SignInSpinner, errorMsg, genericLoginPage, activeCategoryType, handleActiveCategoryTab, handleCreateEnterprise, enterpriseDetails, handlePhoneInput, closeLogin, formErrors, createEnterprise, handleChangeLoginState,selectedRevenue, setSelectedRevenue } = useContext(SignInSignUpContext)
    const { allowClose } = props
    const auth = useSelector(state => state.authReducer)

    const handleCreateEnterpriseClick = (e) => {
        try {
            if(e){
                e.preventDefault()
                e.stopPropagation()
            }
            let state = JSON.parse(sessionStorage.getItem(sessionStorageKeys?.previousState))
            if (state['create-enterprise'] === LOGIN_TYPES?.EMAIL && !googleStrategy) {
                createEnterprise(e)
            } else {
                handleCreateEnterprise(e)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const selection = (e) => {
        try {
            setSelectedRevenue(e.target.value)
        } catch (err) { console.log(err) }
      }

    return (
        <form className={formClassName || "pb-20 md:pb-0"}>
            <div className="flex items-center justify-between">
                <h1 className="flex items-center text-base font-semibold text-black-800 lg:text-2xl">
                    <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} onClick={handleChangeLoginState} />
                    {CREATE_ENTERPRISE_DATA?.heading}
                </h1>
                {allowClose &&
                    <Image src="https://spyne-static.s3.amazonaws.com/console/project/close_icon.svg"
                        width={24}
                        height={24}
                        alt="close"
                        className="flex cursor-pointer items-center"
                        onClick={() => closeLogin()}
                    />
                }
            </div>
            <p className="mb-8 mt-2 text-sm font-normal text-black-600 md:mb-0 md:text-base">{CREATE_ENTERPRISE_DATA?.subHeading}</p>
            <div className="mt-7 mb-4 grid-cols-1 md:grid-cols-8 gap-4 grid">
                <p className="col-span-8 text-sm font-normal text-black-600">{CREATE_ENTERPRISE_DATA?.businessTypeHeading}</p>
                {CREATE_ENTERPRISE_DATA?.businessTypeData?.map((item, indx) => {
                    return (
                        <div key={item.key} className={`flex items-center justify-center gap-1 rounded-lg border px-1.5  py-2 text-sm font-normal ${genericLoginPage ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-80"} ${item?.cols} ${item?.key === activeCategoryType ? "border-blue-40 bg-blue-12 text-blue-light" : "border-black-10 bg-transparent text-black-60"}`} onClick={() => handleActiveCategoryTab(item.key)}>
                            <Image src={item?.icon} width={32} height={32} alt={item?.alt} className={`${item?.key === activeCategoryType ? "grayscale-0" : "grayscale-[80%]"}`} />
                            <span>{item?.text}</span>
                        </div>
                    )
                })}
            </div>
            <div className="input-login relative mb-5">
                <input
                    className={[formErrors?.owner_name ? "border-red-500" : "border-black-20", "w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")}
                    placeholder={CREATE_ENTERPRISE_DATA?.nameField}
                    type="text"
                    name="owner_name"
                    required
                    onChange={e => {
                        formatInput(e)
                    }}
                    onBlur={(e) => validateInput(e)}
                    value={enterpriseDetails?.owner_name}
                />
                <label className={formErrors?.owner_name ? "!text-red-500" : "!text-black-600"}>{CREATE_ENTERPRISE_DATA?.nameFieldLabel}</label>
                {formErrors?.owner_name ? <p className=" mt-1 mb-2 text-xs text-red-500">{formErrors?.owner_name}</p> : null}
            </div>
            <div className="input-login relative mb-5 ">
                <input
                    className={[formErrors?.enterprise_name ? "border-red-500" : "border-black-20", "w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")}
                    placeholder={CREATE_ENTERPRISE_DATA?.companyNameField}
                    type="text"
                    name="enterprise_name"
                    required
                    onChange={e => {
                        formatInput(e)
                    }}
                    onBlur={(e) => validateInput(e)}
                    value={enterpriseDetails?.enterprise_name}
                />
                <label className={formErrors?.enterprise_name ? "!text-red-500" : "!text-black-600"}>{CREATE_ENTERPRISE_DATA?.companyNameLabel}</label>
                {formErrors?.enterprise_name ? <p className="mb-2 mt-1 text-xs text-red-500">{formErrors?.enterprise_name}</p> : null}
            </div>
            <div className="input-login relative mb-3">
                <PhoneInput inputClass={formErrors?.owner_phone ? "border-red-500" : ""} name="owner_phone" required autoFocus={true} country={enterpriseDetails?.countryCode} enableSearch={true} value={enterpriseDetails?.owner_phone} onChange={handlePhoneInput} dropdownStyle={{ width: '407px' }} />
                {/* <PhoneInput inputClass={formErrors?.owner_phone ? "border-red-500" : ""} name="owner_phone" required autoFocus={true} disableCountryCode disableDropdown addInternationalOption={false} disableCountryGuess={true} value={enterpriseDetails?.owner_phone} onChange={handlePhoneInput} dropdownStyle={{ width: '407px' }} /> */}

                {formErrors?.owner_phone ? <p className="mb-2 text-xs text-red-500">{formErrors?.owner_phone}</p> : null}
            </div>
            {activeCategoryType !== categories?.automobile ?
            <>
                <div className="input-login relative mb-5 ">
                    
                    <input
                        className={[formErrors?.website_link ? "border-red-500" : "border-black-200", "w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")}
                        placeholder={CREATE_ENTERPRISE_DATA?.websiteUrl}
                        type="text"
                        name="website_link"
                        required
                        onChange={e => {
                            formatInput(e)
                        }}
                        onBlur={(e) => validateInput(e)}
                        value={enterpriseDetails?.website_link}
                    />
                    <label className={formErrors?.website_link ? "!text-red-500" : "!text-black-600"}>{CREATE_ENTERPRISE_DATA?.websiteUrlLabel}</label>
                    {formErrors?.website_link ? <p className="mb-2 mt-1 text-xs text-red-500">{formErrors?.website_link}</p> : null}
                </div> 
            
                <div className="input-login relative mb-5 ">
                    <label className={[formErrors?.revenue ? "!text-red-500":"text-black-60","absolute left-3 -top-1.5 px-1.5  font-normal !text-xs bg-white "].join(" ")}>{CREATE_ENTERPRISE_DATA?.annualRevenueLabel}</label>
                    <select onChange={(e) => selection(e)} className={[formErrors?.revenue? "border-red-500" : "border-black-20","select-option w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-80 ring-transparent"].join(" ")} value={selectedRevenue}>
                        {SELECT_DROPDOWN_REVENUE?.map((items, indx) => {
                            return (
                                <option key={indx} className={`hover:bg-blue-light hover:text-white ${items?.hidden ? 'hidden': ""}`} value={items?.value} selected={selectedRevenue}>{items?.value}</option>
                            )
                        }
                        )}
                    </select>
                    {formErrors?.revenue ? <p className="mb-2 mt-1 text-xs text-red-500">{formErrors?.revenue}</p> : null}
                </div>
            </>
            : null
            
}
            <div className={`${createEntBtnClassName || "fixed w-[calc(100%-32px)]"} ${SignInSpinner ? "md:!py-[0.5315rem] 2xl:!py-[0.5325rem]" : ""} h-[50px] secondary-btn bottom-4 left-4 right-4 bg-white text-center md:static md:w-full `}>

                <button className={[SignInSpinner ? "h-full !py-0 pointer-events-none" : "h-full !py-1", "block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} id="next" onClick={handleCreateEnterpriseClick}>
                    {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full item-center flex"} /> : "Continue"}
                </button>
            </div>
        </form>
    )
}
export default CreateEnterprise
