// here are the baseValues
const baseValues = [
    {
        value: 12,
        key: "1",
    },
    {
        value: 24,
        key: "2",
    },
    {
        value: 1,
        key: "3",
    },
];

// the function to compare the values and sort them
const comparaisonFunction = (a, b) => {
    return a.value - b.value;
};

// the sorted values
const sortedValues = baseValues.sort(comparaisonFunction);

// the rendered values
const renderedValues = <>{sortedValues.map()}</>;
