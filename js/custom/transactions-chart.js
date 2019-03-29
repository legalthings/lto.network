(function () {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Last month',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(0, 184, 216, 0.1)',
      borderColor: 'rgb(0, 184, 216)',
      borderWidth: 1
    }, {
      label: 'This month',
      data: [30, 33, 40, 20, 78, 1],
      backgroundColor: 'rgba(255,65,105,0.1)',
      borderColor: 'rgb(255,65,105)',
      borderWidth: 1
    }]
  };

  const style = document.createElement('style');
  style.innerHTML = `
  .transactions-chart {
    max-width: 500px;
    max-height: 400px;
    position: relative;
  }`;
  document.head.appendChild(style);

  const PERIOD_DAYS = 28;



  const OPTIONS = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }],
      yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Transactions'
          },
          ticks: {
            callback: function (value) {
                return numeral(value).format('0,0')
            }
        }
        }

      ]
    }
  };

  function stats(startdate, enddate) {
    const url = new URL('https://stats.lto.network/transactions');
    url.search = new URLSearchParams({
      granularity: 'day',
      startdate,
      enddate
    });
    return fetch(url).then(response => response.json());
  }

  async function getChartData() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const lastEndDate = new Date();
    const lastStartDate = new Date();
    lastStartDate.setDate(now.getDate() - PERIOD_DAYS);

    const prevEndDate = new Date();
    prevEndDate.setDate(now.getDate() - PERIOD_DAYS);
    const prevStartDate = new Date();
    prevStartDate.setDate(now.getDate() - PERIOD_DAYS * 2);

    const data = await Promise.all([stats(prevStartDate, prevEndDate), stats(lastStartDate, lastEndDate)])
    const chartData = {
      labels: Array(28).fill(undefined).map((_, i) => i + 1),
      datasets: data.map((statsResponse, index) => {
        const color = index === 0 ? 'rgba(255,65,105,0.5)' : 'rgba(0, 184, 216, 0.5)';
        return {
          type: 'bar',
          label: index === 0 ? 'Previous month' : `Current month`,
          data: statsResponse.map(stat => stat.transactions),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1
        }
      })
    };
    return chartData;
  }


  new Vue({
    el: 'transactions-chart',
    extends: VueChartJs.Bar,
    mounted: async function () {
      this.$el.classList.add('transactions-chart');
      const chartData = await getChartData();
      // debugger;
      this.renderChart(chartData, OPTIONS);
    }
  });
})();