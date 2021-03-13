import React from 'react';
import styled from 'styled-components';

const TernaryButton = styled.button`
	background-color: #ffb833;
	border: 2px solid #ffb833;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	margin: 0 5px;
	min-width: 100px;
	outline: none;
	padding: 5px 10px;

	&:hover {
		background-color: #fff;
		color: #ffb833;
	}

	&:focus {
		background-color: #fff;
		color: #ffb833;
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
	arialabel?: string;
};

const ternaryButton: React.FC<Props> = React.memo(
	({ method, text, arialabel }) => {
		return (
			<TernaryButton
				type="button"
				aria-label={arialabel}
				onClick={method}>
				{text}
			</TernaryButton>
		);
	},
);

ternaryButton.displayName = 'ternaryButton';
export default ternaryButton;
