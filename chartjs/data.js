var plugin = { stacked100: { enable: true}
};


var ctx = document.getElementById('FreeDownloads').getContext('2d');
var stackedBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
                label: '2015',
                data: [0, 0, 0, 0, 0, 0, 0, 191, 101, 303, 347, 214],
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: '2016',
                data: [223, 180, 193, 206, 225, 205, 233, 163, 203, 364, 502, 479],
                backgroundColor: 'rgba(255,206,86,1)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1
            },
            {
                label: '2017',
                data: [603, 561, 566, 530, 749, 781, 965, 837, 813, 941, 1019, 1009],
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: '2018',
                data: [849, 697, 764, 566, 498, 401, 322, 364, 339, 343, 349, 337],
                backgroundColor: 'rgba(54,162,235,1)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1
            },
            {
                label: '2019',
                data: [110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(153,102,255,1)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Free Downloads'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx = document.getElementById('Sales2017').getContext('2d');
var stackedBar = new Chart(ctx, {
    plugins: [plugin],
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
                label: 'RockStudio',
                data: [0, 0, 0, 6, 9, 8, 24, 16, 9, 5, 10, 10],
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: 'Doors+',
                data: [0, 0, 0, 0, 0, 0, 4, 6, 4, 5, 3, 12],
                backgroundColor: 'rgba(255,206,86,1)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Sales 2017'
        },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    max: 100,
                },
            }],
            xAxes: [{
                stacked: true
            }]
        }
    }
});

var ctx = document.getElementById('Sales2018').getContext('2d');
var stackedBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
                label: 'RockStudio',
                data: [4, 4, 6, 4, 2, 7, 7, 5, 5, 3, 4, 4],
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: 'Doors+',
                data: [4, 8, 7, 6, 4, 9, 2, 6, 6, 17, 17],
                backgroundColor: 'rgba(255,206,86,1)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Sales 2018'
        },


        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true
                },
            }],
            xAxes: [{
                stacked: true
            }]
        }
    },
    plugins: {
        stacked100: {
            enable: true
        }
    },
});