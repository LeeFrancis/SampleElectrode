import ExEnv from "exenv";


let MedicalSearch;
let AcademicSearch;
if (ExEnv.canUseDOM) {
  MedicalSearch = require("bundle-loader?lazy&name=MedicalSearch!../containers/medical-search");
  AcademicSearch = require("bundle-loader?lazy&name=AcademicSearch!../containers/academic-search");
}

export const getRandomWidget = () => {
  const widgets = ["MedicalSearch", "AcademicSearch"];
  return ExEnv.canUseDOM ? widgets[Math.floor(Math.random() * widgets.length)] : "";
};

export const getWidgetFromPlanout = (experiment) => {
  return experiment &&  experiment.get ? experiment.get("search_component") : undefined;
};

export const widgetDict = {
  "Central Banner": {
    MedicalSearch,
    AcademicSearch
  }
};


