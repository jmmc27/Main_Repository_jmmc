import React from "react";
import TeamIntegrationRoutes from "./TeamIntegrationRoutes";
//re-added them for function compatibility across several browsers please do npm i if encountered errors 2/19/24
import "core-js"; //Includes polyfills for ECMAScript up to 2023: promises, symbols, collections, iterators, typed arrays, many other features.
import "regenerator-runtime/runtime"; //runtime support for compiled/transpiled async functions. (It may well have other uses, but this is the predominant one.)
const App = () => {
  return (
    <>
      {/*<TeamB_Router />*}
  
      {/* <TeamB_Router /> */}

      <TeamIntegrationRoutes />
      {/* <TeamC_Router /> */}
    </>
  );
};

export default App;
