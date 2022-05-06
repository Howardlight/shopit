import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';
import store from "../redux/store";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import lightTheme from "../styles/theme/lightTheme";
import Head from "next/head";


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
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp
