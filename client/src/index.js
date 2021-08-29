
import React, { lazy, Suspense,  } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import Spinner from "./components/Spinner/Spinner";

import { render } from "react-dom";

const LandingPage = lazy(() => retry(() => import("./pages/Landingpage/Landingpage.js")));
const Login = lazy(() => retry(() => import("./pages/Authentication/Login.jsx")));
const Signup = lazy(() => retry(() => import("./pages/Authentication/Signup.jsx")));


// ******** @@@@ retry function() @@@@ ********
//If the browser fails to download the module, it'll try again 5 times with a 1 second delay between each attempt.
//If even after 5 tries it import it, then an error is thrown.
function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
      fn()
          .then(resolve)
          .catch((error) => {
              setTimeout(() => {
                  if (retriesLeft === 1) {
                      // reject('maximum retries exceeded');
                      reject(error);
                      return;
                  }
                  // Passing on "reject" is the important part
                  retry(fn, retriesLeft - 1, interval).then(resolve, reject);
              }, interval);
          });
  });
}

function App() {
  return (
      <Suspense fallback={<Spinner from="suspense" />}>
          <Switch >
            <Route path={`${process.env.PUBLIC_URL}/login/`} exact component={Login} />
            <Route path={`${process.env.PUBLIC_URL}/signup/`} exact component={Signup} />
            <Route path={`${process.env.PUBLIC_URL}/`}exact component={LandingPage}/>
          </Switch>
      </Suspense>
  );
}

render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);

