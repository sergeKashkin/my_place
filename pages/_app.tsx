import "../styles/globals.scss";
import { useState, useRef, useEffect } from "react";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { ApolloProvider } from "@apollo/client";
import { DataService } from "../services/data/data.service";
import { useRouter } from "next/router";
import { LayoutService } from "../services/layout/layout.service";
const dataService = new DataService();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const lastHistoryStateRef = useRef(global.history?.state);
  let [menuState, setMenuState] = useState(false);

  useEffect(() => {

    router.beforePopState(({ url }) => {
      if (menuState && LayoutService.isMobileDevice()) {
        window.history.go(1);
        setMenuState((menuState: boolean) => {
          return !menuState;
        });
        return false;
      }
      return true;
    });
  }, [menuState]);

  return (
    <>
      <ApolloProvider client={dataService.apolloClient}>
        <div className="layout">
          <NavBar menuStateChange={setMenuState} menuState={menuState}></NavBar>
          <div className="content-container">
            <Component {...pageProps} />
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
