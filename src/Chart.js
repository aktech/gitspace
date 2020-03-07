import React, {Component} from 'react'
import { ResponsiveBar } from '@nivo/bar'

// These two values must be close enough for the size label to be placed correctly
const yAxisDiff = 64
const barHeight = 70

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
            labelPosition: null
        }
    }

    getAllBars = (bars) => {
        const remainingSize = this.props.data.length - bars.length
        const dataToFill = this.props.data.slice(0, remainingSize)
        let lastBar = bars[0]
        let remainingElements = []
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
                    height: 58,
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
        const barsAppended = this.getAllBars(bars)
        let labels = barsAppended.map(({ key, x, y, width, height }, index) => {
            return (
                <text textAnchor="middle" className="foobarclass" x={width+50} y={y + height/2.1} style={{
                    "fontSize": "14px",
                    "fontFamily": "'Slabo 27px', serif"
                }} key={index}>
                    {this.formatSize(barsAppended[index].data.value)}
                </text>
            )
        })
        return <g>{labels}</g>
    }


    render() {

        return (
        <div style={{height: Math.max(700, this.props.repos.length * barHeight)}} className="bar-chart">
            <ResponsiveBar
                data={this.props.data}
                keys={["size"]}
                indexBy="repoName"
                margin={{ top: 50, right: 100, bottom: 300, left: 200 }}
                padding={0.1}
                layout="horizontal"
                layers={["grid", "axes", "bars", this.LabelText, "markers", "legends"]}
                colors={{"scheme": "nivo"}}
                colorBy="index"
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                enableLabel={false}
                axisBottom={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
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
        )
    }
}

export default Chart;
