import React from 'react';
import styled from 'styled-components';

const Heading = styled.h3`
	border-bottom: 3px solid #998e7a;
	display: inline-block;
	font-size: 20px;
	font-weight: bold;
	padding: 0 5px 10px;

	@media (max-width: 480px) {
		font-size: 18px;
	}
`;
type Props = {
	text: string;
};

const heading3: React.FC<Props> = React.memo(({ text }) => {
	return <Heading>{text}</Heading>;
});

heading3.displayName = 'heading3';
export default heading3;
