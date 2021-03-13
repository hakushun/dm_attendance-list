// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import React, { lazy, Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
const Home = lazy(() => import('./components/Pages/Home'));
const SignUp = lazy(() => import('./components/Pages/SignUp'));
const Login = lazy(() => import('./components/Pages/Login'));

const GlobalStyle = createGlobalStyle`
	${reset}
	body {
		background-color: #ffedcc;
		color: #333;
		font-family: 'Noto Sans', 'Noto Sans JP', sans-serif;
	}

	a:focus {
		outline: auto;
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export const App = (): JSX.Element => {
	return (
		<Wrapper>
			<GlobalStyle />
			<Header />
			<Suspense fallback={null}>
				<Router>
					<Route
						exact
						path="/"
						render={(props) => <Home {...props} />}></Route>
					<Route exact path="/signup" component={SignUp}></Route>
					<Route exact path="/login" component={Login}></Route>
				</Router>
			</Suspense>
			<Footer />
		</Wrapper>
	);
};
