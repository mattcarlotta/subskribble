import React from 'react';
import { Card, Icon } from 'antd';
import { browserHistory } from 'react-router';
import PageContainer from '../panels/pageContainer';
import CustomButton from '../buttons/customButton';
import TogglePanelVisibility from '../panels/TogglePanelVisibility';

const noDataToDisplay = ({ buttonIcon, buttonPushLocation, buttonPanel, cardTitle, tipTitle, visible }) => (
	<PageContainer>
		<div className="panel-container">
			<Card title={cardTitle} extra={buttonPanel()}>
				<div style={{ display: visible ? "block" : "none", minHeight: 400 }} className="panel-body-container">
					<div className="panel-body">
						<div className="ant-row">
							<CustomButton
								className="f-r"
								buttonIcon={buttonIcon}
								onClickAction={() => browserHistory.push(`/subskribble/${buttonPushLocation}`)}
								tipTitle={tipTitle}
							/>
							<div className="no-data">
								<Icon type="line-chart" />
								<h2>No data to display.</h2>
								<p>You may not have any entries or the search filter does not match any of our current records.</p>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</PageContainer>
)

export default TogglePanelVisibility(noDataToDisplay)
