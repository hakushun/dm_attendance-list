import React from 'react';
import styled from 'styled-components';
import Part from '../Part';
import Program from '../Program';
import Role from '../Role';
import Practice from '../Practice';
import SectionWithBorder from '../Common/Section/SectionWithBorder';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading2';
import { onClickAncor, onKeyDownAnchor } from '../../declarations/types';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const TabWrapper = styled.ul`
	display: flex;
	margin: 0 auto;
	width: 500px;

	@media (max-width: 480px) {
		width: calc(100vw - 35px);
	}
`;
const Tab = styled.li`
	&:not(:first-child) {
		margin-left: 5px;
	}
`;
const TabLink = styled.a`
	background-color: #a9a9a9;
	border: 2px solid #a9a9a9;
	border-radius: 5px 5px 0 0;
	color: #fff;
	display: block;
	font-weight: bold;
	padding: 10px 15px;
	text-decoration: none;

	&:hover {
		background-color: #fff;
		color: #a9a9a9;
	}

	&:focus {
		background-color: #fff;
		color: #a9a9a9;
		outline-color: #ff0059;
		outline-offset: 3px;
	}

	&[aria-selected='true'] {
		background-color: #ff8c00;
		border: 2px solid #ff8c00;

		&:hover {
			background-color: #fff;
			color: #ff8c00;
		}

		&:focus {
			background-color: #fff;
			color: #ff8c00;
			outline-offset: 3px;
		}
	}

	@media (max-width: 480px) {
		font-size: 14px;
		padding: 10px;
	}
`;
type Props = {
	changeTabpanel: onClickAncor;
	keyDownTablist: onKeyDownAnchor;
};

const setting: React.FC<Props> = React.memo(
	({ changeTabpanel, keyDownTablist }) => {
		return (
			<SectionWithBorder id="setting" ariahidden="false">
				<HeadingWrapper>
					<Heading text="各種設定" />
				</HeadingWrapper>
				<Wrapper>
					<TabWrapper role="tablist">
						<Tab role="presentation">
							<TabLink
								href="#practice"
								role="tab"
								aria-controls="panel1"
								aria-selected="true"
								onClick={(e) => changeTabpanel(e)}
								onKeyDown={(e) => keyDownTablist(e)}>
								練習予定
							</TabLink>
						</Tab>
						<Tab role="presentation">
							<TabLink
								href="#program"
								role="tab"
								aria-controls="panel2"
								tabIndex={-1}
								onClick={(e) => changeTabpanel(e)}
								onKeyDown={(e) => keyDownTablist(e)}>
								プログラム
							</TabLink>
						</Tab>
						<Tab role="presentation">
							<TabLink
								href="#role"
								role="tab"
								aria-controls="panel3"
								tabIndex={-1}
								onClick={(e) => changeTabpanel(e)}
								onKeyDown={(e) => keyDownTablist(e)}>
								乗り番
							</TabLink>
						</Tab>
						<Tab role="presentation">
							<TabLink
								href="#part"
								role="tab"
								aria-controls="panel4"
								tabIndex={-1}
								onClick={(e) => changeTabpanel(e)}
								onKeyDown={(e) => keyDownTablist(e)}>
								パート
							</TabLink>
						</Tab>
					</TabWrapper>
					<Practice />
					<Program />
					<Role />
					<Part />
				</Wrapper>
			</SectionWithBorder>
		);
	},
);

setting.displayName = 'setting';
export default setting;
