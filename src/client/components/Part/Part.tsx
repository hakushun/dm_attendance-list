import React from 'react';
import styled from 'styled-components';
import PartInput from './PartInput';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import TernaryButton from '../Common/Buttons/TernaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import { onChange, onClickButton, MovePart } from '../../declarations/types';

const Wrapper = styled.div`
	border: 1px solid #998e7a;
	box-shadow: 0 10px 5px -5px #998e7a;
	margin: 0 auto;
	padding: 20px 0;
	width: 500px;

	@media (max-width: 480px) {
		width: calc(100vw - 35px);
	}
`;
const PartDetail = styled.span`
	display: block;
	font-size: 16px;
	line-height: 1.4;
	padding: 10px 0;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	isLoading: boolean;
	localParts: string[];
	handleChange: onChange;
	movePart: MovePart;
	addPartForm: onClickButton;
	deletePartForm: onClickButton;
	registerParts: onClickButton;
	cancelParts: onClickButton;
};

const part: React.FC<Props> = React.memo(
	({
		isLoading,
		localParts,
		handleChange,
		movePart,
		addPartForm,
		deletePartForm,
		registerParts,
		cancelParts,
	}) => {
		return (
			<Wrapper
				id="part"
				role="tabpanel"
				aria-hidden="true"
				className="isHidden">
				<form id="part_form" role="form">
					<fieldset>
						<Legend>
							<HeadingWrapper>
								<Heading text="パート 登録フォーム" />
							</HeadingWrapper>
						</Legend>
						<PartDetail>
							出欠表を並び替えるとき時に
							<br />
							表示させたい順番に入力ください
						</PartDetail>
						<PartInput
							localParts={localParts}
							handleChange={handleChange}
							movePart={movePart}
						/>
					</fieldset>
					<ButtonWrapper>
						<TernaryButton
							text="追加"
							method={(e) => {
								addPartForm(e);
							}}
							arialabel="パートの追加"
						/>
						<TernaryButton
							text="削除"
							method={(e) => {
								deletePartForm(e);
							}}
							arialabel="パートの削除"
						/>
					</ButtonWrapper>
					{isLoading ? (
						<DonutSpinner />
					) : (
						<>
							<ButtonWrapper>
								<SecondaryButton
									text="登録"
									method={(e) => {
										registerParts(e);
									}}
								/>
							</ButtonWrapper>
							<ButtonWrapper>
								<QuaternaryButton
									text="キャンセル"
									method={(e) => {
										cancelParts(e);
									}}
								/>
							</ButtonWrapper>
						</>
					)}
				</form>
			</Wrapper>
		);
	},
);

part.displayName = 'part';
export default part;
