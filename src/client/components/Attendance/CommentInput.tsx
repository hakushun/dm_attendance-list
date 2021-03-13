import React from 'react';
import styled from 'styled-components';
import Optional from '../Common/FormIcon/Optional';
import { User } from '../../redux/modules/user';

const InputWrapper = styled.div`
	padding: 10px 0;
`;
const AreaLabel = styled.label`
	display: block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px;
`;
const Textarea = styled.textarea`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	font-size: 14px;
	font-weight: bold;
	max-height: 250px;
	min-height: 50px;
	resize: vertical;
	width: 250px;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	user: User;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
};

const commentInput: React.FC<Props> = React.memo(({ user, handleChange }) => {
	return (
		<InputWrapper>
			<fieldset>
				<Legend>
					<AreaLabel htmlFor="user_comment">
						コメント
						<Optional />
					</AreaLabel>
				</Legend>
				<Textarea
					id="user_comment"
					maxLength={200}
					name="comment"
					value={user.comment}
					onChange={(e) => handleChange(e)}
				/>
			</fieldset>
		</InputWrapper>
	);
});

commentInput.displayName = 'commentInput';
export default commentInput;
