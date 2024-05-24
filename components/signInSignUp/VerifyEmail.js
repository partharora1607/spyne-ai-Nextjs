/**@format */
import React, { useContext } from "react"
import SignInSignUpContext from "./context"
import { FORGET_PASSWORD_DATA, LOGIN_DATA } from "./config"
import Link from "next/link"
import { LOGIN_TYPES, openInbox, redirectLinks } from "./config"
import { SIGNUP_DATA } from "./config"
import Image from "next/image"
import Spinner from "../common/Spinner"

const VerifyEmail = (props) => {
    const { formatInput, SignInSpinner, errorMsg, handleEmailVerification, seconds, user, useLoginTypeOTP, setLoginType, handleOTP, handleChangeLoginState, closeLogin } = useContext(SignInSignUpContext)
    const { allowClose, verifyBtnClassName, formClassName } = props
    return (
        <form className={formClassName || "pb-28 md:pb-0"}>
            <div className="flex items-center justify-between">
                <h1 className="flex items-center text-base font-semibold text-black-800 lg:text-2xl">
                    <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} onClick={handleChangeLoginState} />
                    {LOGIN_DATA?.otpHeading}
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
            <p className="mt-2 text-sm font-normal text-black-600 lg:text-base">
                {LOGIN_DATA?.otpSubHeading}&nbsp;
                <strong className=" font-semibold">{user?.emailId}</strong>
                <span className="ml-1 cursor-pointer text-sm font-semibold text-blue-light" onClick={() => setLoginType(LOGIN_TYPES?.EMAIL)}>
                    Change
                </span>
            </p>

            <div className="input-login relative mt-8 mb-5">
                <input
                    className="w-full rounded-lg border border-black-18  bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"
                    placeholder="000-000"
                    autoComplete="off"
                    type="text"
                    maxLength={6}
                    minLength={6}
                    name="otp"
                    value={user?.otp}
                    onChange={handleOTP}
                    onBlur={e => {
                        formatInput(e)
                    }}
                />
                <label className="">{LOGIN_DATA?.otpLabel}</label>
            </div>

            <div className="mb-4">
                <p className={`mt-6 text-sm  text-black-600 ${seconds > 0 ? "font-normal" : "font-medium"}`}>
                    <button onClick={() => useLoginTypeOTP(true)} disabled={seconds > 0} className={(seconds > 0) ? "" : "cursor-pointer text-blue-light"}>
                        {SIGNUP_DATA?.resendOtp} {(seconds <= 0) ? "Code" : null}
                    </button>
                    {seconds > 0 ? (
                        <>
                            &nbsp;in <span className="font-medium text-black-800">00:{seconds < 10 ? `0${seconds}` : seconds}s</span>
                        </>
                    ) : null}
                </p>
                {errorMsg ? <p className="my-1 text-xs text-red-500">{errorMsg}</p> : null}
            </div>
            <p className="mb-6 text-left text-xs font-normal text-black-600 ">
                By verifying, you agree to our&nbsp;
                <Link href={redirectLinks?.termsServiceUrl} rel="noopener noreferrer" target="_blank">
                    <span className=" text-blue-light">Terms of Service</span>&nbsp;
                </Link>
                ,&nbsp;
                <Link href={redirectLinks?.policyLinkurl} rel="noopener noreferrer" target="_blank">
                    <span className=" text-blue-light">Privacy Policy </span>&nbsp;
                </Link>
                and
                <Link href={redirectLinks?.cookieLikUrl} rel="noopener noreferrer" target="_blank">
                    <span className=" text-blue-light"> Cookie Policy.</span>
                </Link>
            </p>

            <div className={`${verifyBtnClassName || "fixed w-[calc(100%-32px)]"} ${SignInSpinner ? " md:!py-[0.5315rem] 2xl:!py-[0.5325rem]" : ""} bottom-4 left-4 right-4 bg-white py-1 text-center md:static md:w-full `}>
                <button className={[SignInSpinner ? "h-full !py-0" : "h-full !py-1", "h-[50px] secondary-btn flex justify-center w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} onClick={e => handleEmailVerification(e)}>
                    {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full items-center flex"} /> : "Verify"}
                </button>
                <div className="mt-4 flex gap-2">
                    <button className={[SignInSpinner ? "" : "!border-black-10 !py-2.5 !text-black", "blue-bordered-button block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} onClick={e => openInbox(e, "GMAIL")}>
                        <span className="flex items-center justify-center gap-2">
                            <Image src={FORGET_PASSWORD_DATA?.gmailIcon} width={25} height={25} alt="Gmail icon" />
                            {FORGET_PASSWORD_DATA?.gmailBtnText}
                        </span>
                    </button>
                    <button className={[SignInSpinner ? "" : "!border-black-10 !py-2.5 !text-black", "blue-bordered-button block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} onClick={e => openInbox(e, "OUTLOOK")}>
                        <span className="flex items-center justify-center gap-2">
                            <Image src={FORGET_PASSWORD_DATA?.outlookIcon} width={25} height={25} alt="Gmail icon" />
                            {FORGET_PASSWORD_DATA?.outlookBtnText}
                        </span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default VerifyEmail
