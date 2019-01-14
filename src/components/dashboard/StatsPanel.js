import React from 'react'
import { action, observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import StatsCard from '../dashboard/StatsCard'
import './StatsPanel.css'

@observer
export default class StatsPanel extends React.Component {
  @observable graphType
  @observable series
  constructor(props) {
    super(props)

    this.chart = null
    this.graphType = 'graph_trx'

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
      <div  style={{marginTop:10}}>
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right" style={{marginTop:8}}>
              
                <form className="form-inline">
                  <div className="text-right" style={{marginLeft:10, marginRight:10}}> 
                    <button type="button" className={`${this.graphType === 'graph_amount' ? 'mdi mdi-check-all ' : ''} btn btn-${this.graphType === 'graph_amount' ? '' : 'outline-'}primary btn-rounded mr-1 statsBtn`} onClick={this.handleClickButton.bind(this, 'graph_amount')}>&nbsp;Revenue&nbsp;</button>
                    <button type="button" className={`${this.graphType === 'graph_trx' ? 'mdi mdi-check-all ' : ''} btn btn-${this.graphType === 'graph_trx' ? '' : 'outline-'}primary btn-rounded statsBtn`} onClick={this.handleClickButton.bind(this, 'graph_trx')}>&nbsp;Transaction&nbsp;</button>
                  </div>
                  {dateInput}
                  <a className="btn btn-primary ml-2" onClick={() => onGetData(false)}>
                    <i className="mdi mdi-autorenew" style={{ color: '#fff' }} />
                  </a>

                </form>
                
              </div>
              <h4 className="page-title">{title}</h4>
            </div>
          </div>
        </div>
        <div className="row" style={{ }}>
          <div className="col-xl-3">
            <div className="row">
              {/* <div className="col-lg-6">
                <StatsCard {...stats[0]} icon={'desktop-classic'} />
              </div> */}
              <div className="col-lg-12">
                <StatsCard {...stats[1]} icon={'cart-plus'} />
              </div>
              <div className="col-lg-12">
                <StatsCard {...stats[2]} icon={'currency-usd'} />
              </div>
            </div>
          </div>
          <div className="col-xl-9">
          
            <div className="card">
            
              <div className="card-body" style={{marginBottom:-20, minHeight:235}}>
                
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
        data: values
      }
    })

    if(this.props.type === 'Hourly') {
      options.tooltip = {
        x: {
          show: true,
          format: 'HH:mm, dd MMM yy',
          formatter: undefined,
        }
      }
    } else {
      options.tooltip = {
        x: {
          show: true,
          format: 'dd MMM yy',
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
    toolbar:{
      show: true,
      tools: {
        selection: false,
        pan: false
      }
    },

    height: 320,
    type: 'area',
    stacked: true,
    scroller: {
      enabled: false
    },
    events: {
      selection: (chart, e) => {
        console.log(new Date(e.xaxis.min))
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 150
      }
    },
  },
  // markers: {
  //   size: 0
  // },
  colors: ['#9688d8', '#76cb98', '#85e3be', '#b978eb', '#e3c785', '#ec74e8'],
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
      opacityFrom: 0.4,
      opacityTo: 0.6,
    }
  },
  legend: {
    fontSize: 10,
    offsetX: -15,
    position: 'top',
    horizontalAlign: 'left',
    itemMargin:{
      horizontal:25,
      vertical:0
    }
  },
  yaxis:{
    labels: {
      formatter: function (value) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return value.toString().replace(regexp, ',');
        //return value + "$";
      }
    },
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
      opacity: 0.1
    },
    borderColor: '#f8f9fd'
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
