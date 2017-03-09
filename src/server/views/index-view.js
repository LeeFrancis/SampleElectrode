//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import { configureStore } from "../../client/store";
import { fetchExperiments, receiveExperiment } from "../../client/actions";
const ebscoPlanout = require("electrode-archetype-ebsco").ebscoPlanout;

const Promise = require("bluebird");
const ERROR_STATUS = 400;
function createReduxStore(req, match) { // eslint-disable-line
  const initialState = {
  };

  const store = configureStore(initialState);

  const actions = [
    store.dispatch(fetchExperiments("search1")),
    getExperiments(store)
  ];
  return Promise.all(actions).then(() => store);

}

function getExperiments(store) {
  return new Promise((resolve) => {
    fetch("http://0.0.0.0:4000/api/Experiments/search1")
    .then((response) => {
      if (response.status >= ERROR_STATUS) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((experiment) => {
      store.dispatch(receiveExperiment(experiment.json));
      resolve();
    });
  });
}


//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
