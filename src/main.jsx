import React, {useContext} from "react";
import {AuthContext} from "./authContext";
import {Routes, Route, Navigate} from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
	switch (role) {
		case "admin":
			return (
				<Routes>
					<Route path="/admin/dashboard" element={<AdminDashboardPage />} />
				</Routes>
			);
			break;
		default:
			return (
				<Routes>
					<Route path="">
						<Route path="/" index element={<AdminLoginPage />} />
						<Route path="*" exact element={<NotFoundPage />} />
					</Route>
				</Routes>
			);
			break;
	}
}

function Main() {
	const {state} = useContext(AuthContext);

	return (
		<div className="h-full">
			<div className="flex w-full ">
				<div className="w-full">
					<div className="page-wrapper w-full ">
						{!state.isAuthenticated
							? renderRoutes("none")
							: renderRoutes(state.role)}
					</div>
				</div>
			</div>
			<SnackBar />
		</div>
	);
}

export default Main;
