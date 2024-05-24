const CarPhotoEditingReadMoreContent = ({ CarPhotoEditingReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-8">{CarPhotoEditingReadMoreContentData?.Description}</p>


            <h2 className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FirstHeading?.heading}</h2>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FirstHeading?.FirstDescription}</p>
            <p className="mb-4">{CarPhotoEditingReadMoreContentData?.FirstHeading?.SecondDescription} <a className="text-blue font-bold" href={CarPhotoEditingReadMoreContentData?.FirstHeading?.SecondDescriptionLink}>{CarPhotoEditingReadMoreContentData?.FirstHeading?.SecondDescriptionLinkText}</a>{CarPhotoEditingReadMoreContentData?.FirstHeading?.SecondDescriptionContinue}</p>
            <h3 className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FirstHeading?.SubHeading}</h3>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FirstHeading?.FirstSubDescription}</p>
            <p className="mb-1.5">{CarPhotoEditingReadMoreContentData?.FirstHeading?.SecondSubDescription}</p>
            {CarPhotoEditingReadMoreContentData?.FirstHeading?.ThirdSubDescription.map((item, index) => {
                return <p className="mb-1.5 ml-2" key={index}>{item.point}</p>
            })}
            <p className="mt-2.5 mb-8">{CarPhotoEditingReadMoreContentData?.FirstHeading?.FourthSubDescription} <a className="text-blue font-bold" href={CarPhotoEditingReadMoreContentData?.FirstHeading?.FourthSubDescriptionLink}>{CarPhotoEditingReadMoreContentData?.FirstHeading?.FourthSubDescriptionLinkText}</a>{CarPhotoEditingReadMoreContentData?.FirstHeading?.FourthSubDescriptionContinue}</p>


            <h2 className="mb-2.5">{CarPhotoEditingReadMoreContentData?.SecondHeading?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.SecondHeading?.Description}</p>
            {CarPhotoEditingReadMoreContentData?.SecondHeading?.Ponits.map((item, index) => {
                return(
                    <div key={index} className="mb-2.5">
                        <h3 className="mb-1.5" key={index}>{item.Heading}</h3>
                        <p className="mb-1.5" key={index}>{item.Description}</p>
                    </div>
            )})}
            

            <h2 className="mb-2.5 mt-8">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.Description}</p>
            <h3 className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.Heading}</h3>
            {CarPhotoEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.Points.map((item, index) => {
                return <p className="mb-1.5 ml-2" key={index}>{item.Point}</p>
            })}
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.SubDescription}</p>
            <h3 className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.Description}</p>
            {CarPhotoEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.Points.map((item, index) => {
                return <p className="mb-1.5 ml-2" key={index}>{item.Point}</p>
            })}
            <h3 className="mb-2.5 mt-1">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.FirstPara}</p>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.SecondPara}</p>
            <p className="mt-2.5 mb-8">{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.ThirdPara} <a className="text-blue font-bold" href={CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.ThirdParaLink}>{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.ThirdParaLinkText}</a>{CarPhotoEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.ThirdParaContinue}</p>
            

            <h2 className="mb-2.5 mt-8">{CarPhotoEditingReadMoreContentData?.FourthHeading?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FourthHeading?.FirstPara}</p>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.FourthHeading?.SecondPara}</p>


            <h2 className="mb-2.5 mt-8">{CarPhotoEditingReadMoreContentData?.Conclusion?.Heading}</h2>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.Conclusion?.FirstPara}</p>
            <p className="mb-2.5">{CarPhotoEditingReadMoreContentData?.Conclusion?.SecondPara}</p>

            
        </div>
    )
}
export default CarPhotoEditingReadMoreContent;