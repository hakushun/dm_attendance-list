import React from 'react';
import { Response as typeResponse } from '../../redux/modules/covids';
import styled from 'styled-components';
import { User } from '../../redux/modules/user';

const Wrapper = styled.div`
	margin-top: 10px;
	max-height: 50vh;
	max-width: 100vw;
	overflow: auto;
	padding: 0 0 10px;
`;
const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0 auto;
	position: relative;
	text-align: center;
`;
const Th = styled.th`
	background-color: #ff8c00;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	height: 16px;
	min-width: 115px;
	padding: 10px;
	position: sticky;
	top: 0;
	vertical-align: middle;
	z-index: 2;

	@media (max-width: 480px) {
		font-size: 14px;
		min-width: 90px;
	}
`;
const Td = styled.td`
	border: 1.5px solid #998e7a;
	font-size: 16px;
	max-width: 150px;
	padding: 10px;
	vertical-align: middle;

	@media (max-width: 480px) {
		font-size: 14px;
		padding: 5px;
	}
`;
const convertTimestamp = (seconds: number) => {
	const d = new Date(seconds);
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();
	const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	return timestamp;
};

type Props = {
	users: User[];
	targetData: typeResponse[];
};

const CovidAnsweredList: React.FC<Props> = React.memo(
	({ users, targetData }) => {
		return (
			<Wrapper>
				<Table id="covid_table_xlsx">
					<thead>
						<tr>
							<Th>パート</Th>
							<Th>名前</Th>
							<Th>Q1</Th>
							<Th>Q2</Th>
							<Th>Q3</Th>
							<Th>Timestamp</Th>
						</tr>
					</thead>
					<tbody>
						{targetData &&
							targetData.map((data, i) => {
								const targetUser =
									users &&
									users.find(
										(user) => user.id === data.userId,
									);
								return (
									<tr key={i}>
										<Td>{targetUser?.part}</Td>
										<Td>{targetUser?.name}</Td>
										<Td>
											{data.answers.q1 === 'no'
												? 'ない'
												: 'ある'}
										</Td>
										<Td>
											{data.answers.q2 === 'no'
												? 'ない'
												: 'ある'}
										</Td>
										<Td>
											{data.answers.q3 === 'no'
												? 'いない'
												: 'いる'}
										</Td>
										<Td>
											{convertTimestamp(data.timestamp)}
										</Td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Wrapper>
		);
	},
);

CovidAnsweredList.displayName = 'CovidAnsweredList';
export default CovidAnsweredList;
