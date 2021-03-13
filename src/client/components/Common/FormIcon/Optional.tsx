import React from 'react';
import styled from 'styled-components';

const Optional = styled.span`
	background-color: #a9a9a9;
	border-radius: 3px;
	color: #fff;
	display: inline-block;
	font-size: 12px;
	font-weight: normal;
	margin-left: 5px;
	padding: 3px;
`;

const optional = React.memo(
	(): JSX.Element => {
		return <Optional>任意</Optional>;
	},
);

optional.displayName = 'optional';
export default optional;
