const EnlargerReadMoreContent = ({ EnlargerReadMoreContentData }) => {
    return (
        <div>
            {EnlargerReadMoreContentData?.descriptions.map((item, index) => { return <p className="mt-2.5" key={index}>{item.description}</p> })}

            {/* <h3 className="mt-2.5">{EnlargerReadMoreContentData?.FirstHeading?.heading}</h3>
            {EnlargerReadMoreContentData?.FirstHeading?.descriptions.map((item, index) => { return <p className="mt-2.5" key={index}>{item.description}</p> })} */}

            <h2 className="mt-2.5">{EnlargerReadMoreContentData?.SecondHeading?.heading}</h2>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondHeading?.description}</p>
            {EnlargerReadMoreContentData?.SecondHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="font-bold text-black-800">{item.title}</p>
                    <p className="mt-2.5">{item.content}</p>
                </div>
            })}
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondHeading?.subdescription}</p>

            <h2 className="mt-2.5">{EnlargerReadMoreContentData?.ThirdHeading?.heading}</h2>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdHeading?.description}</p>
            {EnlargerReadMoreContentData?.ThirdHeading?.points.map((item, index) => {
                return <p key={index} className="mt-2.5">{item.point}</p>
            })}
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdHeading?.subdescription}</p>

            <h2 className="mt-2.5">{EnlargerReadMoreContentData?.FourthHeading?.heading}</h2>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FourthHeading?.description}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FourthHeading?.subdescription}</p>

            <h2 className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.heading}</h2>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.firstdescription}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.seconddescription}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.thirdisthalfdec} <a className="text-blue font-bold" href={EnlargerReadMoreContentData?.FifthHeading?.thirdboldtext}>{EnlargerReadMoreContentData?.FifthHeading?.thirdboldtext}</a>
                {EnlargerReadMoreContentData?.FifthHeading?.thirdscdhalfdesc}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.fourthdescription}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.FifthHeading?.fifthisthalfdesc} <a className="text-blue font-bold" href={EnlargerReadMoreContentData?.FifthHeading?.fifthboldlink}>{EnlargerReadMoreContentData?.FifthHeading?.fifthboldtext}</a>
                {EnlargerReadMoreContentData?.FifthHeading?.fifthscdhalfdesc}</p>

            <h3 className="mt-2.5">{EnlargerReadMoreContentData?.FirstSubHeading?.heading}</h3>
            {EnlargerReadMoreContentData?.FirstSubHeading?.contents.map((item, index) => {
                return <p key={index} className="mt-2.5">{item.content}</p>
            })}

            <h3 className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.heading}</h3>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.firstdescription}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.secondisthalfdesc} <a  href={EnlargerReadMoreContentData?.SecondSubHeading?.boldLink} className="text-blue font-bold">{EnlargerReadMoreContentData?.SecondSubHeading?.boldText}</a>
                {EnlargerReadMoreContentData?.SecondSubHeading?.secondscdhalfdesc}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.thirddescription}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.fourthdescription}</p>
            {EnlargerReadMoreContentData?.SecondSubHeading?.points.map((item, index) => {
                return <p key={index} className="mt-2.5">{item.point}</p>
            })}
            <p className="mt-2.5">{EnlargerReadMoreContentData?.SecondSubHeading?.lastdecription}</p>

            <h3 className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.heading}</h3>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.description}</p>
            {EnlargerReadMoreContentData?.ThirdSubHeading?.points.map((item, index) => {
                return <p key={index} className="mt-2.5">{item.point}</p>
            })}
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.sixthisthalfpoint} <a href={EnlargerReadMoreContentData?.ThirdSubHeading?.boldLink} className="text-blue font-bold">{EnlargerReadMoreContentData?.ThirdSubHeading?.boldText}</a>
                {EnlargerReadMoreContentData?.ThirdSubHeading?.sixthscdhalfpoint}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.seventhpoint}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.eighthpoint}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.ThirdSubHeading?.lastdecription}</p>

            <h3 className="mt-2.5">{EnlargerReadMoreContentData?.FourthSubHeading?.heading}</h3>
            {EnlargerReadMoreContentData?.FourthSubHeading?.descriptions.map((item, index) => {
                return <p key={index} className="mt-2.5">{item.description}</p>
            })}

            <h2 className="mt-2.5">{EnlargerReadMoreContentData?.Conclusion?.heading}</h2>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.Conclusion?.firstdec}</p>
            <p className="mt-2.5">{EnlargerReadMoreContentData?.Conclusion?.seconddesc}</p>
        </div>
    )
}
export default EnlargerReadMoreContent;