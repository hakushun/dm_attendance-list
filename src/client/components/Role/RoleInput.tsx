import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { User } from '../../redux/modules/user';
import { onClickButton, onChange } from '../../declarations/types';

const ListWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 10px auto 0;
	width: 300px;
`;
const ListItem = styled.li`
	border: 1.5px solid #998e7a;

	&:not(:first-child) {
		border-top: none;
	}
`;
const Legend = styled.legend`
	width: 100%;
`;
const PartLabel = styled.button`
	background: none;
	border: none;
	font-size: 18px;
	font-weight: bold;
	padding: 15px 10px;
	position: relative;
	-webkit-tap-highlight-color: transparent;
	text-align: left;
	width: 100%;
`;
const InputList = styled.li`
	align-items: center;
	display: flex;
	justify-content: space-between;
	padding: 5px;
`;
const NameLabel = styled.label`
	text-align: left;
	width: 50%;
`;
const RoleInput = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	font-size: 14px;
	font-weight: bold;
	min-height: 22px;
	padding: 5px 10px;
	width: calc(50% - 24px);
`;
type Props = {
	parts: string[];
	users: User[];
	localUsers: User[];
	handleChange: onChange;
	checkedProgram: HTMLInputElement;
	toggleAccordion: onClickButton;
};

const roleInput: React.FC<Props> = React.memo(
	({
		parts,
		users,
		localUsers,
		handleChange,
		checkedProgram,
		toggleAccordion,
	}) => {
		return (
			<ListWrapper>
				{parts.map((part) => {
					const usersByPart = users
						? users.filter((user) => user.part === part)
						: [];
					return (
						<ListItem key={`${part}-accordion`}>
							<fieldset>
								<Legend>
									<PartLabel
										type="button"
										className="Arrow"
										data-js={part}
										aria-expanded="false"
										aria-controls={`${part}-accordion`}
										onClick={(e) => toggleAccordion(e)}>
										{part}
									</PartLabel>
								</Legend>
								<ul
									className="Accordion"
									id={`${part}-accordion`}
									aria-hidden="true">
									{usersByPart.length > 0 ? (
										<>
											{usersByPart.map((user) => {
												return (
													<InputList
														key={generateId(
															'role',
															user.id
																? user.id
																: 0,
														)}>
														<NameLabel
															htmlFor={generateId(
																'role',
																user.id
																	? user.id
																	: 0,
															)}>
															{user.name}
														</NameLabel>
														<RoleInput
															type="text"
															id={generateId(
																'role',
																user.id
																	? user.id
																	: 0,
															)}
															value={
																localUsers.find(
																	(usr) =>
																		usr.id ===
																		user.id!,
																)!.role &&
																localUsers
																	.find(
																		(usr) =>
																			usr.id ===
																			user.id!,
																	)!
																	.role.hasOwnProperty(
																		checkedProgram.value,
																	)
																	? localUsers.find(
																			(
																				usr,
																			) =>
																				usr.id ===
																				user.id!,
																	  )!.role[
																			checkedProgram
																				.value
																	  ]
																	: ''
															}
															maxLength={30}
															onChange={(e) =>
																handleChange(e)
															}
														/>
													</InputList>
												);
											})}
										</>
									) : null}
								</ul>
							</fieldset>
						</ListItem>
					);
				})}
			</ListWrapper>
		);
	},
);

roleInput.displayName = 'roleInput';
export default roleInput;
