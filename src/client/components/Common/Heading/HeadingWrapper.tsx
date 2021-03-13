import React from 'react';
import styled from 'styled-components';

const HeadingWrapper = styled.div`
	padding: 10px 0;
`;
type Props = {
	children?: React.ReactNode;
};

const headingWrapper: React.FC<Props> = React.memo(({ children }) => {
	return <HeadingWrapper>{children}</HeadingWrapper>;
});

headingWrapper.displayName = 'headingWrapper';
export default headingWrapper;
