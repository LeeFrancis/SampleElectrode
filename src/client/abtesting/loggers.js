const fetch = require("isomorphic-fetch");

const loggerTypes = {
  "mongodb": logGoalsToMongoDB,
  "optimizely": logGoalsToOptimizely,
  "simple": simpleLogger
}

const getLogger = (typeString) => {
  if(loggerTypes[typeString]) {
    return loggerTypes[typeString];
  }
  return loggerTypes["simple"];
}

function logGoalsToMongoDB(data) {
  
  const log = () => {
    data.userid = data.inputs.userid;
    data.experimentid = data.extra_data.experimentid;

    const payload = JSON.stringify(
      {
        goalresultid: 0,
        experimentname: data.name,
        eventtype: data.event,
        timestamp: data.time,
        userid: data.inputs.id,
        experimentid: data.extra_data.experimentid,
        extradata: {}
      }
    );
  };

  const test = () => {
    console.log("test succesful for LogToMongoDB");
  }
}

const logGoalsToOptimizely = (data) => {
  const log = () => {
    console.log("Logging to Optimizely: ", data);
  }
};

const simpleLogger = function(data) {
  const log = () => {
    console.log("simple goal logger", data);
  }
};

 export { logGoalsToMongoDB, logGoalsToOptimizely, simpleLogger }; 