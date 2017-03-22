//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import { configureStore } from "../../client/store";
import { fetchExperiments, receiveExperiment } from "../../client/actions";
import { readFileSync } from "fs";

const ebscoPlanout = require("electrode-archetype-ebsco").ebscoPlanout;

const Promise = require("bluebird");
const ERROR_STATUS = 400;
function createReduxStore(req, match) { // eslint-disable-line
  const optimizelyJSON = readFileSync("optimizely.json", "utf8");
  const initialState = {
    optimizelyExperiment: JSON.parse(optimizelyJSON),
    user : {id:req.query.userId}
  };
  const store = configureStore(initialState);

  const actions = [
    store.dispatch(fetchExperiments())
  ];
  return Promise.all(actions).then(() => store);

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
