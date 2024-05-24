const AIBgReadMoreContent = ({ AIBgReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FirstDesc}</p>
            <p className="mb-2.5">{AIBgReadMoreContentData?.SecondDesc}</p>

            <h3 className="mb-2.5">{AIBgReadMoreContentData?.FirstHeading?.heading}</h3>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FirstHeading?.content}</p>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FirstHeading?.subfirstcontent}
                <a href={AIBgReadMoreContentData?.FirstHeading?.boldlink} className="font-bold text-blue">{AIBgReadMoreContentData?.FirstHeading?.boldtext}</a>
                {AIBgReadMoreContentData?.FirstHeading?.subsecondcontent}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.SecondHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.SecondHeading?.content}</p>
            {AIBgReadMoreContentData?.SecondHeading?.points.map((item, index) => {
                return <p key={index} >
                    {item.point}
                </p>
            })}
            <p className="my-2.5">{AIBgReadMoreContentData?.SecondHeading?.lastdesc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.ThirdHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.ThirdHeading?.desc}</p>
            {AIBgReadMoreContentData?.ThirdHeading?.subheadings.map((item, index) => {
                return <div key={index} className="mb-2.5" >
                    <h4>{item.heading}</h4>
                    <p>{item.content}</p>
                </div>
            })}
            <p className="mb-2.5">{AIBgReadMoreContentData?.ThirdHeading?.subdesc}</p>
            <p className="mb-2.5">{AIBgReadMoreContentData?.ThirdHeading?.lastdesc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.FourthHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FourthHeading?.firstdesc}</p>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FourthHeading?.seconddesc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.FifthHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FifthHeading?.desc}</p>
            <h3 className="">{AIBgReadMoreContentData?.FifthHeading?.firstsubhead}</h3>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FifthHeading?.firstfirsthalf}
                <a href={AIBgReadMoreContentData?.FifthHeading?.firstboldlink} className="font-bold text-blue">{AIBgReadMoreContentData?.FifthHeading?.firstboldtext}</a>
                {AIBgReadMoreContentData?.FifthHeading?.firstsecondhalf}</p>
            <h3 className="">{AIBgReadMoreContentData?.FifthHeading?.secondsubhead}</h3>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FifthHeading?.secondfirsthalf}
                <a href={AIBgReadMoreContentData?.FifthHeading?.secondboldlink} className="font-bold text-blue">{AIBgReadMoreContentData?.FifthHeading?.secondboldtext}</a>
                {AIBgReadMoreContentData?.FifthHeading?.secondsecondhalf}</p>
            {AIBgReadMoreContentData?.FifthHeading?.subheadings.map((item, index) => {
                return <div key={index} className="mb-2.5" >
                    <h4>{item.haeding}</h4>
                    <p>{item.content}</p>
                </div>
            })}

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.SixthHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.SixthHeading?.desc}</p>
            <h3 className="text-black-800 font-bold">{AIBgReadMoreContentData?.SixthHeading?.firsttitle}</h3>
            <p className="mb-2.5">
                {AIBgReadMoreContentData?.SixthHeading?.firsthalfcontent}
                <a className="font-bold text-blue" href={AIBgReadMoreContentData?.SixthHeading?.boldlink}>
                    {AIBgReadMoreContentData?.SixthHeading?.boldtext}</a>
                {AIBgReadMoreContentData?.SixthHeading?.secondhalfcontent}</p>
            {AIBgReadMoreContentData?.SixthHeading?.points.map((item, index) => {
                return <div key={index} className="mb-2.5" >
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                </div>
            })}

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.SeventhHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.SeventhHeading?.desc}</p>
            {AIBgReadMoreContentData?.SeventhHeading?.points.map((item, index) => {
                return <p key={index} >
                    {item.point}
                </p>
            })}
            <p className="mb-2.5">{AIBgReadMoreContentData?.SeventhHeading?.lastdesc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.EighthHeading?.heading}</h2>
            {AIBgReadMoreContentData?.EighthHeading?.descriptions.map((item, index) => {
                return (
                    <p className="mb-2.5" key={index}>{item.desc}</p>
                )
            })}

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.NinthHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.NinthHeading?.desc}</p>
            {AIBgReadMoreContentData?.NinthHeading?.subheadings.map((item, index) => {
                return (
                    <div className="mb-2.5" key={index}>
                        <h4>{item.heading}</h4>
                        <p>{item.content}</p>
                    </div>
                )
            })}
            <p className="mb-2.5">{AIBgReadMoreContentData?.NinthHeading?.lastdesc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.TenthHeading?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.TenthHeading?.desc}</p>
            {AIBgReadMoreContentData?.TenthHeading?.points.map((item, index) => {
                return (
                    <p className="mb-2.5" key={index}><strong className="text-black-800">{item.title}</strong>{item.content}</p>
                )
            })}

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.Future?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.Future?.desc}</p>

            <h2 className="mb-2.5">{AIBgReadMoreContentData?.FinalWords?.heading}</h2>
            <p className="mb-2.5">{AIBgReadMoreContentData?.FinalWords?.desc}</p>


        </div>
    )
}
export default AIBgReadMoreContent