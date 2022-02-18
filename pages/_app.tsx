import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

//Redux
import store from "../redux/store";
import { Provider } from "react-redux";



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return(
    <Provider store={store}>
    {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp
