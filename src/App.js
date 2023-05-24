import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { BrowserRouter } from "react-router-dom";

import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <>
        <Router />
      </>
    </BrowserRouter>
  );
}

export default App;
