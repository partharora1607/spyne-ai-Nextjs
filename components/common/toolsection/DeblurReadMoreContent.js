import { SUBRESOURCE_INTEGRITY_MANIFEST } from "next/dist/shared/lib/constants";

const DeblurReadMoreContent = ({ DeblurReadMoreContentData }) => {
    return (
        <div>
            {/* <p>{DeblurReadMoreContentData?.FirstDescription}</p>
            <p className="mt-2.5">{DeblurReadMoreContentData?.SecondDescription}</p>

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.Firstheading?.heading}</h3> */}
            {DeblurReadMoreContentData?.Firstheading?.descriptions.map((item, index) => { return <p key={index} className="mt-2.5">{item.description}</p> })}

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.SecondHeading?.heading}</h3>
            <p className="mt-2.5">{DeblurReadMoreContentData?.SecondHeading?.FirstDescription}<span className="text-black-600 md:text-[10px] md:leading-[14px] lg:text-base">{DeblurReadMoreContentData?.SecondHeading?.boldText}</span></p>
            <p className="mt-2.5">{DeblurReadMoreContentData?.SecondHeading?.SecondDescription}</p>
            {DeblurReadMoreContentData?.SecondHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="font-bold text-black-800">{item.title}</p>
                    <p>{item.text}</p>
                </div>
            })}

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.ThirdHeading?.heading}</h3>
            <p className="mt-2.5">{DeblurReadMoreContentData?.ThirdHeading?.description}</p>
            {DeblurReadMoreContentData?.ThirdHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="font-bold text-black-800">{item.title}</p>
                    <p className="mt-2.5">{item.text}</p>
                </div>
            })}

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.FourthHeading?.heading}</h3>
            <p className="mt-2.5">{DeblurReadMoreContentData?.FourthHeading?.firstHalfDescription} <span className="text-black-600 md:text-[10px] md:leading-[14px] lg:text-base">{DeblurReadMoreContentData?.FourthHeading?.BoldText}</span>{DeblurReadMoreContentData?.FourthHeading?.secondHalfDescription}</p>
            <p className="mt-2.5">{DeblurReadMoreContentData?.FourthHeading?.subDescription}</p>
            {DeblurReadMoreContentData?.FourthHeading?.points.map((item, index) => {
                return <div key={index} className="mt-2.5">
                    <p className="font-bold text-black-800">{item.title}</p>
                    <p className="mt-2.5">{item.text}</p>
                </div>
            })}
            <p className="mt-2.5">{DeblurReadMoreContentData?.FourthHeading?.lastFirstHalfDesc}<strong className="text-black-600 md:text-[10px] md:leading-[14px] lg:text-base">{DeblurReadMoreContentData?.FourthHeading?.boldText}</strong>{DeblurReadMoreContentData?.FourthHeading?.lastSecondHalfDesc}</p>

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.FifthHeading?.heading}</h3>
            <p className="my-2.5">{DeblurReadMoreContentData?.FifthHeading?.description}</p>
            {DeblurReadMoreContentData?.FifthHeading?.points.map((item, index) => { return <p key={index} className="">{item.text}</p> })}
            <p className="my-2.5">{DeblurReadMoreContentData?.FifthHeading?.subDescription}</p>
            {DeblurReadMoreContentData?.FifthHeading?.keypoints.map((item, index) => { return <p key={index} className=""><strong className="text-black-800 ">{item.title}</strong>{item.text}</p> })}

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.FeatureHeading?.heading}</h3>
            <p className="mt-2.5">{DeblurReadMoreContentData?.FeatureHeading?.description}</p>
            {
                DeblurReadMoreContentData?.FeatureHeading?.subFeatures.map((item, index) => {
                 return  <div key={index} className="mt-2.5">
                    <h5 className="text-black-800 font-bold">{item.title}</h5>
                    <p className="mt-1">{item.text}</p> 
                </div>

                })
            }

            <h3 className="mt-2.5">{DeblurReadMoreContentData?.ConclusionHeading}</h3>
            <p className="mt-2.5">{DeblurReadMoreContentData?.ConclusionText}</p>
            
        </div>
    )
}
export default DeblurReadMoreContent;