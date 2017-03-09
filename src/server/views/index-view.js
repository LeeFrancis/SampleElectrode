//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import { configureStore } from "../../client/store";
import { fetchExperiments, receiveExperiment } from "../../client/actions";
const ebscoPlanout = require("electrode-archetype-ebsco").ebscoPlanout;

const Promise = require("bluebird");

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
    ebscoPlanout.getExperiments("http://0.0.0.0:4000/api/Experiments/search1", Math.ceil(Math.random()*10))
    .then((experiments) => {
      console.log(experiments);
      store.dispatch(receiveExperiment(experiments));
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
