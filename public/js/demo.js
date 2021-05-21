//let ctx1 = document.getElementById('examChart1').getContext('2d');

let mydata;
let mydata1;
let onArr = [];
let totalSum = 0;
let offArr = [];
let noidle;
let nooff;
let noon;
let finalDate = getCurrentDate();
let timer;

document.getElementById("submit").addEventListener("click", function () {
    let selectdate = document.getElementById("datepicker").value.split("-");
    let formatted_date = [selectdate[2], selectdate[1], selectdate[0]].join(
        "."
    );
    finalDate = formatted_date;
    console.log(finalDate);
    deleteData();
    assignData();
    //closeModal1();
});

async function getChartData() {
    let isTrue = true;
    let url = isTrue ? "https://sms-med.herokuapp.com/api" : "/api";

    if (finalDate) {
        url += `?date=${finalDate}`;
    }
    console.log(url);
    const response = await fetch(url);
    return response.json();
}
async function getChartData1() {
    let isTrue = true;
    let url = isTrue
        ? "https://sms-med.herokuapp.com/api/dailydata"
        : "/api/dailydata";

    console.log(url);
    const response = await fetch(url);
    return response.json();
}
assignData();
assignData1();
async function assignData() {
    mydata = await getChartData(finalDate);

    console.log(mydata);
    const error = document.getElementById("error");
    if (mydata.length == 0) {
        error.textContent = `Data is not available for ${finalDate}. Please select a different date`;
        error.style.color = "red";
        error.style.fontSize = "25";
        console.log("Data not available. Please select a different date");
        deleteData();
        return;
    } else {
        error.textContent = "Displaying Datas for " + finalDate;
        error.style.color = "#5cb85c";
        error.style.fontSize = "25";
    }
    /*Chart.defaults.global.defaultFontFamily = 'Alegreya';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';
  Chart.defaults.global.defaultFontStyle = 'Bold';
*/
    mydata.forEach((data) => {
        let d = data.date.split(".");
        if (data.ontime && data.offtime) {
            let onData = `${d[1]} ${d[0]} ${d[2]} ${data.ontime}`;
            let offData = `${d[1]} ${d[0]} ${d[2]} ${data.offtime}`;
            onArr.push(onData);
            offArr.push(offData);
        } else {
            let onData = `${d[1]} ${d[0]} ${d[2]} ${data.ontime}`;
            console.log(onData);
            showDiff(onData);
        }
    });

    console.log(onArr);
    console.log(offArr);
    //ctx1.destroy();
    lineChart();
    barChart();
    pieChart();
}

async function assignData1() {
    mydata1 = await getChartData1(finalDate);
    console.log("yash...");
    console.log(mydata1);

    noidle = mydata1.idleDevice;
    noon = mydata1.onDevice;
    nooff = mydata1.offDevice;
    console.log("ooo");
    console.log(nooff);
}

function deleteData() {
    if (timer) {
        console.log(`BEFORE TIMER VALUE: ${timer}`);
        clearTimeout(timer);
        timer = null;
        console.log(`AFTER TIMER VALUE: ${timer}`);
    }
    let canvas1 = $("#linechart1")[0];
    canvas1.width = canvas1.width;
    let canvas2 = $("#examChart2")[0];
    canvas2.width = canvas2.width;
    onArr = [];
    offArr = [];
    mydata = {};
    totalSum = 0;
    $("#closing1").empty();
    $("#closing2").empty();
    $("#activediv").removeClass("active-area");
    $("#activediv").empty();
}

function getCurrentDate() {
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let dateObj = new Date();
    let monthString = monthNames[dateObj.getMonth()];
    let monthNo = monthNames.indexOf(monthString) + 1;
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = day + "." + monthNo + "." + year;
    return output;
}

function showDiff(formattedOn) {
    let onDate = new Date(formattedOn);
    let currDate = new Date();

    let diff = (currDate - onDate) / 1000;
    diff = Math.abs(Math.floor(diff));

    let days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    let hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;
    let min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;
    $("#activediv").empty();
    const active_div = document.getElementById("activediv");
    active_div.classList.add("active-area");
    const h3 = document.createElement("h3");
    h3.innerHTML =
        "The device has been active for " +
        days +
        " days " +
        hrs +
        " hours " +
        min +
        " minutes and " +
        leftSec +
        " seconds.";
    h3.classList.add("active-time");
    active_div.appendChild(h3);
    timer = setTimeout(() => {
        showDiff(onDate);
    }, 1000);
}

