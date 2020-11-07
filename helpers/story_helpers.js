function createStoryLine(selectedStoryPlot, plots) {
    let currentOption = plots;

    const story = selectedStoryPlot.reduce((text, selectedOption) => {
        if (currentOption.options) {
            const option = currentOption.options.find(
                (option) => option.id === selectedOption.value
            );
            text += ' ' + option.text;
            if (option.text2) {
                text += ' ' + option.text2;
            }

            if (option.endline) {
                text += ' ' + option.endline;
            }

            currentOption = option;
            return text;
        }

        return text;
    }, '');

    return `${plots.text}  ${story}`;
}

function getCurrentStoryStep(selectedStoryPlot, plots) {
    let currentOption = plots;

    if (selectedStoryPlot && selectedStoryPlot.length) {
        const op = selectedStoryPlot.reduce((finalOption, step) => {
            const option = currentOption.options.find((option) => option.character === step);
            currentOption = option;
            return option;
        }, {});

        return op;
    }

    return plots;
}

export { getCurrentStoryStep, createStoryLine };
