import React from 'react';
import Footer from './Footer';

const Component = React.memo(
	(): JSX.Element => {
		return <Footer />;
	},
);

Component.displayName = 'Component';
export default Component;
