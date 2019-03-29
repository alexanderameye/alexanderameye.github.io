google.charts.load('current', {'packages':['bar']});
google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(freeDownloads);
      google.charts.setOnLoadCallback(assetSales2017);
      google.charts.setOnLoadCallback(assetSales2018);
      google.charts.setOnLoadCallback(assetSales2019);
      google.charts.setOnLoadCallback(overallSales);

      function freeDownloads() {
        var data = google.visualization.arrayToDataTable([
          ['Months', '2015', '2016', '2017','2018','2019'],
          ['January', 0, 223, 603,849,110],
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
            title: 'Doors+ Lite',
            subtitle: 'Monthly downloads of Doors+ Lite from 2015-present.\nNumber of reviews: 113\nNumber of written reviews: 44',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

      function assetSales2017()
      {
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Doors+ Pro', 'RockStudio', { role: 'annotation' } ],
          ['January', 0, 0, ''],
          ['February', 0, 0, ''],
          ['March', 0, 0, ''],
          ['April', 0, 6, ''],
          ['May', 0, 9, ''],
          ['June', 0, 8, ''],
          ['July', 4, 24, ''],
          ['August', 6, 16, ''],
          ['September', 4, 9, ''],
          ['October', 5, 5, ''],
          ['November', 3, 10, ''],
          ['December', 12, 10, ''],
        ]);

       var options = {
          title: 'Asset sales 2017',
          isStacked:'percent'	  
       };  

       var chart = new google.visualization.ColumnChart(document.getElementById('assetSales2017'));
       chart.draw(data, google.charts.Bar.convertOptions(options));
      }

      function assetSales2018()
      {

        var data = google.visualization.arrayToDataTable([
          ['Month', 'Doors+ Pro', 'RockStudio', { role: 'annotation' } ],
          ['January', 4, 4, ''],
          ['February', 8, 4, ''],
          ['March', 7, 6, ''],
          ['April', 6, 4, ''],
          ['May', 4, 2, ''],
          ['June', 9, 7, ''],
          ['July', 2, 7, ''],
          ['August', 6, 5, ''],
          ['September', 6, 5, ''],
          ['October', 6, 3, ''],
          ['November', 17, 4, ''],
          ['December', 17, 4, '']
        ]);

       var options = {
          title: 'Asset sales 2018',
          stacked: 'true'	  ,
          isStacked: 'percent'
       };  

       var chart = new google.visualization.ColumnChart(document.getElementById('assetSales2018'));
       chart.draw(data, options);
      }

      function assetSales2019()
      {

        var data = google.visualization.arrayToDataTable([
          ['Month', 'Doors+ Pro', 'RockStudio', { role: 'annotation' } ],
          ['January', 5, 2, ''],
          ['February', 6, 4, ''],
          ['March', 7, 6, ''],
          ['April', 0, 0, ''],
          ['May', 0, 0, ''],
          ['June', 0, 0, ''],
          ['July', 0, 0, ''],
          ['August', 0, 0, ''],
          ['September', 0, 0, ''],
          ['October', 0, 0, ''],
          ['November', 0, 0, ''],
          ['December', 0, 0, '']
        ]);

       var options = {
          title: 'Asset sales 2019',
          isStacked:'percent'	  
       };  

       var chart = new google.visualization.ColumnChart(document.getElementById('assetSales2019'));
       chart.draw(data, google.charts.Bar.convertOptions(options));
      }


      function overallSales()
      {

          var data = google.visualization.arrayToDataTable([
            ['Asset', 'Total Sales'],
            ['Doors+',    126],
            ['RockStudio',      152],
          ]);
  
          var options = {
            title: 'Overall Sales'
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('overallSales'));
  
          chart.draw(data, options);
        
      }