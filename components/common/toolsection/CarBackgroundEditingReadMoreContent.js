const CarBackgroundEditingReadMoreContent = ({ CarBackgroundEditingReadMoreContentData }) => {
    return (
        <div>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.Description}</p>
            <p className="mb-8">{CarBackgroundEditingReadMoreContentData?.SubDescription}</p>



            <h2 className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FirstHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FirstHeading?.Description}</p>



            <h2 className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SecondHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SecondHeading?.Description}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SecondHeading?.SecondDescription}</p>
            


            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.Description}</p>
            {CarBackgroundEditingReadMoreContentData?.ThirdHeading?.Points.map((item, index) => {
                return <li className="mb-1.5 ml-2" key={index}>{item.Point}</li>
            })}
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SubDescription}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.DescriptionOne}</p>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.DescriptionTwo}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FirstSubHeading?.DescriptionThree}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.DescriptionOne}</p>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.DescriptionTwo}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SecondSubHeading?.DescriptionThree}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.DescriptionOne}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.ThirdSubHeading?.DescriptionTwo}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.DescriptionOne}<a className="text-blue font-bold" href={CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.DescriptionOneLink}>{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.DescriptionOneLinkText}</a>{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.DescriptionOneContinue}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FourthSubHeading?.DescriptionTwo}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FifthSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FifthSubHeading?.DescriptionOne}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.FifthSubHeading?.DescriptionTwo}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SixthSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.ThirdHeading?.SixthSubHeading?.DescriptionOne}</p>
        
            

            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstPara}<a className="text-blue font-bold" href={CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstParaLink}>{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstParaLinkText}</a>{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstParaContinue}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstSubHeading?.Description}<a className="text-blue font-bold" href={CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstSubHeading?.DescriptionLink}>{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstSubHeading?.DescriptionLinkText}</a>{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FirstSubHeading?.DescriptionContinue}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.SecondSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.SecondSubHeading?.Description}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.ThirdSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.ThirdSubHeading?.Description}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FourthSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FourthHeading?.FourthSubHeading?.Description}</p>



            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.FifthHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FifthHeading?.DescriptionOne}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FifthHeading?.DescriptionTwo}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.FifthHeading?.DescriptionThree}</p>



            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.Description}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.FirstSubHeading?.Heading}</h3>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.FirstSubHeading?.SubParaOne}</p>
            <p className="mb-2">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.FirstSubHeading?.SubParaTwo}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.FirstSubHeading?.SubParaThree}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.Heading}</h3>
            <p className="mb-1.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaOne}</p>
            {CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaTwo?.Points.map((item, index) => {
                return <p className="mb-1.5 ml-2" key={index}>{item.Point}</p>
            })}
            <p className="mb-2.5 mt-1">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaThree}</p>
            <p className="mb-1.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaFour?.Description}</p>
            {CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaFour?.Points.map((item, index) => {
                return <li className="mb-1.5 ml-2" key={index}>{item.Point}</li>
                
            })}
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.SecondSubHeading?.SubParaFour?.SubDescription}</p>
            <h3 className="mb-2">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.ThirdSubHeading?.Heading}</h3>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SixthHeading?.ThirdSubHeading?.Description}</p>


            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.SeventhHeading?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SeventhHeading?.DescriptionOne}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SeventhHeading?.DescriptionTwo}</p>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.SeventhHeading?.DescriptionThree}</p>



            <h2 className="mb-2.5 mt-8">{CarBackgroundEditingReadMoreContentData?.Conclusion?.Heading}</h2>
            <p className="mb-2.5">{CarBackgroundEditingReadMoreContentData?.Conclusion?.FirstPara}</p>

            
        </div>
    )
}
export default CarBackgroundEditingReadMoreContent;