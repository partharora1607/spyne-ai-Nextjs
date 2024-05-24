import React from "react";
function ReadMoreContent({ ReadMoreContentData }) {
  const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
  const { table } = ReadMoreContentData.istheading[0];

  return (
    <div className="md:px-4  pt-5 font-normal sm:text-base leading-6 text-xs">
      <p className="mb-6">{ReadMoreContentData.introduction}</p>
      <h2>{ReadMoreContentData.fifthheading[0].heading}</h2>
      <p className="mt-2.5 mb-4 ">
        {ReadMoreContentData.fifthheading[0].subheading}
      </p>
      <ol className="mb-6">
        {ReadMoreContentData.fifthheading[0].keypoints.map(
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
      <h2 className="">{ReadMoreContentData.secondheading[0].heading}</h2>
      <p className="  mt-2.5">
        {ReadMoreContentData.secondheading[0].subheading} <a href="https://www.spyne.ai/blogs/ai-photo-editor" className="text-blue font-bold ">{ReadMoreContentData.secondheading[0].subheadinglink}</a> {ReadMoreContentData.secondheading[0].subheadingcontinue}
      </p>
      <ol className="">
        {ReadMoreContentData.secondheading[0].keypoints.map(
          (keypoint, index) => (
            <>
              <li
                key={index}
                className="font-normal text-base leading-6  text-black-600"
              >
                <strong className="text-black-800 ">{keypoint.title}</strong>
                {keypoint.content}
              </li>
              <br />
            </>
          )
        )}
      </ol>
      <br />
      <h2 className="mb-4">{ReadMoreContentData.eighthheading[0].heading}</h2>
      <p>
      {ReadMoreContentData.eighthheading[0].subheading} <a href="https://www.spyne.ai/blogs/photo-editing" className="text-blue font-bold ">{ReadMoreContentData.eighthheading[0].subheadinglink}</a> {ReadMoreContentData.eighthheading[0].subheadingcontinue}
        </p><br/>
      <ol className="">
        {ReadMoreContentData.eighthheading[0].keypoints.map(
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

      <h2>{ReadMoreContentData.istheading[0].heading}</h2>
      <p className="mt-2.5">{ReadMoreContentData.istheading[0].subheading}</p>

      <table className="border-collapse border w-full my-6">
        <thead>
          <tr className="sm:py-[10px] sm:px-10  bg-spyne_blue-800 text-white font-bold sm:text-base text-sm">
            <th className="border p-4">Steps</th>
            <th className="border p-4">iOS</th>
            <th className="border p-4">Android</th>
          </tr>
        </thead>
        <tbody className="py-[10px] px-10 bg-black-40 text-black-600 font-normal sm:text-base text-sm leading-6">
          {table.map((row, index) => (
            <tr key={index} className="">
              <td className="border p-3">{row.Matrics}</td>
              <td className="border p-3">
                {row["iOS"]}
              </td>
              <td className="border p-3">{row["Android"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{ReadMoreContentData.istheading[0].undertext}</p>
      <br />
      <p>{ReadMoreContentData.thirdheading[0].description}</p>
      <br />
      <h2>{ReadMoreContentData.thirdheading[0].heading}</h2>
      <p className=" mt-2.5">
        {ReadMoreContentData.thirdheading[0].subheading}
      </p>
      <br />
      <ol className="">
        {ReadMoreContentData.thirdheading[0].keypoints.map(
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
      <h2>{ReadMoreContentData.sixthheading[0].heading}</h2>
      <p className="mt-2.5">{ReadMoreContentData.sixthheading[0].subheading}</p>

      <table className="border-collapse border w-full my-6">
        <thead>
          <tr className="sm:py-[10px] sm:px-10  bg-spyne_blue-800 text-white font-bold sm:text-base text-sm">
            <th className="border p-4">Metrics</th>
            <th className="border p-4">Traditional Image Upscaler</th>
            <th className="border p-4">AI Image Upscaler</th>
          </tr>
        </thead>
        <tbody className="py-[10px] px-10 bg-black-40 text-black-600 font-normal sm:text-base text-sm leading-6">
          {table.map((row, index) => (
            <tr key={index} className="">
              <td className="border p-3">{row.Matrics}</td>
              <td className="border p-3">
                {row["iOS"]}
              </td>
              <td className="border p-3">{row["Android"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{ReadMoreContentData.sixthheading[0].undertext}</p>
      <br />
      <h2>{ReadMoreContentData.seventhheading[0].heading}</h2>
      <p>{ReadMoreContentData.seventhheading[0].subheading}</p>
    </div>
  );
}

export default ReadMoreContent;
