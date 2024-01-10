function matchData(mode, bHeight, bWidth) {
    const maxValue = 300;

    const generateArrayWithStep = (start, step) => {
        const result = [];
        for (let i = start; i <= maxValue; i += step) {
            result.push(i);
        }
        return result;
    }

    if (mode == '6 Inch') {
        const minValue = 6;
        const stepValue = 6;
        const generatedArray = generateArrayWithStep(minValue, stepValue);
        const height = generatedArray.find((item) => item >= bHeight);
        const width = generatedArray.find((item) => item >= bWidth);
        return {height: height, width: width}
    } else if (mode == '+1 Inch') {
        const height = parseFloat(bHeight) + 1;
        const width = parseFloat(bWidth) + 1;
        return {height: height, width: width}
    } else if (mode == '2 Inch') {
        const minValue = 2;
        const stepValue = 2;
        const generatedArray = generateArrayWithStep(minValue, stepValue);
        const height = generatedArray.find((item) => item >= bHeight);
        const width = generatedArray.find((item) => item >= bWidth);
        return {height: height, width: width}
    } else if (mode == '3 Inch') {
        const minValue = 3;
        const stepValue = 3;
        const generatedArray = generateArrayWithStep(minValue, stepValue);
        const height = generatedArray.find((item) => item >= bHeight);
        const width = generatedArray.find((item) => item >= bWidth);
        return {height: height, width: width}
    } else {
        let matchHeightData;
        let matchWidthData;
        if (parseFloat(bHeight) <= 18) {
            const minValue = 3;
            const stepValue = 3;
            matchHeightData = generateArrayWithStep(minValue, stepValue);
        } else {
            const minValue = 24;
            const stepValue = 6;
            matchHeightData = generateArrayWithStep(minValue, stepValue);
        }

        const height = matchHeightData.find((item) => item >= bHeight);

        if (parseFloat(bWidth) <= 18) {
            const minValue = 3;
            const stepValue = 3;
            matchWidthData = generateArrayWithStep(minValue, stepValue);
        } else {
            const minValue = 24;
            const stepValue = 6;
            matchWidthData = generateArrayWithStep(minValue, stepValue);
        }
        const width = matchWidthData.find((item) => item >= bWidth);
        return {height: height, width: width}
    }
}

export default matchData;