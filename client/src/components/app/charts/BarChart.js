import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const colorByIndex = e => e.data[e.id + 'Color'];

const axisBottom = {
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: '',
  legendPosition: 'middle',
  legendOffset: 36,
};

const axisLeft = {
  orient: 'left',
  tickSize: 20,
  tickPadding: 5,
  tickRotation: 0,
  tickValues: [],
  legend: '',
  legendPosition: 'middle',
  legendOffset: -40,
};

export default props => (
  <ResponsiveBar
    {...props}
    padding={0.3}
    groupMode="grouped"
    colorBy={colorByIndex}
    axisBottom={axisBottom}
    axisLeft={axisLeft}
    enableGridY={false}
    labelTextColor="#ffffff"
    labelSkipWidth={12}
    labelSkipHeight={12}
    animate={true} // eslint-disable-line react/jsx-boolean-value
    motionStiffness={300}
    motionDamping={15}
    legends={[]}
    margin={{ top: 10, right: 12, bottom: 50, left: 12 }}
  />
);
