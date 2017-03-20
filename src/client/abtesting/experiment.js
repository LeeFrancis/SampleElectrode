const planout = require("planout");
const fetch = require("isomorphic-fetch");

/* This is the sample experiment taken from https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js */
Object.getOwnPropertyDescriptors = function getOwnPropertyDescriptors(obj) {
  var descriptors = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      descriptors[prop] = Object.getOwnPropertyDescriptor(obj, prop);
    }
  }
  return descriptors;
};
  
Function.prototype.extend = function extend(proto) {
    var superclass = this;
    var constructor;
  
    if (!proto.hasOwnProperty('constructor')) {
      Object.defineProperty(proto, 'constructor', {
        value: function () {
            // Default call to superclass as in maxmin classes
            superclass.apply(this, arguments);
        },
        writable: true,
        configurable: true,
        enumerable: false
      });
    }
    constructor = proto.constructor;
    
    constructor.prototype = Object.create(this.prototype, Object.getOwnPropertyDescriptors(proto));
    
    return constructor;
};
/* End extend helper */

// this would be a strategy if we have mulitple configurations
const logGoalsToMongoDB = (data) => {
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


  fetch("http://0.0.0.0:4000/api/GoalResults",{
    method: "POST",
    body: payload,
    headers: { 'Content-Type': 'application/json' }
  })
  .then((rsp) => { 
    console.log("logged goal results", rsp) 
  });
}

const getExperimentInstance = function (planoutObject, id) {
  const DemoExperiment = planout.Experiment.extend({
    setup: function() {
      this.name = "SampleExperiment";
    },
    assign: function(params, args) {
      this.script = planoutObject;
      const interpreterInstance = new planout.Interpreter(
          this.script,
          this.getSalt(),
          args
      );
      const results = interpreterInstance.getParams();
      Object.keys(results).forEach(function (result) {
        params.set(result, results[result]);
      });
      return interpreterInstance.inExperiment;
      
    },
    configureLogger: function() {
      return;
    },
    log: function(stuff) {
      console.log(stuff);
      logGoalsToMongoDB(stuff);
    },
    getParamNames: function() {
      return this.getDefaultParamNames();
    },
    previouslyLogged: function() {
      return this._exposureLogged;
    }
  });
  return new DemoExperiment(
      {id}
  );  
};

export default getExperimentInstance;