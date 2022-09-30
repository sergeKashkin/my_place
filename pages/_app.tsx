import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import { ApolloProvider } from "@apollo/client";
import { DataService } from "../services/data/data.service";
const dataService = new DataService();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={dataService.apolloClient}>
          <div className="layout">
            <NavBar></NavBar>
            <div className="content-container">
              <Component {...pageProps} />
            </div>
          </div>
      </ApolloProvider>
      </>
    );
}

export default MyApp;
