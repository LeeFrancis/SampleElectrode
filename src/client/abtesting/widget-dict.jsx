import ExEnv from "exenv";
import getExperimentInstance from "../abtesting/experiment";


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

export const getWidgetFromPlanout = (experiments) => {
  const exp = getExperimentInstance(experiments.experiment, Math.ceil(Math.random()*10));
  return exp.get("search_component");
};

export const widgetDict = {
  "Central Banner": {
    MedicalSearch,
    AcademicSearch
  }
};


