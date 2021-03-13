import React from 'react';
import styled from 'styled-components';

const SectionWithBorder = styled.section`
	border-bottom: 2px solid #998e7a;
	padding: 15px 16px;
	text-align: center;
`;
type Props = {
	children?: React.ReactNode;
	id: string;
	ariahidden: boolean | 'true' | 'false';
};

const sectionWithBorder: React.FC<Props> = React.memo(
	({ children, id, ariahidden }) => {
		return (
			<SectionWithBorder id={id} aria-hidden={ariahidden}>
				{children}
			</SectionWithBorder>
		);
	},
);

sectionWithBorder.displayName = 'sectionWithBorder';
export default sectionWithBorder;
