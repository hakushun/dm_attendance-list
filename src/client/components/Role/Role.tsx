import React from 'react';
import styled from 'styled-components';
import { User } from '../../redux/modules/user';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import RoleForm from './RoleForm';
import { Event } from '../../redux/modules/event';
import { onClickButton, onChange } from '../../declarations/types';

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
const Description = styled.p`
	font-size: 16px;
	line-height: 1.4;
	padding: 10px 0;

	@media (max-width: 480px) {
		font-size: 14px;
	}
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

const role: React.FC<Props> = React.memo(
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
		return (
			<Wrapper
				id="role"
				role="tabpanel"
				aria-hidden="true"
				className="isHidden">
				<HeadingWrapper>
					<Heading text="乗り番 登録フォーム" />
				</HeadingWrapper>
				{event.id === 0 ? (
					<Description>
						乗り番を登録したいイベントを
						<br />
						イベント一覧より選択してください
					</Description>
				) : event.programs && event.programs.length === 0 ? (
					<Description>プログラムを登録してください</Description>
				) : (
					<RoleForm
						parts={parts}
						event={event}
						users={users}
						isLoading={isLoading}
						localUsers={localUsers}
						toggleAccordion={toggleAccordion}
						handleChange={handleChange}
						updateRole={updateRole}
						cancelRole={cancelRole}
					/>
				)}
			</Wrapper>
		);
	},
);

role.displayName = 'role';
export default role;
