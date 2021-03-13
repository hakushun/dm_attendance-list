import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '../../redux/modules/user';
import RoleRadio from './RoleRadio';
import RoleInput from './RoleInput';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import { Event } from '../../redux/modules/event';
import { onClickButton, onChange } from '../../declarations/types';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const SubTitle = styled.span`
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
`;
const Description = styled.p`
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
	parts: string[];
	event: Event;
	users: User[];
	isLoading: boolean;
	localUsers: User[];
	handleChange: onChange;
	updateRole: onClickButton;
	cancelRole: onClickButton;
	toggleAccordion: onClickButton;
};

const roleForm: React.FC<Props> = React.memo(
	({
		parts,
		event,
		users,
		isLoading,
		localUsers,
		toggleAccordion,
		handleChange,
		updateRole,
		cancelRole,
	}) => {
		const [checkedProgram, setCheckedProgram] = useState<
			HTMLInputElement
		>();
		return (
			<form id="role_form" role="form">
				<Wrapper>
					<fieldset>
						<Legend>
							<SubTitle>プログラムの選択</SubTitle>
						</Legend>
						<RoleRadio
							event={event}
							setCheckedProgram={setCheckedProgram}
						/>
					</fieldset>
				</Wrapper>
				{checkedProgram ? (
					<>
						<Wrapper>
							<fieldset>
								<Legend>
									<SubTitle>
										{checkedProgram.value}の乗り番入力
									</SubTitle>
								</Legend>
								<RoleInput
									parts={parts}
									users={users}
									localUsers={localUsers}
									toggleAccordion={toggleAccordion}
									handleChange={handleChange}
									checkedProgram={checkedProgram}
								/>
							</fieldset>
						</Wrapper>
						{isLoading ? (
							<DonutSpinner />
						) : (
							<>
								<ButtonWrapper>
									<SecondaryButton
										text="乗り番の更新"
										method={(e) => {
											updateRole(e);
										}}
									/>
								</ButtonWrapper>
								<ButtonWrapper>
									<QuaternaryButton
										text="キャンセル"
										method={(e) => {
											cancelRole(e);
										}}
									/>
								</ButtonWrapper>
							</>
						)}
					</>
				) : (
					<Description>プログラムを選択してください</Description>
				)}
			</form>
		);
	},
);

roleForm.displayName = 'roleForm';
export default roleForm;
