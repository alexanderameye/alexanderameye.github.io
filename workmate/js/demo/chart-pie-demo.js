// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("voteResults");


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: true,
            position: "left"
        },
        cutoutPercentage: 80,
    },

});


var a = document.getElementById("questionTitles");
a.onchange = function() {
    $.getJSON("https://studev.groept.be/api/a18_sd308/GetVoteResults/" + a.options[a.selectedIndex].value + "/.php", function(data) {
        myPieChart.data.labels = [];
        myPieChart.data.datasets[0].data = [];
        myPieChart.update();

        for (var i = 0; i < data.length; i++) {
            addData(myPieChart, data[i]["text"], data[i]["COUNT(text)"]);
        }
    });
}

function showFirstResult() {
    var a = document.getElementById("questionTitles");
    $.getJSON("https://studev.groept.be/api/a18_sd308/GetVoteResults/" + a.options[0].value + "/.php", function(data) {
        myPieChart.data.labels = [];
        myPieChart.data.datasets[0].data = [];
        myPieChart.update();

        for (var i = 0; i < data.length; i++) {
            addData(myPieChart, data[i]["text"], data[i]["COUNT(text)"]);
        }
    });
}