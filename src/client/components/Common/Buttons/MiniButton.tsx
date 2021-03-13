import React from 'react';
import styled from 'styled-components';

const MiniButton = styled.button`
	background-color: #fa8072;
	border: 2px solid #fa8072;
	border-radius: 50%;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	font-size: 12px;
	margin: 0 3px;
	outline: none;

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
`;
type Props = {
	method: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
	datajs: string;
	arialabel: string;
};

const miniButton: React.FC<Props> = React.memo(
	({ method, text, datajs, arialabel }) => {
		return (
			<MiniButton
				type="button"
				data-js={datajs}
				aria-label={arialabel}
				onClick={method}>
				{text}
			</MiniButton>
		);
	},
);
miniButton.displayName = 'miniButton';
export default miniButton;
