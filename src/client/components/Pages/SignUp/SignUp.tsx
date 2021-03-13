import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SecondaryButton from '../../Common/Buttons/SecondaryButton';
import QuaternaryButton from '../../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../../Common/Buttons/ButtonWrapper';
import Required from '../../Common/FormIcon/Required';
import Section from '../../Common/Section/Section';
import HeadingWrapper from '../../Common/Heading/HeadingWrapper';
import Heading from '../../Common/Heading/Heading2';
import DonutSpinner from '../../Common/Loading/DonutSpinner';
import { onChange } from '../../../declarations/types';

const FormWrapper = styled.div`
	font-weight: bold;
	margin: 0 auto;
	width: 320px;
`;
const InputGroup = styled.label`
	align-items: center;
	display: block;
	padding: 5px 0;
`;
const Input = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: block;
	font-size: 14px;
	margin: 5px auto 0;
	min-height: 20px;
	min-width: 230px;
	padding: 3px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}
`;
const Label = styled.span`
	align-items: center;
	display: flex;
	font-size: 16px;
	justify-content: center;
`;
const Wrapper = styled.div`
	padding: 15px 0;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	email: string;
	handleChangeEmail: onChange;
	password: string;
	handleChangePassword: onChange;
	loading: boolean;
	signup: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => Promise<void>;
};

const signUp: React.FC<Props> = React.memo(
	({
		email,
		handleChangeEmail,
		password,
		handleChangePassword,
		loading,
		signup,
	}) => {
		return (
			<Section id="signup" ariahidden="false">
				<form id="signup_form">
					<fieldset>
						<Legend>
							<HeadingWrapper>
								<Heading text="Sign Upフォーム" />
							</HeadingWrapper>
						</Legend>
						<FormWrapper>
							<InputGroup>
								<Label>
									Email:
									<Required />
								</Label>
								<Input
									type="email"
									autoFocus
									required
									aria-required="true"
									placeholder="Email address"
									name="email"
									value={email}
									onChange={(e) => handleChangeEmail(e)}
								/>
							</InputGroup>
							<InputGroup>
								<Label>
									Password:
									<Required />
								</Label>
								<Input
									type="password"
									required
									aria-required="true"
									placeholder="Password"
									name="new-password"
									value={password}
									onChange={(e) => handleChangePassword(e)}
								/>
							</InputGroup>
						</FormWrapper>
					</fieldset>
					{loading ? (
						<Wrapper>
							<DonutSpinner />
						</Wrapper>
					) : (
						<>
							<ButtonWrapper>
								<SecondaryButton
									text="Sign Up"
									method={(e) => signup(e)}
								/>
							</ButtonWrapper>
							<Wrapper>
								既に登録済みの方は下記よりログインください
								<ButtonWrapper>
									<Link
										to="/login"
										style={{ display: 'contents' }}>
										<QuaternaryButton text="Loginフォームへ" />
									</Link>
								</ButtonWrapper>
							</Wrapper>
						</>
					)}
				</form>
			</Section>
		);
	},
);

signUp.displayName = 'signUp';
export default signUp;
