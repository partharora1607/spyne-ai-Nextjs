import "@/styles/globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store';
import { HydrationProvider, Server, Client } from "react-hydration-provider";
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-phone-input-2/lib/style.css'
import Head from "next/head";
import AppWrapper from "@/hoc/AppWrapper";
import RefreshToken from "./RefreshToken";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCleverTap } from "@/utils/CleverTap";



function App({ Component, pageProps }) {
  useCleverTap()
  return (
    <AppWrapper>
      <HydrationProvider>
        <GoogleOAuthProvider clientId={process.env.APP_KEY_GOOGLE_CLIENT_ID}>
          <Provider store={store}>
            <RefreshToken>
            <Head>
              <meta name="viewport" content="width=device-width, user-scalable=no" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
            </RefreshToken>
          </Provider>
        </GoogleOAuthProvider>
      </HydrationProvider>
    </AppWrapper>


  );
}
const wrapper = createWrapper(() => store);
export default wrapper.withRedux(App);