Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

    Chart.defaults.global.defaultFontColor = '#292b2c';

    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"],
        datasets: [{
          label: "Revenue",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: [37.5, 36, 35.8, 30, 27, 25, 23, 28],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });

    // Configure Pusher instance
    const pusher = new Pusher('f3be0fb04eaaef0a6696', {
        cluster: 'us2',
        encrypted: true
    });

    // Subscribe to poll trigger
    var orderChannel = pusher.subscribe('order');

    // Listen to 'order placed' event
    var order = document.getElementById('order-count')
    orderChannel.bind('place', function(data) {
      myLineChart.data.datasets.forEach((dataset) => {
          dataset.data.fill(parseInt(data.units),-1);
      });
      myLineChart.update();
      order.innerText = parseInt(order.innerText)+1
    });