import React from 'react';
import styled from 'styled-components';
import { User as typeUser } from '../../redux/modules/user';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const List = styled.li`
	display: flex;
	justify-content: center;
	padding: 5px 0;
`;
const Span = styled.span`
	padding: 0 10px;
`;
type Props = {
	unansweredUsers: typeUser[];
};

const CovidUnansweredList: React.FC<Props> = React.memo(
	({ unansweredUsers }) => {
		return (
			<Wrapper>
				<ul>
					{unansweredUsers &&
						unansweredUsers.map((u) => {
							return (
								<List key={u.id}>
									<Span>{u.part}</Span>
									<Span>{u.name}</Span>
								</List>
							);
						})}
				</ul>
			</Wrapper>
		);
	},
);

CovidUnansweredList.displayName = 'CovidUnansweredList';
export default CovidUnansweredList;
