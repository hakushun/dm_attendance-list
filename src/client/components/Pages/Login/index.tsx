import React, { useState, useEffect, useCallback } from 'react';
import auth from '../../../lib/firebase';
import Login from './Login';
import * as H from 'history';
import { onChange } from '../../../declarations/types';

type Props = {
	history: H.History;
};

const Component: React.FC<Props> = React.memo(({ history }) => {
	const [email, setEmail] = useState<string>('sample@sample.com');
	const [password, setPassword] = useState<string>('Sample!');
	const [loading, setLoading] = useState<boolean>(false);

	/**
	 * emailの入力を制御する関数
	 */
	const handleChangeEmail: onChange = useCallback(
		(e) => {
			setEmail(e.target.value);
		},
		[setEmail],
	);

	/**
	 * passwordの入力を制御する関数
	 */
	const handleChangePassword: onChange = useCallback(
		(e) => {
			setPassword(e.target.value);
		},
		[setPassword],
	);

	/**
	 * 入力されたemailとpasswordが有効か判断し、loginする関数
	 */
	const login = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		setLoading(true);
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setLoading(false);
			history.push('/');
		} catch (error) {
			setLoading(false);
			switch (error.code) {
				case 'auth/invalid-email':
					alert('メールアドレスを正しく入力してください。');
					break;
				case 'auth/wrong-password':
					alert(
						'パスワードが違います。\nパスワードを忘れた方は管理者に連絡してください。',
					);
					break;
				case 'auth/user-not-found':
					alert(
						`${email}は登録されていません\n利用登録してない方はSign Upフォームより登録してください。`,
					);
					break;
				default:
					alert(`${error.code}\n${error.message}`);
					break;
			}
		}
	};

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user && history.push('/');
		});
	}, []);

	return (
		<Login
			email={email}
			handleChangeEmail={handleChangeEmail}
			password={password}
			handleChangePassword={handleChangePassword}
			loading={loading}
			login={login}
		/>
	);
});

Component.displayName = 'Component';
export default Component;
