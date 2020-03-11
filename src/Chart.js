import React, {Component} from 'react'
import { ResponsiveBar } from '@nivo/bar'

// These two values must be close enough for the size label to be placed correctly
const defaultYAxisDiff = 64
const barHeight = 70
const smallScreenWidth = 600
const tickFont = "PT Sans, serif"

const theme = {
    axis: {
        tickColor: "#eee",
        ticks: {
            text: {
                fontSize: "1em",
                fontFamily: tickFont,
                fontWeight: "bold"
            }
        },
        legend: {
            text: {
                fontSize: "1em",
                fontFamily: tickFont,
                fontWeight: "bold",
                fill: '#165f77'
            }
        }
    }
};


class Chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labelPosition: null,
            width: 0, height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getAllBars = (bars) => {
        const remainingSize = this.props.data.length - bars.length
        const dataToFill = this.props.data.slice(0, remainingSize)
        let lastBar = bars[0]
        let remainingElements = []

        const yHeight = bars[0].height
        const yAxisDiff = bars.length >= 2 ? bars[0].y - bars[1].y: defaultYAxisDiff

        dataToFill.reverse()
        dataToFill.forEach(element => {
            remainingElements.push({
                    key: element.repoName,
                    data: {
                        id: "size", value: element.size, index: 20, indexValue: element.repoName,
                        data: {
                            repoName: element.repoName,
                            size: element.size
                        }
                    },
                    x: 0,
                    y: lastBar.y + yAxisDiff,
                    width: 1,
                    height: yHeight,
                    color: "#e8c1a0"
                }
            )
            lastBar = remainingElements[remainingElements.length - 1]
        })
        remainingElements.reverse()
        return remainingElements.concat(bars)
    }

    formatSize = (size) => {
        let humanReadableSize
        if (size < 512) {
            humanReadableSize = `${size} KiB`
        } else if (size < 1024 * 1024) {
            humanReadableSize = `${Math.round((size/1024 + Number.EPSILON) * 100) / 100} MiB`
        } else {
            humanReadableSize = `${Math.round((size/(1024*1024) + Number.EPSILON) * 100) / 100} GiB`
        }
        return humanReadableSize
    }

    LabelText = ({ bars }) => {
        if (bars.length === 0) {
            return <g></g>
        }
        const barsAppended = this.getAllBars(bars)
        let labels = barsAppended.map(({ key, x, y, width, height }, index) => {
            return (
                <text textAnchor="middle" x={width+50} y={y + height/2.1} style={{
                    "fontSize": "14px",
                    "fontFamily": "'Slabo 27px', serif"
                }} key={index}>
                    {this.formatSize(barsAppended[index].data.value)}
                </text>
            )
        })
        return <g>{labels}</g>
    }

    isOnSmallScreen = () => {
        return this.state.width < smallScreenWidth
    }

    getChartMargin = () => {
        const right = 120
        const left = this.isOnSmallScreen() ? 100 : 200
        return { top: 10, right: right, bottom: 200, left: left }
    }

    getChartDimension = () => {
        return {
            height: Math.max(700, this.props.repos.length * barHeight),
            width: this.isOnSmallScreen() ? this.state.width + 200: this.state.width
        }
    }

    render() {

        return (
            <div className="wrap-chart">
                <div style={this.getChartDimension()} className="bar-chart">
                    <ResponsiveBar
                        data={this.props.data}
                        keys={["size"]}
                        indexBy="repoName"
                        margin={this.getChartMargin()}
                        padding={0.1}
                        layout="horizontal"
                        layers={["grid", "axes", "bars", this.LabelText, "markers", "legends"]}
                        colors={{"scheme": "nivo"}}
                        colorBy="index"
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        enableLabel={false}
                        axisLeft={{
                            tickRotation: this.isOnSmallScreen() ? -60: 0,
                        }}
                        axisBottom={{
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: this.isOnSmallScreen() ? -50: 0,
                            legend: 'MiB',
                            legendPosition: 'middle',
                            legendOffset: 70,
                            format: value => Math.round((value/1024 + Number.EPSILON))
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        theme={theme}
                        tooltipFormat={value => value + ' KiB'}
                        />
                </div>
             </div>
        )
    }
}

export default Chart;
