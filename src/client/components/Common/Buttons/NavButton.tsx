import React from 'react';
import styled from 'styled-components';

const NavButton = styled.button`
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
		font-size: 12px;
		padding: 2px 5px;
	}
`;
type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
	datajs?: string;
};

const navButton: React.FC<Props> = React.memo(({ method, text, datajs }) => {
	return (
		<NavButton type="button" data-js={datajs} onClick={method}>
			{text}
		</NavButton>
	);
});

navButton.displayName = 'navButton';
export default navButton;
