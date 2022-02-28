
// array of 100 numbers
var bar = [];
var array = [];
function myRandomInts(quantity, max){
  while(array.length < quantity){
    var candidateInt = Math.floor(Math.random() * max) + 1;
    array.push(candidateInt);
  }
}
// myRandomInts(100, 100);

// var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx,{
//   type: "bar",
//   data: {
//     labels: array,
//     datasets: [{
//       backgroundColor: "black",
//       data: array
//     }]
//   },
//   options: {
//     legend: {display: false},
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }],
//     }
//   }
// });



//functions
const makeBars = (no_of_bar)=>{
	myRandomInts(no_of_bar, 200);
	for(x=0; x<no_of_bar;x++) {
    bar[x] = document.createElement('div');
    bar[x].className = "barDesign";
    h = array[x] + "px";
    bar[x].style.height = h;
    document.getElementById('myChart').appendChild(bar[x]);
	}
}
makeBars(100);

const removeBars = ()=>{
	var barsToRemove = document.getElementById("myChart").getElementsByClassName('barDesign');
	for(var i=barsToRemove.length-1;i >= 0;i--){
        var barNode = barsToRemove[i];
        barNode.parentNode.removeChild(barNode);
    }
    array = [];
}

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

function swap(bar, xp, yp)
{
    // console.log(bar[xp].style.height,"---",bar[yp].style.height);
    var temp = bar[xp].style.height;
    bar[xp].style.height = bar[yp].style.height;
    bar[yp].style.height = temp;
    // console.log(bar[xp].style.height,"---",bar[yp].style.height);
}

async function bubbleSort(bar, n,speed){
    var i, j;
    for (i = 0; i < n - 1; i++) 
    {
        var swapped = false;
        for (j = 0; j < n - i - 1; j++) 
        {
            bar[j].style.background="red";
            bar[j+1].style.background="red";
            if (parseInt(bar[j].style.height) > parseInt(bar[j + 1].style.height))
                {
                    swap(bar,j,j+1);
                    swapped = true;
                }
            await waitforme(speed);
            bar[j].style.background="black";
            bar[j+1].style.background="black";       
        }
        if (swapped == false)
                break;
    }
}

async function selectionSort(bar, n, speed){
    for(var i=0;i<n-1;i++)
    {
        min = i;
        for(var j=i+1;j<n;j++)
        {
            bar[i].style.background="red";
            bar[j].style.background="red";
            if(parseInt(bar[min].style.height) > parseInt(bar[j].style.height))
            {
                min = j;
            }
            await waitforme(speed);
            bar[i].style.background="black";
            bar[j].style.background="black"; 
        }
        swap(bar,i,min);
    }
}

function merge(bar, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = parseInt(bar[l + i].style.height);
    for (var j = 0; j < n2; j++)
        R[j] = parseInt(bar[m + 1 + j].style.height);
  
    var i = 0, j = 0, k = 0;
    while (i < n1 && j < n2) {
        bar[l + i].style.background = "red";
        bar[m + 1 + j].style.background = "red";
        if (L[i] <= R[j]) {
            bar[k].style.height = L[i] + "px";
            i++;
        }
        else {
            bar[k].style.height = R[j] + "px";
            j++;
        }
        k++;
    }

    while (i < n1) {
        bar[k].style.height = L[i] + "px";
        i++;
        k++;
    }
  
    while (j < n2) {
        bar[k].style.height = R[j] + "px";
        j++;
        k++;
    }
}

function mergeSort(bar,l,r){
    if(l>=r)
        return;
    else{
        var m =l+ parseInt((r-l)/2);
        mergeSort(bar,l,m);
        mergeSort(bar,m+1,r);
        merge(bar,l,m,r);
    }
}

//quickSort
function partition(bar, low, high) {
    let pivot = bar[high].style.height;
    
    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++) {
        bar[high].style.background = "red";
        bar[j].style.background = "red";
        if (parseInt(bar[j].style.height) < parseInt(pivot)) {
            i++;
            swap(bar, i, j);
        }
        // await waitforme(5);
        // bar[high].style.background="black";
        // bar[j].style.background="black";
    }
    swap(bar, i + 1, high);
    return (i + 1);
}

function quickSort(bar, low, high) {
    if (low < high) {
        let pi = partition(bar, low, high);
        quickSort(bar, low, pi - 1);
        quickSort(bar, pi + 1, high);
    }
}

//insertion  Sort
function insertionSort(bar, n) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        bar[i].style.background="red";
        key = bar[i].style.height; 
        j = i - 1; 
        while (j >= 0 && parseInt(bar[j].style.height) > parseInt(key))
        { 
            bar[j + 1].style.height = bar[j].style.height; 
            j = j--; 
        } 
        bar[j + 1] = key; 
    } 
}

//Listen events

var no_of_bar;
document.querySelector("#arr_sz").addEventListener("input", ()=>{
    no_of_bar=document.querySelector("#arr_sz").value;
    removeBars();
    makeBars(no_of_bar);
})

var speed;
document.querySelector("#speed").addEventListener("input", ()=>{
    speed=document.querySelector("#speed").value;
})

document.getElementById("newArray").addEventListener("click", ()=>{
    removeBars();
    makeBars(no_of_bar);
})

document.getElementById("bubbleSort").addEventListener("click", ()=>{
	bubbleSort(bar, no_of_bar, speed);
})

document.getElementById("selectionSort").addEventListener("click", ()=>{
    selectionSort(bar, no_of_bar, speed);
})

document.getElementById("mergeSort").addEventListener("click", ()=>{
    mergeSort(bar, 0, no_of_bar-1);
})

document.getElementById("quickSort").addEventListener("click", ()=>{
    quickSort(bar, 0, no_of_bar-1);
})

document.getElementById("insertionSort").addEventListener("click", ()=>{
    insertionSort(bar, no_of_bar);
})