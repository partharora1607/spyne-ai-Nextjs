const LogoutDialogBox = () =>{
    return(
        <div className="absolute rounded-lg border border-black-100 bg-white shadow-lg w-[350px]" onClick={(e)=>{e.stopPropagation()}}>
            <div className="flex gap-4 px-[14px] py-2.5 border-b ">
                <img src="https://prod-spyne-website.s3.amazonaws.com/c514d965-1968-42eb-8b22-f305a4869d87" alt="profile-icon" className="w-12 h-12"/>
                <div className=" ">
                    <p className="!text-black-800 text-base font-medium mb-1.5">Arjit Singh</p>
                    <div className="px-2 py-1 bg-white-light_10 w-fit rounded-lg text-xs font-medium leadig-[18px] text-blue-100">Admin</div>
                </div>
            </div>
            <div className="px-4 py-2.5 flex gap-3 cursor-pointer">
                <img src="https://spyne-static.s3.amazonaws.com/console/header-icons/logoutIcon.svg" alt="log-out-icon"/>
                <p className="text-gray-100 text-base font-medium leading-5">Log Out</p>
            </div>

        </div>
    )
}
export default LogoutDialogBox;