import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
	background-color: #d2691e;
	margin-top: auto;
	text-align: center;
`;
const FooterWrapper = styled.div`
	padding: 10px 0;
`;

const footer = React.memo(
	(): JSX.Element => {
		return (
			<Footer id="footer" aria-hidden="false">
				<FooterWrapper>
					<small>© 2020 Fellow Orchestra</small>
				</FooterWrapper>
			</Footer>
		);
	},
);

footer.displayName = 'footer';
export default footer;
