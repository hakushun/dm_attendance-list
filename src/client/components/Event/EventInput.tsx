import React from 'react';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';
import Optional from '../Common/FormIcon/Optional';

const EventInputWrapper = styled.div`
	padding: 5px 0;
`;
const EventLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
`;
const EventNameInput = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	min-height: 22px;
	min-width: 230px;
	padding: 5px 10px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}
`;
const EventTextarea = styled.textarea`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	max-height: 500px;
	min-height: 50px;
	padding: 5px 10px;
	resize: vertical;
	width: 230px;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	title: string;
	detail: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setDetail: React.Dispatch<React.SetStateAction<string>>;
};
const eventInput: React.FC<Props> = React.memo(
	({ title, detail, setTitle, setDetail }) => {
		return (
			<>
				<EventInputWrapper>
					<fieldset>
						<Legend>
							<EventLabel htmlFor="event_title">
								イベント名
								<Required />
							</EventLabel>
						</Legend>
						<EventNameInput
							id="event_title"
							autoFocus
							required
							aria-required="true"
							placeholder="イベント名を入力ください"
							type="text"
							maxLength={30}
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</fieldset>
				</EventInputWrapper>
				<EventInputWrapper>
					<fieldset>
						<Legend>
							<EventLabel htmlFor="event_detail">
								イベント詳細
								<Optional />
							</EventLabel>
						</Legend>
						<EventTextarea
							id="event_detail"
							placeholder="イベント詳細を入力ください"
							maxLength={1000}
							value={detail}
							onChange={(e) => {
								setDetail(e.target.value);
							}}
						/>
					</fieldset>
				</EventInputWrapper>
			</>
		);
	},
);

eventInput.displayName = 'eventInput';
export default eventInput;
