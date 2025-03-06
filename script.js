

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const searchSteps = document.getElementById("search-steps");
const searchStepsHead = document.getElementById("search-steps-head");
let arr = [10, 30, 20, 40, 50]; // Sample array

function drawArray(highlightIndex = -1, foundIndex = -1, low = -1, high = -1, mid = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let barWidth = Math.max(40, 600 / arr.length - 10);
    let gap = 10;
    canvas.width = arr.length * (barWidth + gap) + 40; // Adjust canvas width dynamically
    
    arr.forEach((value, i) => {
        let x = i * (barWidth + gap) + 20;
        let y = canvas.height - value * 4; // Scale for better visibility
        
        if (i === foundIndex) {
            ctx.fillStyle = "green"; // Found
        } else if (i === mid) {
            ctx.fillStyle = "yellow"; // Mid
        } else if (i === low) {
            ctx.fillStyle = "red"; // Low
        } else if (i === high) {
            ctx.fillStyle = "purple"; // High
        } else if (i === highlightIndex) {
            ctx.fillStyle = "orange"; // Checking element in linear search
        } else {
            ctx.fillStyle = "blue";
        }
        
        ctx.fillRect(x, y, barWidth, value * 4);
        
        ctx.fillStyle = "white";
        ctx.fillText(value, x + barWidth / 2 - 10, y - 5);
        ctx.fillText(i, x + barWidth / 2 - 5, canvas.height - 5);
    });
}

function insertValue() {
    let index = parseInt(document.getElementById("index").value);
    let value = parseInt(document.getElementById("value").value);
    if (isNaN(index) || isNaN(value) || index < 0 || index > arr.length) return;
    if (value > 100) {
        alert("Maximum value allowed is 100!");
        return;
    }
    arr.splice(index, 0, value);
    drawArray();
}

function deleteValue() {
    let index = parseInt(document.getElementById("index").value);
    if (isNaN(index) || index < 0 || index >= arr.length) return;
    arr.splice(index, 1);
    drawArray();
}

function generateRandomArray() {
    arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    drawArray();
}

function sortArray() {
    arr.sort((a, b) => a - b);
    drawArray();
}

async function linearSearch() {
    searchSteps.innerText ='';
    let value = parseInt(document.getElementById("searchValue").value);
    if (isNaN(value)) return;
    searchStepsHead.innerText = "Starting Linear Search...\n";
    
    for (let i = 0; i < arr.length; i++) {
        searchSteps.innerText += `Checking index ${i}\n`;
        drawArray(i);
        await new Promise(resolve => setTimeout(resolve, 800)); // Slower delay for visualization
        if (arr[i] === value) {
            drawArray(-1, i);
            searchSteps.innerText += `Found ${value} at index ${i}`;
            return;
        }
    }
    searchSteps.innerText += `${value} not found`;
    searchStepsHead.innerText = "Linear Search\n";
    drawArray();
}

async function binarySearch() {
    searchSteps.innerText ='';
    let value = parseInt(document.getElementById("searchValue").value);
    if (isNaN(value)) return;
    
    let isSorted = arr.every((val, i, a) => i === 0 || a[i - 1] <= val);
    if (!isSorted) {
        alert("Array is not sorted! Sort it before performing binary search.");
        return;
    }
    
    let left = 0, right = arr.length - 1;
    searchStepsHead.innerText = "Starting Binary Search...\n";
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        searchSteps.innerText += `Low: ${left}, Mid: ${mid}, High: ${right}\n`;
        drawArray(-1, -1, left, right, mid);
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Slower delay for better visibility
        
        if (arr[mid] === value) {
            drawArray(-1, mid);
            searchSteps.innerText += `Found ${value} at index ${mid}`;
            return;
        } else if (arr[mid] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    searchSteps.innerText += `${value} not found`;
    drawArray();
    searchStepsHead.innerText = "Binary Search\n";
}

drawArray();