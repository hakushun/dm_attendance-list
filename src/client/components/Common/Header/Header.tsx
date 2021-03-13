import React from 'react';
import styled from 'styled-components';
import auth from '../../../lib/firebase';
import NavButton from '../Buttons/NavButton';
import { onClickButton } from '../../../declarations/types';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCurrentUser,
	setCurrentUser,
} from '../../../redux/modules/currentUser';
import { isAdmin } from '../../../lib/utilFunctions';

const Header = styled.header`
	background-color: #ffb833;
	width: 100vw;
`;
const HeaderInner = styled.div`
	display: flex;
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 15px;
`;
const HeaderTitle = styled.h1`
	color: #fff;
	flex: 1 1 auto;
	font-size: 30px;
	font-weight: bold;
	padding: 15px 0;

	@media (max-width: 480px) {
		font-size: 22px;
	}
`;
type Props = {
	showEventForm: onClickButton;
	showSettingForm: onClickButton;
};

const header: React.FC<Props> = React.memo(
	({ showEventForm, showSettingForm }) => {
		const dispatch = useDispatch();
		const currentUser = useSelector(selectCurrentUser);

		const handleLogout = async () => {
			try {
				await auth.signOut();
				dispatch(setCurrentUser(''));
			} catch (error) {
				alert(error.message);
			}
		};

		return (
			<Header id="header" role="banner" aria-hidden="false">
				<HeaderInner>
					<HeaderTitle>出欠さん</HeaderTitle>
					{currentUser ? (
						<>
							{isAdmin(currentUser) && (
								<>
									<NavButton
										text="イベント作成"
										method={(e) => showEventForm(e)}
									/>
									<NavButton
										text="設定"
										method={(e) => showSettingForm(e)}
									/>
								</>
							)}
							<NavButton text="Logout" method={handleLogout} />
						</>
					) : null}
				</HeaderInner>
			</Header>
		);
	},
);

header.displayName = 'header';
export default header;
