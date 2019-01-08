import React from 'react'
import { observer } from 'mobx-react'
import StatsCard from '../dashboard/StatsCard'

@observer
export default class StatsPanel extends React.Component {
  constructor(props) {
    super(props)

    this.chart = null
  }
  componentDidMount() {
    let chart = new ApexCharts(
      this.chart,
      options
    );

    chart.render()
  }

  render() {
    const { stats = [], title, onGetData, dateInput } = this.props
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <form className="form-inline">
                  {dateInput}
                  <a className="btn btn-primary ml-2" onClick={onGetData}>
                    <i className="mdi mdi-autorenew" />
                  </a>
                </form>
              </div>
              <h4 className="page-title">{title}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-5">
            <div className="row">
              <div className="col-lg-6">
                <StatsCard {...stats[0]} icon={'desktop-classic'} />
              </div>
              <div className="col-lg-6">
                <StatsCard {...stats[1]} icon={'cart-plus'} />
              </div>
              <div className="col-lg-6">
                <StatsCard {...stats[2]} icon={'currency-usd'} />
              </div>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="card">
              <div className="card-body">
                <h4 className="header-title mb-4">Stacked Area</h4>
                <div ref={c => this.chart = c} className="apex-charts" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const options = {
  chart: {
    height: 250,
    type: 'area',
    stacked: true,
    scroller: {
      enabled: true
    },
    events: {
      selection: function (chart, e) {
        console.log(new Date(e.xaxis.min))
      }
    },

  },
  colors: ['#727cf5', '#0acf97', '#e3eaef'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  series: [{
    name: 'BCA',
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 60
    })
  },
    {
      name: '만다리',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 20
      })
    },

    {
      name: '합계',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
        min: 10,
        max: 15
      })
    }
  ],
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.6,
      opacityTo: 0.8,
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  xaxis: {
    type: 'datetime'
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.2
    },
    borderColor: '#f1f3fa'
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: false
        }
      }
    }
  }]
}

function generateDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = baseval;
    let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
