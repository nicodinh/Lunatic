import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-png-tooltip';
import { responsePropTypes } from '../../utils';
import * as img from './img';
import { buildTooltip } from '../../utils/tooltip';
import './tooltip.scss';

const Tootltip = ({ id, response }) => {
	const [tooltipElements] = useState(buildTooltip(response));
	const { content, imgName } = tooltipElements;

	useEffect(() => {
		buildTooltip(response);
	}, [tooltipElements]);

	if (!content) return null;
	return (
		<Tooltip
			className="tooltip-lunatic"
			tooltip={<img alt="" src={img[imgName].src || img[imgName]} />}
		>
			<ul>
				{content.map(({ key, value }) => (
					<li key={`tooltip-${id}-content-${key}`}>{`${key} : ${value}`}</li>
				))}
			</ul>
		</Tooltip>
	);
};

Tootltip.defaultProps = {
	response: {},
};

Tootltip.propTypes = {
	id: PropTypes.string,
	response: responsePropTypes,
};

export default Tootltip;