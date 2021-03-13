import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.button`
	background-color: #ffa500;
	border: 2px solid #ffa500;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	min-width: 150px;
	outline: none;
	padding: 5px;

	&:hover {
		background-color: #fff;
		color: #ffa500;
	}

	&:focus {
		background-color: #fff;
		color: #ffa500;
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
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const primaryButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<PrimaryButton type="button" onClick={method}>
			{text}
		</PrimaryButton>
	);
});

primaryButton.displayName = 'primaryButton';
export default primaryButton;
