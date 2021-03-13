import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { Event } from '../../redux/modules/event';
import {
	AddPrefix,
	onClickAncor,
	HighlightRow,
} from '../../declarations/types';
import { User } from '../../redux/modules/user';

const Td = styled.td`
	border: 1.5px solid #998e7a;
	font-size: 16px;
	max-width: 150px;
	padding: 10px;
	position: relative;
	vertical-align: middle;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Td2 = styled.td`
	border: 1.5px solid #998e7a;
	font-size: 16px;
	max-width: 300px;
	padding: 10px;
	position: relative;
	vertical-align: middle;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Clickable = styled.a`
	color: #0059ff;
	cursor: pointer;
	text-decoration: underline;
`;
const Balloon = styled.span`
	background-color: #99beff;
	border: 3px solid #fff;
	border-radius: 8px;
	bottom: 100%;
	display: none;
	font-size: 14px;
	left: 0;
	max-width: 300px;
	min-width: 180px;
	padding: 10px;
	position: absolute;
	width: max-content;
	z-index: 5;

	&::after {
		background-color: #99beff;
		border-bottom: 3px solid #fff;
		border-left: 3px solid #fff;
		bottom: -11px;
		content: '';
		height: 15px;
		left: 50px;
		position: absolute;
		transform: rotate(-45deg);
		width: 15px;

		@media (max-width: 480px) {
			left: 43px;
		}
	}
`;

type Props = {
	event: Event;
	users: User[];
	selectedProgram: string;
	addPrefix: AddPrefix;
	editAttendance: onClickAncor;
	highlightRow: HighlightRow;
	toggleBaloon: onClickAncor;
};

const AttendanceTableBody: React.FC<Props> = React.memo(
	({
		event,
		users,
		selectedProgram,
		addPrefix,
		editAttendance,
		highlightRow,
		toggleBaloon,
	}) => {
		return (
			<tbody id="tbody">
				{users && (
					<>
						{users.map((user) => {
							const userAttendances = user.attendances.map(
								(attendance, index) => {
									return (
										<>
											{user.remarks[index] === '' ? (
												<Td
													data-js={`attendance-cell-${index}`}
													data-count={`attendance-${index}`}
													aria-label={
														attendance === '○'
															? '出席'
															: attendance === '△'
															? '未定'
															: '欠席'
													}>
													{attendance}
												</Td>
											) : (
												<Td
													data-js={`attendance-cell-${index}`}
													aria-label={
														attendance === '○'
															? '出席'
															: attendance === '△'
															? '未定'
															: '欠席'
													}>
													<Clickable
														href="#"
														data-count={`attendance-${index}`}
														aria-label="コメントを読む"
														onClick={(e) => {
															toggleBaloon(e);
														}}>
														{attendance}
													</Clickable>
													<Balloon>
														{user.remarks[index]}
													</Balloon>
												</Td>
											)}
										</>
									);
								},
							);
							return (
								<tr
									key={generateId(
										'user',
										user.id ? user.id : 0,
									)}
									data-js="attendance-rows"
									onClick={(e) => {
										highlightRow(e);
									}}>
									<Td data-js={addPrefix(user.part)}>
										{user.part}
									</Td>
									<Td aria-label={`${user.name}`}>
										<Clickable
											href="#"
											id={generateId(
												'user',
												user.id ? user.id : 0,
											)}
											data-js="display-name"
											aria-label={`${user.name}の出欠を編集する`}
											onClick={(e) => {
												editAttendance(e);
											}}>
											{user.name}
										</Clickable>
									</Td>
									{event.programs &&
										event.programs.length > 0 && (
											<Td>
												{user.role &&
												user.role[selectedProgram]
													? user.role[selectedProgram]
													: '未入力'}
											</Td>
										)}
									{userAttendances}
									<Td2>{user.comment}</Td2>
								</tr>
							);
						})}
					</>
				)}
			</tbody>
		);
	},
);

AttendanceTableBody.displayName = 'AttendanceTableBody';
export default AttendanceTableBody;
