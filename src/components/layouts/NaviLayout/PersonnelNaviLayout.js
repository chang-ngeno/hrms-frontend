import React from "react";
import LogoutButton from "./LogoutButton";

import NaviProfile from "./NaviProfile";

export default function PersonnelNaviLayout(props) {
  const user = props.user

  const options = [
    { to: "/account", text: "Account", icon: "cog" },
    { to: "/dashboard", text: "Panel", icon: "pen square" },
    { to: "/workingTime", text: "Create Working time", icon: "clock" },
    { to: "/position/create", text: "Create Position", icon: "briefcase" },
  ]

  return (
    <>
      <NaviProfile name={user.firstName + " " + user.lastName} options={options} />
      <LogoutButton />
    </>
  );
}
