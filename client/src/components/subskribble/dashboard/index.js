import React from 'react';
import DashboardPanels from './panels/dashboardPanels';
import PanelsContainer from '../app/panels/panelsContainer';

export default function() { return <PanelsContainer Panels={DashboardPanels} /> }
