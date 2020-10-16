import { STEP_TYPE } from "../constants/story_constants";

function createStoryLine(selectedStoryPlot, plots) {
  let currentOption = plots;

  const story = selectedStoryPlot.reduce((text, selectedOption) => {
    if (selectedOption.type == STEP_TYPE.OPTIONS && currentOption.options) {
      const option = currentOption.options.find(
        (option) => option.id === selectedOption.value
      );
      text += " " + option.text;
      if (option.text2) {
        text += " " + option.text2;
      }

      if (option.endline) {
        text += " " + option.endline;
      }

      currentOption = option;
      return text;
    }
    if (selectedOption.type == STEP_TYPE.INPUT && currentOption.input) {
      const option = currentOption.input;
      text += " " + option.text;
      text += " " + selectedOption.value;

      currentOption = option;
      return text;
    }

    return text;
  }, "");

  return `${plots.text}  ${story}`;
}

function getCurrentStoryStep(selectedStoryPlot, plots) {
  let currentOption = plots;

  if (selectedStoryPlot && selectedStoryPlot.length) {
    const op = selectedStoryPlot.reduce((finalOption, step) => {
      const option = currentOption.options.find(
        (option) => option.id === step.value
      );
      currentOption = option;
      return option;
      return currentOption;
    }, {});

    return op;
  }

  return plots;
}

export { getCurrentStoryStep, createStoryLine };
