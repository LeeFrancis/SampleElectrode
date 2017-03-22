//
// This is the server side entry point for the React app.
//
import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import { configureStore } from "../../client/store";
import { readFileSync } from "fs";


const Promise = require("bluebird");
function createReduxStore(req, match) { // eslint-disable-line
  const optimizelyJSON = readFileSync("optimizely.json", "utf8");
  const initialState = {
    optimizelyExperiment: JSON.parse(optimizelyJSON),
    user: {id: req.query.userId || 0}
  };
  const store = configureStore(initialState);
  const actions = [
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
