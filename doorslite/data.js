google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Months', '2015', '2016', '2017','2018','2019'],
          ['January', 0, 223, 603,849,19],
          ['February', 0, 180, 561,697,0],
          ['March', 0, 193, 566,764,0],
          ['April', 0, 206, 530,566,0],
          ['March', 0, 225, 749,498,0],
          ['June', 0, 205, 781,401,0],
          ['July', 0, 233, 965,322,0],
          ['August', 191, 163, 837,364,0],
          ['September', 101, 203, 813,339,0],
          ['October', 303, 364, 941,343,0],
          ['November', 347, 502, 1019,349,0],
          ['December', 214, 479, 1009,337,0]
        ]);

        var options = {
          chart: {
            title: 'Monthly Downloads',
            subtitle: 'Monthly downloads of Doors+ Lite from 2015-present.',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }