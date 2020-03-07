import React, {Component} from 'react'
import { ResponsiveBar } from '@nivo/bar'

const theme = {
    axis: {
        tickColor: "#eee",
        ticks: {
            text: {
                fontSize: "18px",
                fontFamily: "Lato, sans-serif",
                fontWeight: "bold"
            }
        },
        legend: {
            text: {
                fontSize: "20px",
                fontFamily: "Lato, sans-serif",
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


    LabelText = ({ bars }) => {
        let labels = bars.map(({ key, x, y, width, height }, index) => {
            return (
                <text textAnchor="middle" x={width+50} y={y + height/2.1} style={{
                    "font-size": "14px",
                    "font-family": "'Slabo 27px', serif"
                }}>
                    {bars[index].data.value} MiB
                </text>
            )
        })
        return <g>{labels}</g>
    }

    render() {

        return (
        <div style={{height: Math.max(700, this.props.repos.length * 70)}} className="bar-chart">
            <ResponsiveBar
                data={
                    this.props.data
                }
                keys={["size"]}
                indexBy="repoName"
                margin={{ top: 50, right: 300, bottom: 300, left: 300 }}
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
                    legendOffset: 70
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={theme}
                tooltipFormat={value => value + ' MiB'}
                />
        </div>
        )
    }
}

export default Chart;
