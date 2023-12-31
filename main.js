let array = [];

document.addEventListener("DOMContentLoaded", function () {
    randomizeArray(); // Initialize with a random array on page load
});

function randomizeArray() {
    array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
    visualizeBars();
}

function visualizeBars() {
    const barsContainer = document.getElementById("bars-container");
    const arrayValuesContainer = document.getElementById("array-values");

    barsContainer.innerHTML = "";
    arrayValuesContainer.innerHTML = "Array: [" + array.join(", ") + "]";

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value * 3}px`;
        barsContainer.appendChild(bar);
    });
}


function changeSize() {
    array = array.map(value => Math.floor(Math.random() * 100) + 1);
    visualizeBars();
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    visualizeBars();
    await delay(50);
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        const key = array[i];
        while (j >= 0 && array[j] > key) {
            await swap(j + 1, j);
            j--;
        }
        array[j + 1] = key;
    }
    visualizeBars();
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        await swap(i, minIndex);
    }
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

async function quickSort() {
    async function partition(low, high) {
        const pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                await swap(i, j);
            }
        }
        await swap(i + 1, high);
        return i + 1;
    }

    async function quickSortUtil(low, high) {
        if (low < high) {
            const pivotIndex = await partition(low, high);
            await Promise.all([
                quickSortUtil(low, pivotIndex - 1),
                quickSortUtil(pivotIndex + 1, high)
            ]);
        }
    }

    await quickSortUtil(0, array.length - 1);
}

async function mergeSort() {
    async function merge(l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const leftArray = array.slice(l, l + n1);
        const rightArray = array.slice(m + 1, m + 1 + n2);

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
            } else {
                array[k] = rightArray[j];
                j++;
            }
            k++;
            visualizeBars();
            await delay(50);
        }

        while (i < n1) {
            array[k] = leftArray[i];
            i++;
            k++;
            visualizeBars();
            await delay(50);
        }

        while (j < n2) {
            array[k] = rightArray[j];
            j++;
            k++;
            visualizeBars();
            await delay(50);
        }
    }

    async function mergeSortUtil(l, r) {
        if (l < r) {
            const m = Math.floor((l + r) / 2);
            await Promise.all([
                mergeSortUtil(l, m),
                mergeSortUtil(m + 1, r),
                merge(l, m, r)
            ]);
        }
    }

    await mergeSortUtil(0, array.length - 1);
}

async function shellSort() {
    const n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                await delay(50);
                j -= gap;
            }
            array[j] = temp;
            visualizeBars();
        }
    }
}
