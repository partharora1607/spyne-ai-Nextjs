const RestoreReadMoreContent = ({ RestoreReadMoreContentData }) => {
    return (
        <div>
            {RestoreReadMoreContentData?.descriptions.map((item, index) => { return <p key={index} className="mt-2.5">{item.description}</p> })}

            {/* <h3 className="mt-2.5">{RestoreReadMoreContentData?.FirstHeading?.heading}</h3>
            <p className="mt-2.5">{RestoreReadMoreContentData?.FirstHeading?.description}</p> */}

            <h2 className="mt-2.5">{RestoreReadMoreContentData?.SecondHeading?.heading}</h2>
            {RestoreReadMoreContentData?.SecondHeading?.descriptions.map((item, index) => { return <p key={index} className="mt-2.5">{item.description}</p> })}

            <h2 className="mt-2.5">{RestoreReadMoreContentData?.ThirdHeading?.heading}</h2>
            <p className="mt-2.5">{RestoreReadMoreContentData?.ThirdHeading?.description}</p>
            {RestoreReadMoreContentData?.ThirdHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="text-black-800 font-bold">{item.title}</p>
                    <p className="mt-2.5">{item.text}</p></div>
            })}

            <h2 className="mt-2.5">{RestoreReadMoreContentData?.FourthHeading?.heading}</h2>
            <p className="mt-2.5">{RestoreReadMoreContentData?.FourthHeading?.description}</p>
            {RestoreReadMoreContentData?.FourthHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="text-black-800 font-bold">{item.title}</p>
                    <p className="mt-2.5">{item.text}</p></div>
            })}
            <p className="mt-2.5">{RestoreReadMoreContentData?.FourthHeading?.lastdescription}</p>

            <h2 className="mt-2.5">{RestoreReadMoreContentData?.FifthHeading?.heading}</h2>
            <p className="mt-2.5">{RestoreReadMoreContentData?.FifthHeading?.description}</p>
            {RestoreReadMoreContentData?.FifthHeading?.points.map((item, index) => { return <p key={index} className="mt-2.5">{item.point}</p> })}
            <p className="mt-2.5">{RestoreReadMoreContentData?.FifthHeading?.subdescription}</p>
            <p className="mt-2.5">{RestoreReadMoreContentData?.FifthHeading?.notedescription}</p>

            <h2 className="mt-2.5">{RestoreReadMoreContentData?.Conclusion?.heading} </h2>
            {RestoreReadMoreContentData?.Conclusion?.descriptions.map((item, index) => { return <p key={index} className="mt-2.5">{item.description}</p> })}
       
        </div>
    )
}
export default RestoreReadMoreContent;