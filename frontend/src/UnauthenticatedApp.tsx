import {Router, Route, Switch, Redirect, NavLink} from "react-router-dom";
import * as React from "react";
import {SkipNavLink, SkipNavContent} from "@reach/skip-nav";

import {createBrowserHistory} from "history";

import * as UI from "./ui";
import {EmailVerificationWindow} from "./EmailVerificationWindow";
import {ForgotPasswordWindow} from "./ForgotPasswordWindow";
import {LoginWindow} from "./LoginWindow";
import {Logo} from "./Logo";
import {NewPasswordWindow} from "./NewPasswordWindow";
import {RegistrationWindow} from "./RegistrationWindow";

const unauthenticatedAppBrowserHistory = createBrowserHistory();

function UnauthenticatedApp() {
	return (
		<Router history={unauthenticatedAppBrowserHistory}>
			<UI.Text as={SkipNavLink} variant="link" />
			<UnauthenticatedNavbar />
			<SkipNavContent />
			<UI.Column as="main" tabIndex={0}>
				<Switch>
					<Route exact path="/login">
						<LoginWindow />
					</Route>
					<Route exact path="/register">
						<RegistrationWindow />
					</Route>
					<Route exact path="/verify-email/:token">
						<EmailVerificationWindow />
					</Route>
					<Route exact path="/forgot-password">
						<ForgotPasswordWindow />
					</Route>
					<Route exact path="/new-password/:token">
						<NewPasswordWindow />
					</Route>
					<Redirect to="/login" />
				</Switch>
			</UI.Column>
		</Router>
	);
}

export default UnauthenticatedApp;

function UnauthenticatedNavbar() {
	return (
		<UI.Row as="nav" bg="gray-0" bw="2" bb="gray-2">
			<NavLink activeClassName="c-active-link" data-ml="12" data-mr="auto" exact to="/dashboard">
				<Logo />
			</NavLink>
			<UI.NavItem to="/register">Register</UI.NavItem>
			<UI.NavItem to="/login">Login</UI.NavItem>
		</UI.Row>
	);
}
