import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Loader from "./components/commons/Loader";
import LocomotiveScrollProvider from "./providers/LocomotiveScrollProvider";
import ProgressProvider, {
  useLoaderProgress,
} from "./providers/ProgressProvider";
import HomePage from "./components/pages/HomePage";
import CGV from "./components/pages/CGV";
import Layout from "./components/pages/Layout";
import RGPD from "./components/pages/RGPD";
import MentionsLegales from "./components/pages/MentionsLegales";
import ApiProvider from "./providers/ApiProvider"; // Nouveau provider

const App = () => {
  return (
    <>
      <ProgressProvider>
        <ApiProvider>
          <LocomotiveScrollProvider>
            <LoaderWrapper />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/page/" element={<Layout />}>
                  <Route path="cgv" element={<CGV />} />
                  <Route path="rgpd" element={<RGPD />} />
                  <Route
                    path="mentions-legales"
                    element={<MentionsLegales />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </LocomotiveScrollProvider>
        </ApiProvider>
      </ProgressProvider>
    </>
  );
};

const LoaderWrapper = () => {
  const { isLoading } = useLoaderProgress();
  return isLoading ? <Loader /> : null;
};

export default App;

//TODO
// Add a verification of the position of the sticker to avoid the superposition of the sticker
// Verification JWT
// Mise en place de l'environnnement
