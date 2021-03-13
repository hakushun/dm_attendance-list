import React from 'react';
import styled from 'styled-components';
import {
	generateId,
	getDayOfWeek,
	exportToExcel,
} from '../../lib/utilFunctions';
import NavButton from '../Common/Buttons/NavButton';
import UtilButton from '../Common/Buttons/UtilButton';
import { Event } from '../../redux/modules/event';
import { onClickCell, onClickButton } from '../../declarations/types';

const ThRow1 = styled.th`
	background-color: #ff8c00;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	height: 16px;
	min-width: 115px;
	padding: 5px;
	position: sticky;
	top: 42px;
	vertical-align: middle;
	z-index: 2;

	@media (max-width: 480px) {
		font-size: 14px;
		min-width: 90px;
	}
`;
const ThRow2 = styled.th`
	background-color: #ff8c00;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	height: 16px;
	min-width: 115px;
	padding: 5px;
	position: sticky;
	top: 68px;
	vertical-align: middle;
	white-space: nowrap;
	z-index: 2;

	@media (max-width: 480px) {
		font-size: 14px;
		min-width: 100px;
	}
`;
const ThRow3 = styled.th`
	background-color: #ffedcc;
	padding: 5px 0;
	position: sticky;
	top: 0;
	z-index: 2;
`;
const Clickable = styled.a`
	color: #0059ff;
	cursor: pointer;
	text-decoration: underline;
`;
const SelectBox = styled.select`
	border: 1px solid #998e7a;
	border-radius: 3px;
	cursor: pointer;
	font-size: 16px;
	max-width: 100px;
	padding: 5px 3px;

	@media (max-width: 480px) {
		font-size: 14px;
		min-width: 100px;
	}
`;

type Props = {
	event: Event;
	openModal: onClickCell;
	changeDisplayName: () => void;
	hideColumns: onClickButton;
	showAllColumns: onClickButton;
};

const AttendanceTableHeader: React.FC<Props> = React.memo(
	({ event, openModal, changeDisplayName, hideColumns, showAllColumns }) => {
		return (
			<thead>
				<tr>
					<ThRow3>
						<UtilButton
							text="export to Excel"
							method={() =>
								exportToExcel(
									'#attendance_table_xlsx',
									'出欠表',
								)
							}
						/>
					</ThRow3>
					<ThRow3>
						<NavButton
							text="全列の表示"
							method={(e) => showAllColumns(e)}
						/>
					</ThRow3>
					{event.programs && event.programs.length > 0 && (
						<ThRow3>
							<SelectBox
								id="select_program"
								onChange={changeDisplayName}>
								<option value="0">選択して下さい</option>
								{event.programs.map((program, i) => (
									<option
										key={generateId('program-option', i)}
										value={program}>
										{program}
									</option>
								))}
							</SelectBox>
						</ThRow3>
					)}
					{event.days.map((_value, i) => {
						return (
							<ThRow3 key={generateId('hidebtn', i)}>
								<NavButton
									text="列の非表示"
									datajs={generateId('hidebtn', i)}
									method={(e) => hideColumns(e)}
								/>
							</ThRow3>
						);
					})}
					<ThRow3></ThRow3>
				</tr>
				<tr>
					<ThRow1 rowSpan={2}>パート</ThRow1>
					<ThRow1 rowSpan={2}>名前</ThRow1>
					{event.programs && event.programs.length > 0 && (
						<ThRow1 rowSpan={2}>乗り番</ThRow1>
					)}
					{event.days.map((day, i) => {
						return (
							<ThRow1
								key={generateId('day', i)}
								data-js={generateId('day', i)}
								aria-label={`${day}`}
								onClick={(e) => openModal(e)}>
								<Clickable
									href="#"
									aria-label={`${day}の詳細を確認する`}>
									{day}
									{getDayOfWeek(day)}
								</Clickable>
							</ThRow1>
						);
					})}
					<ThRow1 rowSpan={2}>コメント</ThRow1>
				</tr>
				<tr>
					{event.times.map((time, i) => (
						<ThRow2
							key={generateId('time', i)}
							data-js={generateId('time', i)}>
							{time}
						</ThRow2>
					))}
				</tr>
			</thead>
		);
	},
);

AttendanceTableHeader.displayName = 'AttendanceTableHeader';
export default AttendanceTableHeader;
