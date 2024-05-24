import React from "react";
const BgReplacement = ({ ReadMoreContentData }) => {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    return (
        <div className="md:px-4  pt-5 font-normal sm:text-base leading-6 text-xs">
            <p className="mb-6">{ReadMoreContentData.introduction}</p>
            <p className="mb-6">{ReadMoreContentData.subintroduction}</p>
            <h2 className="my-2.5">{ReadMoreContentData?.topheading?.heading}</h2>
            {ReadMoreContentData?.topheading?.descriptions.map((item, index) => { return<> <p key={index}>{item.description}</p><br/></> })}



            <h2 className="my-2.5">{ReadMoreContentData?.firstheading?.heading}</h2>
            <p className="">{ReadMoreContentData?.firstheading?.firsthalfdescription} </p>
            <ul className="mt-2.5">
                {ReadMoreContentData?.firstheading?.keypoints.map((item,index)=>{return<li key={index}><strong className="text-black-800  md:text-[10px] xl:text-base">{item.title}</strong><p className="mb-2.5">{item.content}</p></li>})}
            </ul>



            <h2 className="mb-2.5">{ReadMoreContentData?.secondheading?.heading}</h2>
            {ReadMoreContentData?.secondheading?.descriptions.map((item, index) => { return<> <p key={index}>{item.description}</p><br/></> })}
            <ul>
                {ReadMoreContentData?.secondheading?.points.map((item,index)=>{return <li key={index} className="text-black-600  md:text-[10px] xl:text-base mb-2.5"><b className="text-black">{item.point}</b><br />{item.content}</li>})}
            </ul>



            <h2 className="my-2.5">{ReadMoreContentData?.thirdheading?.heading}</h2>
            <p className="mb-2.5">{ReadMoreContentData?.thirdheading?.firstdescription} <a className="hover:text-blue text-red-500 font-semibold" href={ReadMoreContentData?.thirdheading?.firstdescriptionlink}>{ReadMoreContentData?.thirdheading?.firstdescriptionlinktext}</a>{ReadMoreContentData?.thirdheading?.firstdescriptioncontinue}</p>
            <p className="mb-2.5">{ReadMoreContentData?.thirdheading?.seconddescription} <a className="hover:text-blue text-red-500 font-semibold" href={ReadMoreContentData?.thirdheading?.seconddescriptionlink}>{ReadMoreContentData?.thirdheading?.seconddescriptionlinktext}</a>{ReadMoreContentData?.thirdheading?.seconddescriptioncontinue}</p>
            <ul>
                {ReadMoreContentData?.thirdheading?.points.map((item,index)=>{return <li key={index} className="text-black-600  md:text-[10px] xl:text-base mb-2.5"><b className="text-black">{item.point}</b><br />{item.content}</li>})}
            </ul>



            <h2 className="my-2.5">{ReadMoreContentData?.conclusion?.heading}</h2>
            <p className="mb-6">{ReadMoreContentData.conclusion?.description}</p>
            
        </div>
    )
}
export default BgReplacement;