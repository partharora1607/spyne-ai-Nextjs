/**@format */
import React, { useContext } from "react"
import SignInSignUpContext from "./context"
import { FORGET_PASSWORD_DATA, LOGIN_DATA } from "./config"
import Link from "next/link"
import { LOGIN_TYPES, openInbox, redirectLinks } from "./config"
import Image from "next/image"
import { useRouter } from "next/router"
import Spinner from "../common/Spinner"
import styles from "../../styles/LoginPage.module.css"

const LoginTypePassword = (props) => {
    const { formatInput, SignInSpinner, errorMsg, setUser, seeData, user, resetPassword, handleLogin, handleForgotPassword, setSeeData, loginType, useLoginTypeOTP, handleChangeLoginState, handleForgot, handleLoginTypeEmail, seconds, closeLogin } = useContext(SignInSignUpContext)

    const router = useRouter()
    const { allowClose, formClassName, forgotPassBtnClassName, passwordBtnClassName, forgotPassSentLinkBtnClass } = props

    return (
        <div>
            {loginType === LOGIN_TYPES?.PASSWORD && (
                <form className={formClassName || ""}>
                    <div className="mb-8 flex items-center w-full justify-between">
                        <h1 className="flex text-base font-semibold text-black-800 lg:text-2xl items-center">
                            <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} onClick={handleChangeLoginState} />
                            {LOGIN_DATA?.enterYourPass}
                        </h1>
                        {allowClose &&
                            <Image src="https://spyne-static.s3.amazonaws.com/console/project/close_icon.svg"
                                width={24}
                                height={24}
                                alt="close"
                                className="inline cursor-pointer"
                                onClick={() => closeLogin()}
                            />
                        }
                    </div>
                    <div className="input-login relative  mb-5">
                        <input
                            className={[errorMsg ? "border-red-500" : "border-black-200", "w-full rounded-lg border   bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")}
                            placeholder="Password"
                            type={seeData ? "text" : "password"}
                            id="password"
                            required
                            name="password"
                            onInput={e => setUser({ ...user, password: e.target.value })}
                            value={user.password}
                            onBlur={e => {
                                formatInput(e)
                            }}
                            autoComplete="new-password"
                        />
                        <label className={[errorMsg ? "!text-red-500" : "!text-black-600", ""].join(" ")}>{LOGIN_DATA?.passowrdLabel}</label>

                        {user?.password?.length > 0 ? <span className={[styles["seeIcon"]]}>{seeData ? <Image onClick={() => setSeeData(false)} src="https://spyne-static.s3.amazonaws.com/console/eye.svg" width={16} height={16} alt="passowrd hide" /> : <Image onClick={() => setSeeData(true)} src="https://spyne-static.s3.amazonaws.com/console/eyeSlash.svg" width={16} height={16} alt="passowrd show" />}</span> : null}
                    </div>

                    <div className="mb-4">
                        {!resetPassword ? (
                            // resetEmailSent ? (
                            //     <p className="pointer-events-none mt-5 mb-1 text-sm font-normal text-black-60">{LOGIN_DATA?.resetMailSentText}</p>
                            // ) :
                            <div className="mt-5 mb-1 flex justify-between gap-2 text-left text-sm font-medium text-blue-light">
                                <div className="cursor-pointer" onClick={handleForgotPassword}>
                                    {LOGIN_DATA?.forgetPassText}
                                </div>
                                <div className="cursor-pointer" onClick={() => useLoginTypeOTP()}>
                                    Use OTP
                                </div>
                            </div>
                        ) : null}
                        {errorMsg ? <p className="mb-2 text-xs text-red-500">{errorMsg}</p> : null}
                    </div>
                    <p className="mb-6 text-left text-xs font-normal text-black-600">
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
                    <div className={`${passwordBtnClassName || "fixed w-[calc(100%-32px)]"} ${SignInSpinner ? "md:!py-[0.5315rem] 2xl:!py-[0.5325rem] pointer-events-none" : ""} h-[50px] secondary-btn bottom-4 left-4 right-4 bg-white text-center md:static md:w-full `}>
                        <button className={[SignInSpinner ? "h-full !py-0" : "h-full !py-1", "block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner || user?.password?.length < 1 ? true : false} id="submit" onClick={handleLogin}>
                            {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full items-center flex"} /> : "Submit"}
                        </button>
                    </div>
                </form>
            )}

            {loginType === LOGIN_TYPES?.FORGOT_PASSWORD && (
                <form>
                    <div className="flex items-center w-full justify-between">
                        <h1 className="flex text-base font-semibold text-black-800 lg:text-2xl items-center">
                            <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} onClick={handleChangeLoginState} />

                            {FORGET_PASSWORD_DATA?.heading}
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
                    <p className="mt-2 text-sm font-normal text-black-600 lg:text-base">{FORGET_PASSWORD_DATA?.subHeading}</p>
                    <div className="input-login relative mt-8">
                        <input className={[errorMsg ? "border-red-500" : "border-black-200", "mb-5 w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")} placeholder="Email address" type="text" name="emailId" value={user?.emailId} required />
                        <label className={errorMsg ? "!text-red-500" : "!text-black-600"}>{FORGET_PASSWORD_DATA?.label}</label>
                        {errorMsg ? <p className="mb-2 text-xs text-red-500">{errorMsg}</p> : null}
                    </div>
                    <div className={`${forgotPassBtnClassName || "fixed w-[calc(100%-32px)]"} ${SignInSpinner ? "md:!py-[0.5315rem] 2xl:!py-[0.5325rem] pointer-events-none" : ""} h-[50px] secondary-btn bottom-4 left-4 right-4 bg-white text-center md:static md:w-full `}>
                        <button className={[SignInSpinner ? "h-full !py-0" : "h-full !py-1", "block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} id="next" onClick={handleForgotPassword}>
                            {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full items-center flex"} /> : FORGET_PASSWORD_DATA?.btnText}
                        </button>
                    </div>
                </form>
            )}

            {loginType === LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT && (
                <form>
                    <div className=" flex items-center w-full justify-between">
                        <h1 className="flex text-base font-semibold text-black-800 lg:text-2xl items-center">
                            <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} onClick={handleChangeLoginState} />
                            {FORGET_PASSWORD_DATA?.emailSentTitle}
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
                    <p className="mt-2 mb-6 text-sm font-normal text-black-600lg:text-base">
                        <span>{FORGET_PASSWORD_DATA?.emailSentDesc} </span>
                        <strong className="font-semibold text-black-800">{user?.emailId} </strong>
                        to continue.
                        <span className="ml-1 cursor-pointer text-sm font-semibold text-blue-light" onClick={handleLoginTypeEmail}>
                            Change
                        </span>
                    </p>

                    <div className={`${forgotPassSentLinkBtnClass || "fixed w-[calc(100%-32px)]"} ${SignInSpinner ? "md:!py-[0.5315rem] 2xl:!py-[0.5325rem] pointer-events-none" : ""} bottom-4 left-4 right-4 bg-white py-1 text-center md:static md:w-full `}>
                        <button className={[SignInSpinner ? "h-full !py-0" : "h-full !py-1", " h-[50px] secondary-btn mb-2 flex justify-center w-full items-center", seconds > 0 ? "opacity-40" : ""].join(" ")} type="submit" disabled={seconds > 0 ? true : false} onClick={handleForgotPassword}>
                            {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full items-center flex"} /> : "Resend Link" + (seconds > 0 ? " (" + seconds + "s)" : "")}
                        </button>

                        <div className="mt-4 flex gap-3">
                            <button className={["border-black-10 py-2.5 text-black  border rounded-lg block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} onClick={e => openInbox(e, "GMAIL")}>
                                <span className="flex items-center justify-center gap-2">
                                    <Image src={FORGET_PASSWORD_DATA?.gmailIcon} width={25} height={25} alt="Gmail icon" />
                                    {FORGET_PASSWORD_DATA?.gmailBtnText}
                                </span>
                            </button>
                            <button className={["border-black-10 py-2.5 text-black  border rounded-lg block w-full items-center"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} onClick={e => openInbox(e, "OUTLOOK")}>
                                <span className="flex items-center justify-center gap-2">
                                    <Image src={FORGET_PASSWORD_DATA?.outlookIcon} width={25} height={25} alt="Gmail icon" />
                                    {FORGET_PASSWORD_DATA?.outlookBtnText}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default LoginTypePassword
