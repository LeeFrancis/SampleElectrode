"use strict";
const fetch = require("isomorphic-fetch");
const SSRCaching = require("electrode-react-ssr-caching");
// const ebscoPlanout = require("electrode-archetype-ebsco").ebscoPlanout;
const planout = require("planout");

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");

const support = require("electrode-archetype-react-app/support");


require.extensions[".css"] = () => {
  return;
};

const cacheConfig = {
  components: {
    SSRCachingTemplateType: {
      strategy: "template",
      enable: true
    },
    SSRCachingSimpleType: {
      strategy: "simple",
      enable: true
    }
  }
};

support.load()
  .then(() => {
    const config = electrodeConfippet.config;
    SSRCaching.enableCaching();
    SSRCaching.setCachingConfig(cacheConfig);
    // ebscoPlanout.getExperiments("http://0.0.0.0:4000/api/Experiments/search1", Math.ceil(Math.random()*10))
    // .then((experiments) => {
    //   console.log(experiments.get("search_component"));

    //   require("./express-server")(config);  // eslint-disable-line
    // });
    require("./express-server")(config);  // eslint-disable-line
  });