function pieChart() {
    let pieChart = document.getElementById("pieChart").getContext("2d");
    var myPieChart = new Chart(pieChart, {
        type: "pie",
        data: {
            datasets: [
                {
                    data: [
                        parseFloat(noon),
                        parseFloat(nooff),
                        parseFloat(noidle),
                    ],
                    backgroundColor: ["#16c79a", "#f3545d", "#fdaf4b"],
                    borderWidth: 0,
                },
            ],
            labels: ["On Devices", "Off Devices", "Idle Devices"],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: "bottom",
                labels: {
                    fontColor: "#111",
                },
            },
            pieceLabel: {
                render: "percentage",
                fontColor: "white",
                fontSize: 14,
            },
            tooltips: {
                enabled: true,
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                },
            },
        },
    });
}

function barChart() {
    const minuteGraph = [];
    for (let i = 0; i < onArr.length; i++) {
        const start = new Date(onArr[i]);
        const stop = new Date(offArr[i]);
        const data = Math.round((stop.getTime() - start.getTime()) / 1000 / 60);
        minuteGraph.push({
            startHour: start.getHours(),
            stopHour: stop.getHours(),
            duration: data,
        });
    }

    let time = 0;
    const finalArr = [];
    const labels = [];
    let start = parseInt(onArr[0].split(" ")[3].split(":")[0]);
    let stop = parseInt(onArr[onArr.length - 1].split(" ")[3].split(":")[0]);
    for (let i = start; i <= stop; i++) {
        minuteGraph
            .filter((data) => data.startHour === i)
            .forEach((data) => {
                console.log(data);
                time += data.duration;
            });
        console.log(time);
        finalArr.push(time);
        time = 0;
        let startLabel = getLabel(i);
        let stopLabel = getLabel(i + 1);
        labels.push(`${startLabel} - ${stopLabel}`);
    }
    finalArr.forEach((data) => {
        totalSum += data;
    });
    function getLabel(hr) {
        let label;
        console.log(hr);
        if (hr >= 12 && hr <= 23) {
            if (hr > 12) hr -= 12;
            label = `${hr} PM`;
        } else {
            label = `${hr} AM`;
        }
        return label;
    }
    console.log(labels);
    console.log(finalArr);

    let data = {
        labels: labels,
        datasets: [
            {
                label: "Time",
                data: finalArr,
                backgroundColor: "rgba(32,178,170,0.7)",
                borderWidth: 1,
            },
        ],
    };

    //options
    var options = {
        responsive: true,
        maintainAspectRatio: false,

        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16,
            },
        },

        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                    },
                },
            ],
        },
    };

    //create Chart class object
    let ctx2 = document.getElementById("examChart2").getContext("2d");
    let chart = new Chart(ctx2, {
        type: "bar",
        data: data,
        options: options,
    });
}

function lineChart() {
    console.log("hellooooo");
    const xOnData = chartData(onArr);
    const xOffData = chartData(offArr);
    console.log(xOnData);
    console.log(xOffData);

    function chartData(array) {
        const result = [];
        array.forEach((data, index) => {
            result.push({
                t: new Date(data),
                y: index + 1,
            });
        });
        return result;
    }
    console.log(xOnData);
    console.log(xOffData);

    let dataFirst = {
        label: "OnTime",
        //data: [0, 59, 75, 20, 20, 55, 40],
        data: xOnData,
        pointRadius: 5,
        fill: false,
        backgroundColor: "rgba(22, 165, 150, 1)",
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(255, 206, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)'

        borderColor: [
            "rgba(22, 165, 150,1)",
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
    };

    let dataSecond = {
        label: "OffTime",
        //data: [20, 15, 60, 60, 65, 30, 70],
        data: xOffData,
        pointRadius: 5,
        fill: false,
        backgroundColor: "rgba(240,84,84,1)",
        borderColor: [
            "rgba(240,84,84,1)",
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
    };

    let speedData = {
        datasets: [dataFirst, dataSecond],
    };

    let newchart = document.getElementById("linechart1").getContext("2d");
    //let newchart = document.getElementById('linechart1').getContext('2d');
    let myChart = new Chart(newchart, {
        type: "line",
        data: speedData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            stepSize: 5,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            precision: 0,
                        },
                    },
                ],
            },

            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#111",
                },
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                },
            },
            tooltips: {
                enabled: true,
            },
        },
    });
    //myChart.destroy();
    console.log("hellooooo");
}
/*
function loadLastDiv() {
  const closing_div1 = document.getElementById('closing1');
  const closing_div2 = document.getElementById('closing2');
  console.log('THE END!');
  //closing_div.classList.add("active");
  const last = document.createElement('h3');
  const last1 = document.createElement('h3');
  last.innerHTML = 'No. of active Instances : ';
  const h11 = document.createElement('h1');
  h11.classList.add('active-stat');
  h11.innerHTML = mydata.length;
  last1.innerHTML = 'Total no. of minutes : ';
  const h12 = document.createElement('h1');
  h12.classList.add('active-stat');
  h12.innerHTML = totalSum;
  closing_div1.append(last);
  closing_div2.append(last1);
  closing_div1.append(h11);
  closing_div2.append(h12);
}*/
