import Head from "next/head";
import { useRouter } from 'next/router';
export default function NoindexMetaHead() {
    const router = useRouter();
    const currentPath = router.asPath;
    const currentURL = 'https://www.spyne.ai' + currentPath;
    return <><Head>
    <title>AI Tools - Powered by SPYNE</title>
    <meta name="description" content="Spyne is one of the best online AI image processing tools - it’s easy to use and requires no download or installation! Process images for free today" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
    <link rel="canonical" href={currentURL} />
    <script
   dangerouslySetInnerHTML={
                 {
     __html: `
     (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "hv38i70ba8");
  
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2787794,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');


  `,
   }}
 />;
    {/* Add more metadata tags as needed */}
  </Head></>
}