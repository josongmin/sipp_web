import React from 'react'
import { action, observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import StatsCard from '../dashboard/StatsCard'
import './StatsPanel.css'

const graphType = {
  'graph_amount': {
    color: '#727cf5'
  }
}

@observer
export default class StatsPanel extends React.Component {
  @observable graphType
  @observable series
  constructor(props) {
    super(props)

    this.chart = null
    this.graphType = 'graph_amount'
  }
  componentDidMount() {
    this.reaction = reaction(
      () => this.graphType,
      (graphType) => {
        this.chartRender(graphType)
      }
    )
  }

  componentDidUpdate(prevProps) {
    if(prevProps.graphs !== this.props.graphs) {
      this.chartRender()
    }
  }

  componentWillUnmount() {
    this.reaction()
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
                    <i className="mdi mdi-autorenew" style={{ color: '#fff' }} />
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
                <div className="text-right" style={{}}>
                  <button type="button" className={`btn btn-${this.graphType === 'graph_amount' ? '' : 'outline-'}info btn-sm mr-1 statsBtn`} onClick={this.handleClickButton.bind(this, 'graph_amount')}>거래금액</button>
                  <button type="button" className={`btn btn-${this.graphType === 'graph_trx' ? '' : 'outline-'}success btn-sm statsBtn`} onClick={this.handleClickButton.bind(this, 'graph_trx')}>거래건수</button>
                </div>
                <div ref={c => this.chart = c} className="apex-charts" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  @action.bound
  handleClickButton(type) {
    this.graphType = type
  }

  chartRender(graphType = this.graphType) {
    const [graph_trx, graph_amount] = this.props.graphs
    let data = graphType === 'graph_trx' ? graph_trx : graph_amount
    const { graph_items } = data
    options.series = graph_items.map(({name, values}) => {
      return {
        name,
        data: values.map(value => [parseInt(value[0]), value[1]])
      }
    })

    if(this.props.title === 'DAILY') {
      options.tooltip = {
        x: {
          show: true,
          format: 'dd/MM/yyyy HH:mm',
          formatter: undefined,
        }
      }
    } else {
      options.tooltip = {
        x: {
          show: true,
          format: 'dd/MM/yyyy',
          formatter: undefined,
        }
      }
    }
    let chart = new ApexCharts(
      this.chart,
      options
    )

    chart.render()
  }
}

const options = {
  chart: {
    height: 321,
    type: 'area',
    stacked: true,
    scroller: {
      enabled: true
    },
    events: {
      selection: (chart, e) => {
        console.log(new Date(e.xaxis.min))
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 400,
      animateGradually: {
        enabled: true,
        delay: 100
      },
      dynamicAnimation: {
        enabled: true,
        speed: 100
      }
    },
  },
  colors: ['#9688d8', '#76cb98', '#db657c', '#6e747c', '#6eacce', '#edbc2e'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
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
    type: 'datetime',
    tooltip: {
      enabled: false
    }
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
