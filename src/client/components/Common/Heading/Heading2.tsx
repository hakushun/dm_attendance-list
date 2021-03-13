import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
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

const heading2: React.FC<Props> = React.memo(({ text }) => {
	return <Heading>{text}</Heading>;
});

heading2.displayName = 'heading2';
export default heading2;
