import React from 'react';
import { User } from '../../redux/modules/user';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const SelectLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px;
`;
const Selectbox = styled.select`
	background-color: #fff;
	border: 2px solid #ffedcc;
	border-radius: 3px;
	font-size: 16px;
	height: 30px;
	width: 160px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}

	@media (max-width: 480px) {
		display: block;
		margin: 0 auto;
	}
`;
const Legend = styled.legend`
	margin: 0 auto;
`;

type Props = {
	matchedUsers: User[];
	selectedUser: string;
	setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
};
const CovidSelectUser: React.FC<Props> = React.memo(
	({ matchedUsers, selectedUser, setSelectedUser }) => {
		return (
			<>
				{matchedUsers && (
					<Wrapper>
						<fieldset>
							<Legend>
								<SelectLabel htmlFor="covid-select-name">
									名前
									<Required />
								</SelectLabel>
							</Legend>
							<Selectbox
								id="covid-select-name"
								value={selectedUser}
								required
								aria-required="true"
								onChange={(e) =>
									setSelectedUser(e.target.value)
								}>
								<option value="0">選択してください</option>
								{matchedUsers.map((user) => {
									return (
										<option key={user.id} value={user.id}>
											{user.name}
										</option>
									);
								})}
							</Selectbox>
						</fieldset>
					</Wrapper>
				)}
			</>
		);
	},
);

CovidSelectUser.displayName = 'CovidSelectUser';
export default CovidSelectUser;
