import * as React from "react";
import "../styles/main.scss";
import * as axios from "axios";
export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  React.useEffect(() => {
    axios.default.get("http://localhost:4000/api/hello").then(() => {
      console.log("i have call server");
    });
  });
  return <h1>Test</h1>;
};

export default App;
