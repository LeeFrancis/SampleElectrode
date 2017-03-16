"use strict";
const fetch = require("isomorphic-fetch");
const postCssImport = require("postcss-import");
const postCssNext = require("postcss-cssnext");
const SSRCaching = require("electrode-react-ssr-caching");
const optimizely = require("electrode-archetype-ebsco").optimizely;
const planout = require("planout");

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");

const support = require("electrode-archetype-react-app/support");


require.extensions[".css"] = () => {
  return;
};

/**
 * Use babel register to transpile any JSX code on the fly to run
 * in server mode, and also transpile react code to apply process.env.NODE_ENV
 * removal to improve performance in production mode.
 */
support.babelRegister({
  ignore: /node_modules\/(?!react\/)/
});

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


support.load({
    prepend: [
      postCssImport,
      postCssNext
    ],
    generateScopedName: "[hash:base64]"
  })
  .then(() => {
    const config = electrodeConfippet.config;
    support.cssModuleHook({
      prepend: [
        postCssImport,
        postCssNext
      ],
    generateScopedName: "[hash:base64]"
    });    
    SSRCaching.enableCaching();
    SSRCaching.setCachingConfig(cacheConfig);
    // ebscoPlanout.getExperiments("http://0.0.0.0:4000/api/Experiments/search1", Math.ceil(Math.random()*10))
    // .then((experiments) => {
    //   console.log(experiments.get("search_component"));

    //   require("./express-server")(config);  // eslint-disable-line
    // });

    optimizely.getOptimizelyConfig(
      8289748179,
      "Bearer 2:ZLKAY9Mx8JnXnk3WO5Q1KQomKM9zy9ScV3s7cKkyHTd-UPYeDYoY"
    )
    .then(() => {    
      require("./express-server")(config);  // eslint-disable-line
    });

  });



