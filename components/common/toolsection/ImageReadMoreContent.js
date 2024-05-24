import React from "react";
import { ImageReadMoreContentData } from "@/components/image-enhancer/config";

const ImageReadMoreContent = () => {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    return (
        <div className="pb-10">
            <p>
                {ImageReadMoreContentData?.firstdescription} <a href="https://www.spyne.ai/blogs/product-photography" className="text-blue font-bold">{ImageReadMoreContentData?.firstdescriptionlink}</a>{ImageReadMoreContentData?.firstdescriptioncontinue}
            </p>
            <p className="my-2.5">{ImageReadMoreContentData?.seconddescription}</p>

            <h3>{ImageReadMoreContentData?.firstheading?.heading}</h3>
            <p className="mt-2.5">{ImageReadMoreContentData?.firstheading?.subfirstdesc}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.firstheading?.subscddesc}</p>
            <ul>
                {ImageReadMoreContentData?.firstheading?.keypoints.map((item, index) => {
                    return <li key={index}>
                        <p className="mt-2.5">{item.point}</p>
                    </li>
                })}
            </ul>

            <h3 className="mt-2.5">{ImageReadMoreContentData?.secondheading?.heading}</h3>
            <p className="mt-2.5">{ImageReadMoreContentData?.secondheading?.Firstsubheading}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.secondheading?.secondsubheading}</p>

            <h3 className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.heading}</h3>
            <p className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.maindescription}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.description}</p>

            <h4 className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.subfirstheading}</h4>
            <p className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.subistdesc}</p>

            <h4 className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.subsecondheading}</h4>
            <p className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.subisthalfdesc}<strong className="text-blue">{ImageReadMoreContentData?.thirdheading?.boldText}</strong>{ImageReadMoreContentData?.thirdheading?.subsscdhalfdesc}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.thirdheading?.seconddesc}</p>



            <h3 className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.heading}</h3>
            <p className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.firstsubdesc}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.secondsubdesc}</p>
            <ul className="mt-2.5">
                {ImageReadMoreContentData?.fourthheading?.points.map((item, index) => {
                    return <li key={index}>
                        <p className="  ">{item.point}</p>
                    </li>
                })}
            </ul>
            <p className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.thirdsubdesc}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.fourthsubdesc}</p>
            <p className="mt-2.5">{ImageReadMoreContentData?.fourthheading?.fifthsubdesc}</p>
            <h3 className="mt-2.5 ">{ImageReadMoreContentData?.fourthheading?.subheading}</h3>
            <ul>
                {ImageReadMoreContentData?.fourthheading?.descriptions.map((item, index) => {
                    return <p key={index} className="mt-2.5">{item.description}</p>
                })}
            </ul>

            <h3 className="mt-2.5">{ImageReadMoreContentData?.fifthheading?.heading}</h3>
            <p className="mt-2.5">{ImageReadMoreContentData?.fifthheading?.description}</p>
            <ul>
                {
                    ImageReadMoreContentData?.fifthheading?.keypoints.map((item, index) => {
                        return <li key={index} className="mt-2.5">
                            <strong className="text-black-800">{item.title}</strong>
                            <p>{item.content}</p>
                        </li>
                    })
                }
            </ul>
            <p className="mt-2.5">{ImageReadMoreContentData?.fifthheading?.subdescription}</p>

            <h3 className="mt-2.5">{ImageReadMoreContentData?.Conclusion?.heading}</h3>

            {ImageReadMoreContentData?.Conclusion?.descriptions.map((item, index) => {
                return <p className="mt-2.5" key={index}>{item.description}</p>
            })}

        </div>
    )
}
export default ImageReadMoreContent;