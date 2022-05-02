import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';

import store from "../redux/store";
import {Provider} from "react-redux";

import {ThemeProvider} from "@mui/material";


import lightTheme from "../styles/theme/lightTheme";


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
      <ThemeProvider theme={lightTheme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp
