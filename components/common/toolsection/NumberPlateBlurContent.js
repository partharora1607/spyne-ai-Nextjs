import React from "react";
function NumberPlateBlurContent({ NumberPlateBlurContentData }) {
  const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
  const { table } = NumberPlateBlurContentData.istheading[0];

  return (
    <div className="md:px-4  pt-5 font-normal sm:text-base leading-6 text-xs">
      <p className="mb-6">{NumberPlateBlurContentData.introduction}</p>
      <h2>{NumberPlateBlurContentData.fifthheading[0].heading}</h2>
      <p className="mt-2.5 mb-4 ">
        {NumberPlateBlurContentData.fifthheading[0].subheading}
      </p>
      <ol className="mb-6">
        {NumberPlateBlurContentData.fifthheading[0].keypoints.map(
          (keypoint, index) => (
            <li
              key={index}
              className="mt-2.5 font-normal text-base leading-6  text-black-600"
            >
              <p>
                <strong className="text-black-800">{keypoint.step} </strong>
                {keypoint.title}
              </p>
              <p className="mt-2">{keypoint.content}</p>
            </li>
          )
        )}
      </ol>
      <h2 className="">{NumberPlateBlurContentData.secondheading[0].heading}</h2>
      <p className="  mt-2.5 mb-2.5">
        {NumberPlateBlurContentData.secondheading[0].subheading}
      </p>
      <ol className="">
        {NumberPlateBlurContentData.secondheading[0].keypoints.map(
          (keypoint, index) => (
            <>
              <li
                key={index}
                className="font-normal text-base leading-6  text-black-600"
              >
                <strong className="text-black-800 ">{keypoint.title}</strong><br />
                {keypoint.content}
              </li>
              <br />
            </>
          )
        )}
      </ol>
      <br />
      <h2 className="mb-4">{NumberPlateBlurContentData.eighthheading[0].heading}</h2>
      <p>
      {NumberPlateBlurContentData.eighthheading[0].subheading} <a href="https://www.spyne.ai/blogs/photo-editing" className="text-blue font-bold ">{NumberPlateBlurContentData.eighthheading[0].subheadinglink}</a> {NumberPlateBlurContentData.eighthheading[0].subheadingcontinue}
        </p><br/>
      <ol className="">
        {NumberPlateBlurContentData.eighthheading[0].keypoints.map(
          (keypoint, index) => (
            <>
              <li
                key={index}
                className="font-normal text-base leading-6  text-black-600"
              >
                <div>
                  <strong className="text-black-800">{keypoint.title}</strong>
                </div>

                <div className="mt-2">{keypoint.content}</div>
              </li>
              <br />
            </>
          )
        )}
      </ol>
      <br />
      <h2>{NumberPlateBlurContentData.thirdheading[0].heading}</h2>
      <p className=" mt-2.5">
        {NumberPlateBlurContentData.thirdheading[0].subheading}
      </p>
      <br />
      <ol className="">
        {NumberPlateBlurContentData.thirdheading[0].keypoints.map(
          (keypoint, index) => (
            <>
              <li
                key={index}
                className="font-normal text-base leading-6  text-black-600"
              >
                <p>{keypoint.content}</p><br />
              </li>
            </>
          )
        )}
      </ol>
      <br />
      <h2>{NumberPlateBlurContentData.sixthheading[0].heading}</h2>
      <p className="mt-2.5">{NumberPlateBlurContentData.sixthheading[0].subheading}</p>
      <br />

      <p>{NumberPlateBlurContentData.sixthheading[0].undertext}</p>
      <br />
      <p>{NumberPlateBlurContentData.sixthheading[0].lastpara}<a href="https://www.spyne.ai/blogs/automotive-solutions" className="text-blue font-bold ">{NumberPlateBlurContentData.sixthheading[0].lastparalinktext}</a>{NumberPlateBlurContentData.sixthheading[0].lastparacontinue}</p>
      <br />

      <h2>{NumberPlateBlurContentData.ninthheading[0].heading}</h2>
      <br />
      <p>{NumberPlateBlurContentData.ninthheading[0].subparagraph}</p>
      <br />
      <p>{NumberPlateBlurContentData.ninthheading[0].subparagraphsecond}</p>
      <br />
      <p>{NumberPlateBlurContentData.ninthheading[0].subparagraphthird}</p>

      <h2 className="mt-4">{NumberPlateBlurContentData.tenthheading[0].heading}</h2>
      <br />
      <p>{NumberPlateBlurContentData.tenthheading[0].subheadingone}<a href="https://www.spyne.ai/blogs/car-photography-photoshoot" className="text-blue font-bold">{NumberPlateBlurContentData.tenthheading[0].subheadingonelinktext}</a>{NumberPlateBlurContentData.tenthheading[0].subheadingonecontinue}</p>
      <br />
      <p>{NumberPlateBlurContentData.tenthheading[0].subheadingtwo}</p>
      <br />
      <p>{NumberPlateBlurContentData.tenthheading[0].subheadingthree}</p>
      <br />
      <p>{NumberPlateBlurContentData.tenthheading[0].subheadingfour}<a href="https://www.spyne.ai/blogs/car-turntable" className="text-blue font-bold">{NumberPlateBlurContentData.tenthheading[0].subheadingfourlinktext}</a>{NumberPlateBlurContentData.tenthheading[0].subheadingfourcontinue}</p>
      <br />
      <ol className="list-disc ml-5">
        {NumberPlateBlurContentData.tenthheading[0].keypoints.map(
          (keypoint, index) => (
            <>
              <li key={index} className="font-normal text-base leading-6  text-black-600 mb-2">
                {keypoint.point}
              </li>
            </>
          )
        )}
      </ol>
      <br />


      <h2 className="mt-4">{NumberPlateBlurContentData.seventhheading[0].heading}</h2>
      <p>{NumberPlateBlurContentData.seventhheading[0].subheading}<a href="https://www.spyne.ai/blogs/virtual-car-showroom" className="text-blue font-bold">{NumberPlateBlurContentData.seventhheading[0].subheadinglink}</a>{NumberPlateBlurContentData.seventhheading[0].subheadingcontinue}</p>
    </div>
  );
}

export default NumberPlateBlurContent;
