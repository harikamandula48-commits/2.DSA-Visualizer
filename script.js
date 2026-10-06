let array = [];
let isRunning = false;

const container = document.getElementById("array-container");
const statusText = document.getElementById("status");
const algorithmText = document.getElementById("currentAlgorithm");

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


// Generate random array
function generateArray() {
    if (isRunning) return;

    array = [];

    for (let i = 0; i < 25; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }

    displayArray();
    statusText.textContent = "Ready";
}


// Display array
function displayArray() {
    container.innerHTML = "";

    const maxValue = Math.max(...array);

    array.forEach((value, index) => {
        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height =
            `${(value / maxValue) * 90}%`;

        bar.textContent = value;
        bar.dataset.index = index;

        container.appendChild(bar);
    });
}


// Get all bars
function getBars() {
    return document.querySelectorAll(".bar");
}


// Update one bar
function updateBar(index, className) {
    const bars = getBars();

    bars[index].className = "bar";

    if (className) {
        bars[index].classList.add(className);
    }
}


// Start selected algorithm
async function startAlgorithm() {

    if (isRunning) return;

    const algorithm =
        document.getElementById("algorithm").value;

    algorithmText.textContent =
        document.getElementById("algorithm")
            .options[
                document.getElementById("algorithm").selectedIndex
            ].text;

    isRunning = true;
    statusText.textContent = "Running...";

    if (algorithm === "bubble") {
        await bubbleSort();
    }

    else if (algorithm === "selection") {
        await selectionSort();
    }

    else if (algorithm === "insertion") {
        await insertionSort();
    }

    else if (algorithm === "linear") {
        await linearSearch();
    }

    else if (algorithm === "binary") {
        await binarySearch();
    }

    isRunning = false;
}


// -------------------------
// Bubble Sort
// -------------------------

async function bubbleSort() {

    let n = array.length;

    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            updateBar(j, "compare");
            updateBar(j + 1, "compare");

            await sleep(150);

            if (array[j] > array[j + 1]) {

                [array[j], array[j + 1]] =
                    [array[j + 1], array[j]];

                displayArray();

                updateBar(j, "swap");
                updateBar(j + 1, "swap");

                await sleep(150);
            }
        }

        updateBar(n - i - 1, "sorted");
    }

    statusText.textContent = "Sorting completed!";
}


// -------------------------
// Selection Sort
// -------------------------

async function selectionSort() {

    let n = array.length;

    for (let i = 0; i < n; i++) {

        let minIndex = i;

        updateBar(i, "compare");

        for (let j = i + 1; j < n; j++) {

            updateBar(j, "compare");

            await sleep(100);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            updateBar(j, "");
        }

        if (minIndex !== i) {

            [array[i], array[minIndex]] =
                [array[minIndex], array[i]];

            displayArray();

            updateBar(i, "swap");
            updateBar(minIndex, "swap");

            await sleep(200);
        }

        updateBar(i, "sorted");
    }

    statusText.textContent = "Sorting completed!";
}


// -------------------------
// Insertion Sort
// -------------------------

async function insertionSort() {

    for (let i = 1; i < array.length; i++) {

        let key = array[i];
        let j = i - 1;

        updateBar(i, "compare");

        await sleep(150);

        while (j >= 0 && array[j] > key) {

            array[j + 1] = array[j];

            displayArray();

            updateBar(j, "swap");

            await sleep(150);

            j--;
        }

        array[j + 1] = key;

        displayArray();
    }

    for (let i = 0; i < array.length; i++) {
        updateBar(i, "sorted");
    }

    statusText.textContent = "Sorting completed!";
}


// -------------------------
// Linear Search
// -------------------------

async function linearSearch() {

    const value =
        Number(document.getElementById("searchValue").value);

    if (!value) {
        alert("Enter a value to search.");
        return;
    }

    for (let i = 0; i < array.length; i++) {

        updateBar(i, "compare");

        await sleep(250);

        if (array[i] === value) {

            updateBar(i, "found");

            statusText.textContent =
                `Found ${value} at index ${i}`;

            return;
        }

        updateBar(i, "");
    }

    statusText.textContent =
        `${value} was not found.`;
}


// -------------------------
// Binary Search
// -------------------------

async function binarySearch() {

    const value =
        Number(document.getElementById("searchValue").value);

    if (!value) {
        alert("Enter a value to search.");
        return;
    }

    // Binary search requires sorted data
    array.sort((a, b) => a - b);

    displayArray();

    await sleep(500);

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {

        let mid =
            Math.floor((left + right) / 2);

        updateBar(mid, "compare");

        await sleep(500);

        if (array[mid] === value) {

            updateBar(mid, "found");

            statusText.textContent =
                `Found ${value} at index ${mid}`;

            return;
        }

        updateBar(mid, "");

        if (array[mid] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    statusText.textContent =
        `${value} was not found.`;
}


// Generate initial array
generateArray();
