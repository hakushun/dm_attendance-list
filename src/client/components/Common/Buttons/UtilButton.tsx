import React from 'react';
import styled from 'styled-components';

const UtilButton = styled.button`
	align-self: center;
	background-color: #808080;
	border: 2px solid #808080;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	font-size: 14px;
	outline: none;
	padding: 5px;

	&:hover {
		background-color: #fff;
		color: #808080;
	}

	&:focus {
		background-color: #fff;
		color: #808080;
	}

	&:active {
		box-shadow: none;
		transform: translateY(3px);
	}

	@media (max-width: 480px) {
		display: none;
	}
`;
type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const utilButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<UtilButton type="button" onClick={method}>
			{text}
		</UtilButton>
	);
});

utilButton.displayName = 'utilButton';
export default utilButton;
