import { BarDatum, ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar'
import { CostBreakdown } from '../../../server/src/types'
import { toThousandGroup } from '../functions/to-thousand-group'

type BarChartProps = {
  breakdown: CostBreakdown;
}

const chartTheme: ResponsiveBarSvgProps<BarDatum>['theme'] = {
  text: {
    fill: '#eee',
  },
  tooltip: {
    container: {
      background: '#444',
    },
  },
}

export function BarChart({ breakdown }: BarChartProps) {
  return (
    <ResponsiveBar
        data={breakdown.costs}
        keys={breakdown.shipNames}
        indexBy="episode"
        theme={chartTheme}
        margin={{ top: 5, right: 180, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        valueFormat={n => toThousandGroup(n)}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: '#38bcb2',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
        //         color: '#eed312',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Episode',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ship Costs',
            legendPosition: 'middle',
            legendOffset: -65,
            truncateTickAt: 0,
            format: n => toThousandGroup(n),
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 180,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 160,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
          }
        ]}
    />
  )
}
