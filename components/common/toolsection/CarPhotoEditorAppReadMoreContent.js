const CarPhotoEditorAppReadMoreContent = ({ CarPhotoEditorAppReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.Description}</p>
            <p className="mb-1.5">{CarPhotoEditorAppReadMoreContentData?.SubDescription}</p>
            {CarPhotoEditorAppReadMoreContentData?.SubPoints?.map((item, index) => {
                return <li className="mb-1.5 ml-2" key={index}>{item.Point}</li>
            })}
            <h3 className="mb-2">{CarPhotoEditorAppReadMoreContentData?.FirstSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.FirstSubHeading?.Description}</p>
            <h3 className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.SecondSubHeading?.Description}</p>



            <h2 className="mb-2.5 mt-8">{CarPhotoEditorAppReadMoreContentData?.FirstHeading?.Heading}</h2>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.FirstHeading?.FirstDescription?.Description}</p>
            {CarPhotoEditorAppReadMoreContentData?.FirstHeading?.FirstDescription?.Points.map((item, index) => {
                return <li className="mb-1.5 ml-2" key={index}>{item.Point}</li>
            })}
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.FirstHeading?.SecondDescription}</p>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.FirstHeading?.ThirdSubDescription}</p>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.FirstHeading?.FourthSubDescription}</p>
            {CarPhotoEditorAppReadMoreContentData?.FirstHeading?.FifthSubDescription?.map((item, index) => {
                return <li className="mb-1.5 ml-2" key={index}>{item.point}</li>
            })}
    


            <h2 className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.Description}</p>
            {CarPhotoEditorAppReadMoreContentData?.SecondHeading?.Ponits.map((item, index) => {
                return(
                    <li className="mb-1.5" key={index}>{item.Description}</li>
            )})}
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.SubDescription}</p>
            <h3 className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.Heading}</h3>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.DescriptionOne}</p>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.DescriptionTwo}</p>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.DescriptionThree}</p>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.DescriptionFour}</p>
            <p className="mb-2">{CarPhotoEditorAppReadMoreContentData?.SecondHeading?.FirstSubHeading?.DescriptionFive}</p>
            
            

            <h2 className="mb-2.5 mt-8">{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FirstPara} <a className="text-blue font-bold" href={CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FirstParaLink}>{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FirstParaLinktext}</a>{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FirstParaContinue}</p>
            {CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.SecondPara.map((item, index) => {
                return(
                    <p className="mb-1.5 ml-2.5" key={index}>{item.Point}</p>
            )})}
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.ThirdPara} <a className="text-blue font-bold" href={CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.ThirdParaLink}>{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.ThirdParaLinkText}</a>{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.ThirdParaContinue}</p>
            <p className="mb-1.5">{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FourthPara?.Description}</p>
            {CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FourthPara?.Points.map((item, index) => {
                return(
                    <li className="mb-1.5 ml-2.5" key={index}>{item.Point}</li>
            )})}
            <p className="mb-2.5 mt-1">{CarPhotoEditorAppReadMoreContentData?.ThirdHeading?.FifthPara}</p>



            <h2 className="mb-2.5 mt-8">{CarPhotoEditorAppReadMoreContentData?.Conclusion?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditorAppReadMoreContentData?.Conclusion?.FirstPara}</p>

            
        </div>
    )
}
export default CarPhotoEditorAppReadMoreContent;