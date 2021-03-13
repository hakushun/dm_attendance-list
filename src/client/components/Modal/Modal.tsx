import React from 'react';
import styled from 'styled-components';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import Mask from './Mask';
import { Attendance } from '../../redux/modules/attendance';
import { onClickButton, onKeyDownModal } from '../../declarations/types';

const Modal = styled.section`
	background-color: #fffff0;
	border: 3px solid #ffb833;
	border-radius: 10px;
	box-shadow: 0 0 10px 5px rgba(255, 184, 51, 0.5);
	left: 50%;
	max-height: 90vh;
	overflow: auto;
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	z-index: 100;

	@media (max-width: 480px) {
		width: 300px;
	}
`;
const ModalInner = styled.div`
	padding: 20px 0;
	text-align: center;
`;
const InfoGroup = styled.div`
	line-height: 1.2;
	padding: 5px 10px;
`;
const InfoHeader = styled.span`
	display: block;
	font-size: 18px;
	font-weight: bold;
	margin: 0 auto;
`;
const InfoLabel = styled.span`
	border-bottom: 1px solid #000;
	display: block;
	font-weight: bold;
	text-align: left;
`;
const InfoText = styled.p`
	padding-left: 15px;
	padding-top: 5px;
	text-align: left;
	word-wrap: break-word;
`;
type Props = {
	attendance: Attendance;
	modalIsShown: boolean;
	name1: string;
	name2: string;
	url: string;
	category: string;
	schedule: string;
	contents: string;
	pressTab: onKeyDownModal;
	closeModal: onClickButton;
	replaceToNewStr: (str: string) => string | JSX.Element;
};

const modal: React.FC<Props> = React.memo(
	({
		attendance,
		modalIsShown,
		name1,
		name2,
		url,
		category,
		schedule,
		contents,
		pressTab,
		closeModal,
		replaceToNewStr,
	}) => {
		return (
			<>
				{modalIsShown && (
					<>
						<Mask />
						<Modal
							id="modal"
							aria-hidden="false"
							onKeyDown={(e) => pressTab(e)}>
							<ModalInner>
								<InfoGroup>
									<InfoHeader>
										{attendance.date}の詳細
									</InfoHeader>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>施設名1：</InfoLabel>
									<InfoText>{name1}</InfoText>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>施設名2：</InfoLabel>
									<InfoText>{name2}</InfoText>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>URL：</InfoLabel>
									{url === '未入力' ? (
										<InfoText>{url}</InfoText>
									) : (
										<InfoText>
											<a
												href={url}
												target="_blank"
												rel="noreferrer">
												{url}
											</a>
										</InfoText>
									)}
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>区分：</InfoLabel>
									<InfoText>{category}</InfoText>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>スケジュール：</InfoLabel>
									<InfoText>
										{schedule
											.split('\n')
											.map((str, index) => (
												<React.Fragment key={index}>
													{str}
													<br />
												</React.Fragment>
											))}
									</InfoText>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>備考：</InfoLabel>
									<InfoText>
										{contents
											.split('\n')
											.map((str, index) => (
												<React.Fragment key={index}>
													{replaceToNewStr(str)}
													<br />
												</React.Fragment>
											))}
									</InfoText>
								</InfoGroup>
								<InfoGroup>
									<InfoLabel>出欠：</InfoLabel>
									<InfoText>
										〇：{attendance.attend}人・△：
										{attendance.pending}人
									</InfoText>
									<InfoText>
										回答者：{attendance.respondent}人
									</InfoText>
								</InfoGroup>
								<ButtonWrapper>
									<QuaternaryButton
										text="閉じる"
										method={(e) => closeModal(e)}
									/>
								</ButtonWrapper>
							</ModalInner>
						</Modal>
					</>
				)}
			</>
		);
	},
);

modal.displayName = 'modal';
export default modal;
