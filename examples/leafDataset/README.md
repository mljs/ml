Introduction to classification with mljs
========================================

This tutorial will solve a problem of Machine Learning called classification. Classification is the problem of identifying to which of a set of categories a new observation belongs ([Wikipedia](https://en.wikipedia.org/wiki/Statistical_classification)).

We will use methods of supervised learning. Supervised learning is the machine learnin task of inferring a function fom labeled training data. What it means is that we will use data with labels to train our models, and next we will try to predict the labels of other data (called test data).

We will use functions from ML.JS (https://github.com/mljs). We will try 4 different methods : SVM, KNN, Logistic regression and naive bayes.

Dataset
=======

We have to work with data, so I've chosen a dataset among UCI Machine Learning repository. We will try to define the type of leafs thanks to their features.

Dataset used : https://archive.ics.uci.edu/ml/datasets/Leaf


In this dataset, we have 340 data, with 16 features each. The first feature is the class (i.e the type of the leaf, i.e the label). The goal of the classification is to determine the class of a given leaf thanks to the 15 others features of this leaf.

On the previous link, you can find the description of each feature. These features are float or number.

Note :
One of the difficulties of this dataset is that we haven't a lot of data.


Installation :
==============

```
npm install libsvm-js ml-naivebayes ml-knn ml-logistic-regression csvtojson 
```

First step :
============

The first step will be to load the dataset and to delete the useless feature. Indeed, the second feature is useless, because it's just created to identify a data. We will use the package csvtojson to import and manipulate the data.

The data are in a csv file without header. Here is how to import it :

```javascript
const csv = require('csvtojson');

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

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

}
``` 

We store the whole dataset in the variable X (and the labels in the variable y), and then we have split them into training set and test set. At the end of this tutorial, I will show you a method called cross-validation which replaces this random splitting. Indeed, the splitting between training and test sets is random. That's why if you run many times the script, results will be different because the separation between training set and test set will be different.

Second step - Configuration of the model :
==========================================

We will try four different methods : the SVM classifier, the KNN classifier, the logistic regression and the naive bayes classifier.

SVM
---

Here is the source code of the instanciation of the model SVM :

```javascript
const SVM = require('libsvm-js/asm');

let options = {
    kernel : SVM.KERNEL_TYPES.POLYNOMIAL,
    degree : 3
}

svm = new SVM(options);
```

The parameters of the SVM are very important. Results depends a lot of these parameters. There are three Kernels often used : The linear kernel, the polynomial kernel and the RBF kernel. The main parameter of the polynomial kernel is the degree, and the main parameters of the RBF kernel are gamma and the cost.

Bayes
-----
```javascript
const Bayes = require('ml-naivebayes');

bayes = new Bayes();
```

Note : We don't need to give parameters to the naive bayes classifier. It's easier to use than the others classifiers ! However, we can't use always this classifier.

KNN
---

Here is the line which instanciate the KNN :

```javascript
knn = new KNN(trainingSetX, trainingSetY, {k:5});
```

The implementation of the KNN is different from the others because we need to give the training set when we instanciate a KNN classifier. The parameter k is very important for the accuracy of the model.


Logistic Regression
-------------------

We need to use the type Matrix to use the logistic regression (instead of the Array 1D or 2D). That's why we need the package ml-matrix.
```javascript
const LogisticRegression = require('ml-logistic-regression');
const {Matrix} = require('ml-matrix');

let logreg = new LogisticRegression({numSteps: 10000, learningRate: 5e-3});
```

The parameters of the logistic regression are important too. The higher the number of steps is, the slower the training will be.

Training and Evaluation :
=========================

We have our model. Now we can train it with the training data. I just write below the source code to train the models :

For the SVM :
```javascript
svm.train(trainingSetX, trainingSetY);
```

For the naive bayes :
```javascript
bayes.train(trainingSetX, trainingSetY);
```

For the KNN, the model is trained after the instanciation of the KNN-classifier, so we don't have the method *train*.

For the logistic regression, we use the matrix (I add the code which transforms the arrays into the type Matrix):
```javascript
trainingSetX = new Matrix(X.slice(0, seperationSize));
trainingSetY = Matrix.columnVector(y.slice(0, seperationSize));
testSetX = new Matrix(X.slice(seperationSize));
logreg.train(trainingSetX, trainingSetY);
```

Evaluation
-----------

When the model is trained, we can use it on the test set. We will predict the labels of these data and compare the predicted labels with the expected labels. Here is how we do that :

```javascript
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
```
We first predict the labels thanks to the model, and then we use the function error() to compare the predicted labels with the real labels (so the expected labels).

The script will display for each data from the test set the expected labels and the predicted labels.

The accuracy is the percentage of right predictions. We have the number of test data (let's call it N) and the number of misclassification (let's call it f), so the accucary is (f/N)*100 %.

Results :
=========
 
SVM
---
There are on average 7 or 8 errors on 34 predictions, so the accuracy is ~78%. (the result oscillate between 4 and 14, it depends of the splitting into the training and test sets)

Bayes
-----
The results are on average between 8 and 10 errors on 34 predictions, so accuracy between 70% and 76%. 

KNN 
---
With KNN (k=1), the result are on average between 11 and 15 errors, so accuracy between 60% and 70%.

Logistic Regression
-------------------
With 5000 steps and learning rate of 5e-3, we have between 9 and 11 errors on average, so accuracy between 68% and 75%. 

Conclusion :
============

This tutorial show an example of solving of a classification problem with SVM and naive bayes classifier. You can use a lot of others Machine Learning methods to solve this problem (random forests, neural networks...) and the parameters given to this SVM in my example are probably not the best, but the goal of this tutorial is only to let you see how to use ML.JS to solve classification problems (you can have better precision than 78%). The best accuracy with SVM will probably be with RBF, if you have a good couple of gamme/cost.

Source code :
=============

SVM
----
```javascript
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
```

KNN
----
```javascript
const KNN = require('ml-knn');
const csv = require('csvtojson');

let knn;

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

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
    knn = new KNN(trainingSetX, trainingSetY, {k:5});
    test();
}

function test() {
    const result = knn.predict(testSetX);
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
```

Naive bayes
-----------
```javascript
const Bayes = require('ml-naivebayes');
const csv = require('csvtojson');


bayes = new Bayes();

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

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
    bayes.train(trainingSetX, trainingSetY);
    test();
}

function test() {
    const result = bayes.predict(testSetX);
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
```

Logistic regression
--------------------
```javascript
const LogisticRegression = require('ml-logistic-regression');
const csv = require('csvtojson');
const {Matrix} = require('ml-matrix');


let logreg = new LogisticRegression({numSteps: 5000, learningRate: 5e-3});

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

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

    trainingSetX = new Matrix(X.slice(0, seperationSize));
    trainingSetY = Matrix.columnVector(y.slice(0, seperationSize));
    testSetX = new Matrix(X.slice(seperationSize));
    testSetY = y.slice(seperationSize);
    train();
}

function train() {
    logreg.train(trainingSetX, trainingSetY);
    test();
}

function test() {
    const result = logreg.predict(new Matrix(testSetX));
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
```

Bonus : dimensionality reduction
--------------------------------

Here, each data has 30 features. We can reduce the number of features of the dataset by using different algorithms (PCA, Isomap, etc.). The goal ? The fewer dimensions you will have, the faster the computation will be and if you reduce the dimensionality to 2 or 3, you can plot the data (it can be very practical).
I give you an example with the PCA. Below, the source code using a PCA :
```javascript
const KNN = require('ml-knn');
const csv = require('csvtojson');
const Matrix = require('ml-matrix');
const PCA = require('ml-pca');

let usePCA = true;

let knn;

const csvFilePath = 'leaf.csv'; // Data
const names = ['type', 'specimenNumber', 'eccentricity', 'aspectRatio', 'elongation', 'solidity', 'stochasticConvexity', 'isoperimetricFactor', 'maxIndetationDepth', 'lobedness', 'intensity', 'contrast', 'smoothness', 'thirdMoment', 'uniformity', 'entropy']; // For header

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
    if (usePCA === true) {
        trainingSetX = new Matrix(trainingSetX);
        testSetX = new Matrix(testSetX);
        var pca = new PCA(trainingSetX);
        trainingSetX = pca.predict(trainingSetX, 2);
        testSetX = pca.predict(testSetX, 2);
    }
    knn = new KNN(trainingSetX, trainingSetY, {k:5});
    test();
}

function test() {
    const result = knn.predict(testSetX);
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
```


Note :
======

Thanks to Abhishek Soni for the two tutorials https://hackernoon.com/machine-learning-with-javascript-part-1-9b97f3ed4fe5 and https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483. My code reuse parts of the second tutorial (which is the solving of a classification problem with the method of KNN).
