import React from 'react';
import styled from 'styled-components';
import { Event } from '../../redux/modules/event';
import AttendanceTableHeader from './AttendanceTableHeader';
import AttendanceTableBody from './AttendanceTableBody';
import Section from '../Common/Section/Section';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import {
	AddPrefix,
	onClickCell,
	onClickAncor,
	HighlightRow,
	onClickButton,
} from '../../declarations/types';
import { User } from '../../redux/modules/user';

const TableWrapper = styled.div`
	max-height: 60vh;
	max-width: 100vw;
	overflow: auto;
	padding: 0 0 10px;
`;
const TableInner = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0 auto;
	position: relative;
	text-align: center;
`;
const DescWrapper = styled.ul`
	line-height: 1.6;
	padding: 10px 0;
`;
const Description = styled.li`
	font-size: 14px;

	@media (max-width: 480px) {
		font-size: 12px;
	}
`;
type Props = {
	event: Event;
	users: User[];
	selectedProgram: string;
	addPrefix: AddPrefix;
	editAttendance: onClickAncor;
	highlightRow: HighlightRow;
	openModal: onClickCell;
	toggleBaloon: onClickAncor;
	changeDisplayName: () => void;
	hideColumns: onClickButton;
	showAllColumns: onClickButton;
};

const AttendanceTable: React.FC<Props> = React.memo(
	({
		event,
		users,
		selectedProgram,
		addPrefix,
		editAttendance,
		highlightRow,
		openModal,
		toggleBaloon,
		changeDisplayName,
		hideColumns,
		showAllColumns,
	}) => {
		return (
			<Section id="attendance_table" ariahidden="false">
				<HeadingWrapper>
					<Heading text={`${event.title}の出欠表`} />
				</HeadingWrapper>
				<DescWrapper>
					<Description>
						※出欠作成後の編集は、名前を選択してください
					</Description>
					<Description>
						※練習場所・内容の確認は、日付を選択してください
					</Description>
					<Description>
						※遅刻早退コメントの確認は、〇△×を選択してください
					</Description>
				</DescWrapper>
				<TableWrapper>
					<TableInner id="attendance_table_xlsx">
						<AttendanceTableHeader
							event={event}
							openModal={openModal}
							changeDisplayName={changeDisplayName}
							hideColumns={hideColumns}
							showAllColumns={showAllColumns}
						/>
						<AttendanceTableBody
							event={event}
							users={users}
							selectedProgram={selectedProgram}
							addPrefix={addPrefix}
							editAttendance={editAttendance}
							highlightRow={highlightRow}
							toggleBaloon={toggleBaloon}
						/>
					</TableInner>
				</TableWrapper>
			</Section>
		);
	},
);

AttendanceTable.displayName = 'AttendanceTable';
export default AttendanceTable;
