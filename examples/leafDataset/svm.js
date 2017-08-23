const SVM = require('libsvm-js/asm');
const csv = require('csvtojson');

let options = {
    kernel : SVM.KERNEL_TYPES.POLYNOMIAL,
    degree : 3
}

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

svm = new SVM(options);

let seperationSize;
let data = [], X = [], y = [];
let trainingSetX = [], trainingSetY = [], testSetX = [], testSetY = [];

csv({noheader: true, headers: names})
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        data.push(jsonObj); // Push each object to data Array
    })
    .on('done', (error) => {
        seperationSize = 0.9 * data.length;
        data = shuffleArray(data);
        dressData();
    });

function dressData() {
    let types = new Set(); // To gather UNIQUE classes
    data.forEach((row) => {
        types.add(row.type);
    });
    typesArray = [...types]; // To save the different types of classes.

    data.forEach((row) => {
        let rowArray, typeNumber;
        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(2, 16); // We don't use the 2 first elements, which are the type (i.e class) and the specimen number (i.e ID)
        typeNumber = typesArray.indexOf(row.type); // Convert type(String) to type(Number)

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(0, seperationSize);
    trainingSetY = y.slice(0, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}

function train() {
    svm.train(trainingSetX, trainingSetY);
    test();
}

function test() {
    const result = svm.predict(testSetX);
    const testSetLength = testSetX.length
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
}

function error(predicted, expected) {
    let misclassifications = 0;
    for (var index = 0; index < predicted.length; index++) {
        console.log(`truth : ${expected[index]} and prediction : ${predicted[index]}`);
        if (predicted[index] !== expected[index]) {
            misclassifications++;
        }
    }
    return misclassifications;
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
