import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
	padding: 15px 16px;
	text-align: center;
`;
type Props = {
	children?: React.ReactNode;
	id: string;
	ariahidden: boolean | 'true' | 'false';
};

const section: React.FC<Props> = React.memo(({ children, id, ariahidden }) => {
	return (
		<Section id={id} aria-hidden={ariahidden}>
			{children}
		</Section>
	);
});

section.displayName = 'section';
export default section;
