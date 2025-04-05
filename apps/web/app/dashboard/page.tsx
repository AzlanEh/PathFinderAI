import React from "react";
import SideNavbar from "../component/sideNav";

const Dashboard = () => {
	return (
		<>
			<div className="flex h-screen">
				<SideNavbar />
				<div>
					<p className="text-black">dashboard</p>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
