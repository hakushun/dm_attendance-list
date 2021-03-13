import React from 'react';
import styled from 'styled-components';

const QuaternaryButton = styled.button`
	align-self: center;
	background-color: #fa8072;
	border: 2px solid #fa8072;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	margin: 0 5px;
	outline: none;
	padding: 2px 10px;

	&:hover {
		background-color: #fff;
		color: #fa8072;
	}

	&:focus {
		background-color: #fff;
		color: #fa8072;
	}

	&:active {
		box-shadow: none;
		transform: translateY(3px);
	}

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
type Props = {
	method?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const quaternaryButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<QuaternaryButton type="button" onClick={method}>
			{text}
		</QuaternaryButton>
	);
});

quaternaryButton.displayName = 'quaternaryButton';
export default quaternaryButton;
