import React from 'react';
import styled from 'styled-components';

const Required = styled.span`
	background-color: #ff0059;
	border-radius: 3px;
	color: #fff;
	display: inline-block;
	font-size: 12px;
	font-weight: normal;
	margin-left: 5px;
	padding: 3px;
`;

const required = React.memo(
	(): JSX.Element => {
		return <Required>必須</Required>;
	},
);

required.displayName = 'required';
export default required;
