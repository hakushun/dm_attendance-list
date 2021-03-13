import React from 'react';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
const Radio = styled.input`
	cursor: pointer;
	margin: 0;
`;
const RadioLabel = styled.label`
	cursor: pointer;
	margin-left: 5px;
`;
const RadioGroup = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	padding: 5px 0;
	width: 150px;
`;
const Selection = styled.div`
	padding: 5px 0;
`;
const Question = styled.span`
	display: inline-block;
	line-height: 1.2;
	width: 450px;

	@media (max-width: 480px) {
		width: 100%;
	}
`;
type Props = {
	answers: { [s: string]: string };
	setAnswers: React.Dispatch<
		React.SetStateAction<{
			[s: string]: string;
		}>
	>;
};

const CovidRadio: React.FC<Props> = React.memo(({ answers, setAnswers }) => {
	return (
		<>
			<Wrapper>
				<fieldset>
					<Legend>
						<Question>
							37.5℃以上の熱はありますか？
							<Required />
						</Question>
					</Legend>
					<RadioGroup role="radiogroup" aria-required="true">
						<Selection>
							<Radio
								id="covid-q1-0"
								type="radio"
								value="no"
								name="q1"
								checked={answers.q1 === 'no'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q1: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q1-0">ない</RadioLabel>
						</Selection>
						<Selection>
							<Radio
								id="covid-q1-1"
								type="radio"
								value="yes"
								name="q1"
								checked={answers.q1 === 'yes'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q1: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q1-1">ある</RadioLabel>
						</Selection>
					</RadioGroup>
				</fieldset>
			</Wrapper>
			<Wrapper>
				<fieldset>
					<Legend>
						<Question>
							普段しないような咳の症状はありますか？
							<Required />
						</Question>
					</Legend>
					<RadioGroup role="radiogroup" aria-required="true">
						<Selection>
							<Radio
								id="covid-q2-0"
								type="radio"
								value="no"
								name="q2"
								checked={answers.q2 === 'no'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q2: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q2-0">ない</RadioLabel>
						</Selection>
						<Selection>
							<Radio
								id="covid-q2-1"
								type="radio"
								value="yes"
								name="q2"
								checked={answers.q2 === 'yes'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q2: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q2-1">ある</RadioLabel>
						</Selection>
					</RadioGroup>
				</fieldset>
			</Wrapper>
			<Wrapper>
				<fieldset>
					<Legend>
						<Question>
							同居人、学校、会社の濃厚接触者の中で、
							<br />
							2週間以内に体調不良*の人がいませんか？
							<br />
							（*熱が37.5℃以上ある、もしくはコロナの
							<br />
							感染が疑わしい症状がある人）
							<Required />
						</Question>
					</Legend>
					<RadioGroup role="radiogroup" aria-required="true">
						<Selection>
							<Radio
								id="covid-q3-0"
								type="radio"
								value="no"
								name="q3"
								checked={answers.q3 === 'no'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q3: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q3-0">いない</RadioLabel>
						</Selection>
						<Selection>
							<Radio
								id="covid-q3-1"
								type="radio"
								value="yes"
								name="q3"
								checked={answers.q3 === 'yes'}
								onChange={(e) => {
									setAnswers({
										...answers,
										q3: e.target.value,
									});
								}}
							/>
							<RadioLabel htmlFor="covid-q3-1">いる</RadioLabel>
						</Selection>
					</RadioGroup>
				</fieldset>
			</Wrapper>
		</>
	);
});

CovidRadio.displayName = 'CovidRadio';
export default CovidRadio;
