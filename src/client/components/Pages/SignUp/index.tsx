import React, { useState, useEffect, useCallback } from 'react';
import auth from '../../../lib/firebase';
import SignUp from './SignUp';
import * as H from 'history';
import { onChange } from '../../../declarations/types';

type Props = {
	history: H.History;
};

const Component: React.FC<Props> = React.memo(({ history }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
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
	 * 入力されたemailとpasswordが有効か判断し、signupする関数
	 */
	const signup = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		setLoading(true);
		try {
			await auth.createUserWithEmailAndPassword(email, password);
			setLoading(false);
			history.push('/login');
		} catch (error) {
			setLoading(false);
			switch (error.code) {
				case 'auth/invalid-email':
					alert('メールアドレスを正しく入力してください。');
					break;
				case 'auth/weak-password':
					alert('６文字以上のパスワードを設定してください。');
					break;
				case 'auth/email-already-in-use':
					alert(
						`${email}は既に登録されています。\n LoginフォームよりLoginしてください。`,
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
		<SignUp
			email={email}
			handleChangeEmail={handleChangeEmail}
			password={password}
			handleChangePassword={handleChangePassword}
			loading={loading}
			signup={signup}
		/>
	);
});

Component.displayName = 'Component';
export default Component;
