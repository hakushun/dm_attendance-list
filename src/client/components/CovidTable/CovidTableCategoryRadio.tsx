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
	width: 200px;
`;
const Selection = styled.div`
	padding: 5px 0;
`;
const Category = styled.span`
	display: inline-block;
	padding: 5px 0;
`;
type Props = {
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CovidTableCategoryRadio: React.FC<Props> = React.memo(
	({ setSelectedCategory }) => {
		return (
			<Wrapper>
				<fieldset>
					<Legend>
						<Category>
							表示対象
							<Required />
						</Category>
					</Legend>
					<RadioGroup role="radiogroup" aria-required="true">
						<Selection>
							<Radio
								id="covid-table-unanswered"
								type="radio"
								value="unanswered"
								name="radio-category"
								onChange={(e) =>
									setSelectedCategory(e.target.value)
								}
							/>
							<RadioLabel htmlFor="covid-table-unanswered">
								未回答者
							</RadioLabel>
						</Selection>
						<Selection>
							<Radio
								id="covid-table-answered"
								type="radio"
								value="answered"
								name="radio-category"
								onChange={(e) =>
									setSelectedCategory(e.target.value)
								}
							/>
							<RadioLabel htmlFor="covid-table-answered">
								回答者
							</RadioLabel>
						</Selection>
					</RadioGroup>
				</fieldset>
			</Wrapper>
		);
	},
);

CovidTableCategoryRadio.displayName = 'CovidTableCategoryRadio';
export default CovidTableCategoryRadio;
