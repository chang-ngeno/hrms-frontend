import React from "react";
import LogoutButton from "./LogoutButton";

import NaviProfile from "./NaviProfile";

export default function EmployeeNaviLayout(props) {
  const user = props.user

  const options = [
    { to: "/account", text: "Account", icon: "cog" },
    { to: `/profile/${props.user.userId}`, text: "Profile", icon: "user" },
    { to: "/resume", text: "Resume", icon: "newspaper" },
  ]
  return (
    <>
      <NaviProfile name={user.firstName + " " + user.lastName} options={options} />
      <LogoutButton />
    </>
  );
}
