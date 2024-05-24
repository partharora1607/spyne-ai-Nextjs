import Image from "next/image";
import Link from "next/link";

function DownloadApp({ DownloadAppData }) {
  return (
    <section className="xl:py-8 md:py-8 py-8">
      <div className="container px-4">
        <div className="grid grid-cols-12">
          <div className="md:col-span-6 col-span-12">
            <Image
              src={DownloadAppData?.downloadAppImage}
              width={600}
              height={300}
              className="w-full object-contain  xl:h-full md:h-[256px]"
              alt="Downoloadappimg"
            />
          </div>
          <div className="md:col-span-5 lg:col-span-6 col-span-12 xl:mt-20 sm:pt-10 md:pt-14 xl:pl-10 md:pr-5">
            <h2 className="text-black xl:mb-2 mb-2 md:mb-1">{DownloadAppData.heading}</h2>
            <p className="xl:text-base text-sm md:text-[10px] md:leading-[14px] font-normal xl:mt-2 mt-4 md:mt-1 sm:text-black-800 text-black-600">
              {DownloadAppData.subheading}
            </p>
            <ul className="flex gap-2 mt-8 xl:mt-8 md:mt-4">
              <li>
                <Link href={DownloadAppData?.appStoreImg?.link}>
                  <Image
                    src={DownloadAppData?.appStoreImg?.url}
                    className="w-auto h-14 xl:h-14 md:h-7"
                    width={168}
                    height={50}
                    alt="AppStoreImg"
                  />
                </Link>
              </li>
              <li>
                <Link href={DownloadAppData?.gplay?.link}>
                  <Image
                    src={DownloadAppData?.gplay?.url}
                    className="w-auto h-14 xl:h-14 md:h-7"
                    width={168}
                    height={50}
                    alt="GooglePlayImg"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DownloadApp;
