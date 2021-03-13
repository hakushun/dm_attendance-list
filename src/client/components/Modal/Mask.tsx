import React from 'react';
import styled from 'styled-components';

const Mask = styled.div`
	background-color: #000;
	bottom: 0;
	left: 0;
	opacity: 0.8;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 10;
`;

const mask = React.memo(
	(): JSX.Element => {
		return <Mask tabIndex={-1}></Mask>;
	},
);

mask.displayName = 'mask';
export default mask;
