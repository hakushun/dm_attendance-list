import React from 'react';
import styled from 'styled-components';

const SecondaryButton = styled.button`
	background-color: #ff0059;
	border: 2px solid #ff0059;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	display: block;
	font-size: 16px;
	font-weight: bold;
	margin: 0 auto;
	min-width: 150px;
	outline: none;
	padding: 5px 10px;

	&:hover {
		background-color: #fff;
		color: #ff0059;
	}

	&:focus {
		background-color: #fff;
		color: #ff0059;
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

const secondaryButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<SecondaryButton type="submit" onClick={method}>
			{text}
		</SecondaryButton>
	);
});

secondaryButton.displayName = 'secondaryButton';
export default secondaryButton;
