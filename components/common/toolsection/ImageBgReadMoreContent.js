export const ImageBgReadMoreContent = ({ ImageBgReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.Description}</p>

            <h3 className="mb-2.5">{ImageBgReadMoreContentData?.FirstHeading?.heading}</h3>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.FirstHeading?.description}</p>
            {ImageBgReadMoreContentData?.FirstHeading?.Firstsubheadings.map((item, index) => (
                <div className="mb-2.5" key={index}>
                    <h4>{item.heading}</h4>
                    <p>{item.content}</p>
                </div>
            ))}
            <h4>{ImageBgReadMoreContentData?.FirstHeading?.productsubheading}</h4>
            <p className="mb-2.5">
                {ImageBgReadMoreContentData?.FirstHeading?.productfirsthalfcontent}
                <a href={ImageBgReadMoreContentData?.FirstHeading?.boldlink} className="text-blue font-bold md:text-[10px] md:leading-[14px] lg:text-base">
                    {ImageBgReadMoreContentData?.FirstHeading?.boldtext}
                </a>
                {ImageBgReadMoreContentData?.FirstHeading?.productsecondhalfcontent}
            </p>

            {ImageBgReadMoreContentData?.FirstHeading?.Secondsubheadings.map((item, index) => (
                <div className="mb-2.5" key={index}>
                    <h4>{item.heading}</h4>
                    <p>{item.content}</p>
                </div>
            ))}

            <h3 className="mb-2.5">{ImageBgReadMoreContentData?.SecondHeading?.heading}</h3>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.SecondHeading?.description}</p>
            {ImageBgReadMoreContentData?.SecondHeading?.points.map((item, index) => (
                <div className="mb-2.5" key={index}>
                    <p className="text-black-800 font-semibold">{item.title}<span className="text-black-600 font-normal">{" " + item.content}</span></p>
                </div>
            ))}

            <p className="text-black-800 font-semibold mb-2.5">{ImageBgReadMoreContentData?.SecondHeading?.lasttitle}
                <span className="text-black-600 font-normal">{" " + ImageBgReadMoreContentData?.SecondHeading?.firsthalfcontent}
                    <a className="font-bold text-blue" href={ImageBgReadMoreContentData?.SecondHeading?.boldlink}>{ImageBgReadMoreContentData?.SecondHeading?.boldtext}</a>
                    {ImageBgReadMoreContentData?.SecondHeading?.secondhalfcontent} </span></p>

            <p className="mb-2.5">{ImageBgReadMoreContentData?.SecondHeading?.lastdescription}</p>

            <h3 className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.heading}</h3>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.description}</p>
            <h4 className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.firstsubheading}</h4>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.firstcontent}</p>
            <h4 className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.secondsubheading}</h4>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.firsthalftext}<a className="font-bold text-blue " href={ImageBgReadMoreContentData?.ThirdHeading?.boldlink}>{ImageBgReadMoreContentData?.ThirdHeading?.boldtext}</a>{ImageBgReadMoreContentData?.ThirdHeading?.secondhalftext}</p>
            {ImageBgReadMoreContentData?.ThirdHeading?.subheadings.map((item, index) => {
                return <div key={index} className="mb-2.5"><h4>{item.heading}</h4>
                    <p>{item.content}</p> </div>

            })}
            <p className="mb-2.5">{ImageBgReadMoreContentData?.ThirdHeading?.lastdescription}</p>

            <h3 className="mb-2.5">{ImageBgReadMoreContentData?.FinalWords?.heading}</h3>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.FinalWords?.Firstdesc}</p>
            <p className="mb-2.5">{ImageBgReadMoreContentData?.FinalWords?.seconddesc}</p>
        </div>
    );
};

export default ImageBgReadMoreContent;
