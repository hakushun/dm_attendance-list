import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
	padding: 10px 0;
`;
type Props = {
	children?: React.ReactNode;
};

const buttonWrapper: React.FC<Props> = React.memo((props) => {
	return <ButtonWrapper>{props.children}</ButtonWrapper>;
});

buttonWrapper.displayName = 'buttonWrapper';
export default buttonWrapper;
