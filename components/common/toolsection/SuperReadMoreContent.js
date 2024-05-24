import React from "react";
const SuperReadMoreContent = ({ SuperReadMoreContentData }) => {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    return (
        <>
            <div>
                {SuperReadMoreContentData?.descriptions?.map((item, index) => (
                    <p key={index} className="mt-2.5">
                        {item?.description}
                    </p>
                ))}
            </div>
            <h2 className="mt-2.5">{SuperReadMoreContentData?.heading}</h2>
            {SuperReadMoreContentData?.subdescriptions?.map((item, index) => (
                <p key={index} className="mt-2.5">
                    {item?.description}
                </p>
            ))}
            {SuperReadMoreContentData?.subheading?.map((item, index) => (
                <div key={index} className="mt-2.5">
                    <h3>{item?.heading}</h3>
                    {item?.descriptions?.map((value, i) => (
                        <p className="mt-2.5" key={i}>
                            {value?.description}
                            
                        </p>
                    ))}
                </div>
            ))}
            <ul className="list-disc">
                {SuperReadMoreContentData?.listitems.map((item, index) => { return <li key={index} className="mt-2.5 text-black-600 ml-6 md:text-[10px] xl:text-base text-base">{item.point}</li> })}
            </ul>
            <h2 className="mt-2.5">{SuperReadMoreContentData?.Secondsection?.heading}</h2>
            <p className="mt-2.5">{SuperReadMoreContentData?.Secondsection?.subheading}</p>
            {SuperReadMoreContentData?.Secondsection?.descriptions?.map((item, index) => (
                <div className="mt-4">
                    <h3 key={index}>
                        {item?.pointerheading}
                    </h3>
                    <p key={index} className="mt-2">
                        {item?.description}
                    </p>
                </div>
            ))}

            <h2 className="mt-2.5">{SuperReadMoreContentData?.thirdsection?.heading}</h2>
            <p className="mt-2.5">{SuperReadMoreContentData?.thirdsection?.subheading}</p>
            {SuperReadMoreContentData?.thirdsection?.descriptions?.map((item, index) => (
                <div className="mt-4">
                    <p key={index} className="mt-2">
                        {item?.description}
                    </p>
                </div>
            ))}


            <h2 className="mt-2.5">{SuperReadMoreContentData?.Conclusion?.heading}</h2>
            {SuperReadMoreContentData?.Conclusion?.descriptions?.map((item, index) => (
                <p key={index} className="mt-2.5 ">
                    {item?.description}
                </p>
            ))}
          
        </>
    );
};

export default SuperReadMoreContent;
