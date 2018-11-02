import React from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';

const colorByIndex = d => d.color;
const radialLabel = d => d.id;

export default props => (
  <ResponsivePieCanvas
    {...props}
    pixelRatio={1}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors="paired"
    colorBy={colorByIndex}
    borderColor="inherit:darker(0.6)"
    radialLabel={radialLabel}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={10}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor="inherit"
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#ffffff"
    animate={true} // eslint-disable-line react/jsx-boolean-value
    motionStiffness={90}
    motionDamping={15}
    legends={[]}
    margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
  />
);
