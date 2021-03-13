import React, { useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getParts } from '../../redux/modules/parts';
import { changeState, getEvents } from '../../redux/modules/events';
import auth, {
	newEventsRef,
	newPartsRef,
	covidsRef,
	usersRef,
} from '../../lib/firebase';
import * as H from 'history';
import { setCurrentUser } from '../../redux/modules/currentUser';
import { getCovids } from '../../redux/modules/covids';
import { getUsers } from '../../redux/modules/users';
const AttendanceTable = lazy(() => import('../AttendanceTable'));
const Modal = lazy(() => import('../Modal'));
const Attendance = lazy(() => import('../Attendance'));
const Event = lazy(() => import('../Event'));
const Setting = lazy(() => import('../Setting'));
const CovidForm = lazy(() => import('../CovidForm'));
const CovidTable = lazy(() => import('../CovidTable'));

const MainWrapper = styled.main`
	padding: 20px 0;
`;
type Props = {
	history: H.History;
};

const home: React.FC<Props> = ({ history }) => {
	const dispatch = useDispatch();

	covidsRef.on('value', (snapshot) => {
		dispatch(getCovids(snapshot.val()));
	});
	usersRef.on('value', (snapshot) => {
		dispatch(getUsers(snapshot.val()));
	});
	/**
	 * 最新のEventsデータをstateに格納する
	 *
	 */
	newEventsRef.on('value', (snapshot) => {
		dispatch(getEvents(snapshot.val()));
		dispatch(changeState());
	});
	/**
	 * 最新のPartsデータをstateに格納する
	 *
	 */
	newPartsRef.on('value', (snapshot) => {
		dispatch(getParts(snapshot.val()));
	});

	// loginできていなければlogin formに遷移
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(setCurrentUser(user.email!));
				return;
			}
			history.push('/login');
		});
	}, []);

	return (
		<Suspense fallback={null}>
			<MainWrapper role="main">
				<Setting />
				<Event />
				<Attendance />
				<CovidForm />
				<AttendanceTable />
				<CovidTable />
				<Modal />
			</MainWrapper>
		</Suspense>
	);
};

export default home;
