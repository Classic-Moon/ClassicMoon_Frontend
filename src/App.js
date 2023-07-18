import React, { useEffect, Component } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import WalletConnectProvider from './context/WalletConnectProvider';
import Dashboard from './pages/dashboard';
import Swap from './pages/swap';
import Mint from './pages/mint';
import Airdrop from './pages/airdrop';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routers'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const ScrollToTop = ({ children, location }) => {
  useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

export default class App extends Component {
  state = {
    theme: 'dark',
  };

  render() {
    return (
      <>
        <WalletConnectProvider>
          <ThemeProvider
            value={{
              data: this.state,
              update: () => {
                this.setState((state) => ({
                  theme:
                    state.theme === 'light'
                      ? (this.theme = 'dark')
                      : (this.theme = 'light'),
                }));
              },
            }}
          >
            <Header />
            <PosedRouter>
              <ScrollToTop path="/">
                <Dashboard exact path="/">
                  <Redirect to="/" />
                </Dashboard>
                <Swap path="swap" />
                <Mint path="mint" />
                <Airdrop path="airdrop" />
              </ScrollToTop>
            </PosedRouter>
          </ThemeProvider >
          <ToastContainer />
        </WalletConnectProvider>
      </>
    );
  }
}
