import React from "react";
const BgReadMoreContent = ({ ReadMoreContentData }) => {
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

            <h2 className="mb-2.5">{ReadMoreContentData?.firstheading?.heading}</h2>
            {ReadMoreContentData?.firstheading?.descriptions.map((item, index) => { return<> <p key={index}>{item.description}</p><br/></> })}
            <ul>
                {ReadMoreContentData?.firstheading?.points.map((item,index)=>{return <li key={index} className="text-black-600   md:text-[10px] xl:text-base">{item.point}</li>})}
            </ul>
            <p className="mt-2.5">{ReadMoreContentData?.firstheading?.challengesDescription}</p>
            <ul>
                {ReadMoreContentData?.firstheading?.challengepoints.map((item,index)=>{return <li key={index} className="text-black-600  md:text-[10px] xl:text-base ">{item.point}</li>})}
            </ul>
            <h2 className="my-2.5">{ReadMoreContentData?.secondheading?.heading}</h2>
            <p>{ReadMoreContentData?.secondheading?.description}</p>

            <h3 className="my-2.5">{ReadMoreContentData?.thirdheading?.heading}</h3>
            <p>{ReadMoreContentData?.thirdheading?.firsthalfdescription} <a className="hover:text-blue text-red-500 font-semibold" href={ReadMoreContentData?.thirdheading?.boldTextUrl}>{ReadMoreContentData.thirdheading.boldText}</a><span>{ReadMoreContentData?.thirdheading?.secondhalfdescription}</span></p>

            <h3 className="my-2.5">{ReadMoreContentData?.fourthheading?.heading}</h3>
            <p>{ReadMoreContentData?.fourthheading?.firsthalfdescription} <a className="hover:text-blue text-red-500 font-semibold" href={ReadMoreContentData?.fourthheading?.boldTextUrl}>{ReadMoreContentData.fourthheading.boldText}</a><span>{ReadMoreContentData?.fourthheading?.secondhalfdescription}</span></p>
            <p className="mt-2.5">{ReadMoreContentData?.fourthheading?.subdescription}</p>

            <h2 className="my-2.5">{ReadMoreContentData?.fifthheading?.heading}</h2>
            <p>{ReadMoreContentData?.fifthheading?.subheading}</p>
            <ul className="mt-2.5">
                {ReadMoreContentData?.fifthheading?.keypoints?.map((item,index)=>{return <li key={index} className="text-black-600  md:text-[10px] xl:text-base ">{item.content}</li>})}
            </ul>

            <h2 className="my-2.5">{ReadMoreContentData?.sixthheading?.heading}</h2>
            <p className="">{ReadMoreContentData?.sixthheading?.firsthalfdescription} <a className="hover:text-blue text-red-500 font-semibold" href={ReadMoreContentData?.sixthheading?.boldTextUrl}>{ReadMoreContentData?.sixthheading?.boldText}</a><span>{ReadMoreContentData?.sixthheading?.secondhalfdescription}</span></p>
            <p className="my-2.5">{ReadMoreContentData?.sixthheading?.subfirstDescription}</p>
            <p>{ReadMoreContentData?.sixthheading?.subsecondDescription}</p>
            <ul className="mt-2.5">
                {ReadMoreContentData?.sixthheading?.keypoints.map((item,index)=>{return<li key={index}><strong className="text-black-800  md:text-[10px] xl:text-base">{item.title}</strong><p className="mb-2.5">{item.content}</p></li>})}
            </ul>
            <p>{ReadMoreContentData?.sixthheading?.lastdescription}</p>

            <h2 className="my-2.5">{ReadMoreContentData?.seventhheading?.heading}</h2>
            <p>{ReadMoreContentData?.seventhheading?.subheading}</p>
            <ul className="mt-2.5">
                {ReadMoreContentData?.seventhheading?.keypoints.map((item,index)=>{return<li key={index}><strong className="text-black-800  md:text-[10px] xl:text-base">{item.title}</strong><p className="mb-2.5">{item.text}</p><p className="mb-2.5">{item.subText}</p></li>})}
            </ul>

            <h2 className="my-2.5">{ReadMoreContentData?.eighthheading?.heading}</h2>
            <p>{ReadMoreContentData?.eighthheading?.firstsubheading}</p>
            <p className="my-2.5">{ReadMoreContentData?.eighthheading?.secondsubheading}</p>
            <p>{ReadMoreContentData?.eighthheading?.KeyPointDescription}</p>
            <ul className="my-2.5">
                {ReadMoreContentData?.eighthheading?.points.map((item,index)=>{return<h3 key={index}><strong className="text-black-800  md:text-[10px] xl:text-base">{item.title}</strong><p className="my-2.5 font-normal">{item.content}</p></h3>})}
            </ul>
            <p>{ReadMoreContentData?.eighthheading?.lastdescription}</p>

            <h2 className="my-2.5">{ReadMoreContentData?.ninthheading?.heading}</h2>
            {ReadMoreContentData?.ninthheading?.descriptions.map((item, index) => { return<> <p key={index}>{item.description}</p><br/></> })}
        
            <h2 className="my-2.5">{ReadMoreContentData?.tenthheading?.heading}</h2>
            <p>{ReadMoreContentData?.tenthheading?.keyPointDescription}</p>
            <ul className="my-2.5">
                {ReadMoreContentData?.tenthheading?.keypoints.map((item,index)=>{return<li key={index}><p >{item.content}</p></li>})}
            </ul>
            <p>{ReadMoreContentData?.tenthheading?.lastdescription}</p>

            <h2 className="my-2.5">{ReadMoreContentData?.conclusion?.heading}</h2>
            <p>{ReadMoreContentData?.conclusion?.description}</p>
        </div>
    )
}
export default BgReadMoreContent;