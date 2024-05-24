const ProductBgReadMoreContent = ({ ProductBgReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.FirstDesc}</p>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SecondDesc}</p>
            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.FirstHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.FirstHeading?.desc}</p>
            {ProductBgReadMoreContentData?.FirstHeading?.points.map((item, index) => {
                return <p className="mb-2.5" key={index}>{item.point}</p>
            })}

            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.SecondHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SecondHeading?.desc}</p>
            {ProductBgReadMoreContentData?.SecondHeading?.subheading.map((item, index) => {
                return <div key={index} className="mb-2.5">
                    <h4 >{item.heading}</h4>
                    <p >{item.desc}</p>
                </div>
            })}

            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.ThirdHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.ThirdHeading?.desc}</p>
            {ProductBgReadMoreContentData?.ThirdHeading?.subheading.map((item, index) => {
                return <div className="mb-2.5" key={index} >
                    <h4 className="mb-2.5">{item.heading}</h4>
                    <p className="mb-2.5">{item.desc}</p>
                    <p className="mb-2.5">{item.subdesc}</p>
                    <ul className="list-disc text-black-600 ml-4">

                        {item.points.map((data, i) => {
                            return <li className=" text-black-600 md:text-[10px] md:leading-[14px] lg:text-base" key={i}>{data.point}</li>
                        })}
                    </ul>
                </div>
            })}
            <p className="mb-2.5">{ProductBgReadMoreContentData?.ThirdHeading.lastdesc}</p>

            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.FourthHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.FourthHeading?.desc}</p>
            {ProductBgReadMoreContentData?.FourthHeading?.subheadings.map((item, index) => {
                return <div key={index} className="mb-2.5">
                    <p className="font-bold text-black-800">{item.heading}</p>
                    <p className="">{item.desc}</p>
                    {item.firsthalf && <p className="">{item.firsthalf}<a className="text-blue font-bold" href={item.boldlink}>{item.boldtext}</a>{item.secondhalf}</p>}
                </div>
            })}

            {ProductBgReadMoreContentData?.FifthHeading?.headings.map((item, index) => {
                return <div key={index} className="mb-2.5">
                    <h4 className="mb-2.5">{item.heading}</h4>
                    <p className="">{item.desc}</p>
                    <ul className="list-disc ml-4 mb-2.5">
                        {item.points && item.points.map((data, i) => {
                            return <li className=" text-black-600 md:text-[10px] md:leading-[14px] lg:text-base" key={i}>{data.point}</li>
                        })}
                    </ul>
                    <p className="">{item.subdesc}</p>
                    <ul className="list-disc ml-4 mb-2.5 text-black-600">
                        {item.subpoints && item.subpoints.map((data, i) => {
                            return <li className=" text-black-600 md:text-[10px] md:leading-[14px] lg:text-base" key={i}>{data.point}</li>
                        })}
                    </ul>
                </div>
            })
            }
            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.SixthHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SixthHeading?.desc}</p>
            {ProductBgReadMoreContentData?.SixthHeading?.points.map((item,index)=>{
                  return <p key={index} className="mb-2.5"><strong className="text-black-800">{item.title}</strong>{item.content}</p>
            })}
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SixthHeading?.lastdesc}</p>

            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.SeventhHeading?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SeventhHeading?.desc}</p>
            {ProductBgReadMoreContentData?.SeventhHeading?.points.map((item,index)=>{
                  return <p key={index} className="mb-2.5"><strong className="text-black-800">{item.title}</strong>{item.content}</p>
            })}
            <p className="mb-2.5">{ProductBgReadMoreContentData?.SeventhHeading?.lastdesc}</p>

            <h3 className="mb-2.5">{ProductBgReadMoreContentData?.Conclusion?.heading}</h3>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.Conclusion?.firsthalfdesc}<a href={ProductBgReadMoreContentData?.Conclusion?.boldlink} className="text-blue font-bold">{ProductBgReadMoreContentData?.Conclusion?.boldtext}</a>{ProductBgReadMoreContentData?.Conclusion?.secondhalfdesc}</p>
            <p className="mb-2.5">{ProductBgReadMoreContentData?.Conclusion?.seconddesc}</p>
            
        </div>
    )
}
export default ProductBgReadMoreContent;