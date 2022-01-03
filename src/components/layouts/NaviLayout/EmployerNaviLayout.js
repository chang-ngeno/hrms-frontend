import React from "react";
import LogoutButton from "./LogoutButton";

import NaviProfile from "./NaviProfile";

export default function EmployerNaviLayout(props) {
  const user = props.user

  const options = [
    { to: "/account", text: "Account", icon: "cog" },
    { to: `/profile/${props.user.userId}`, text: "Profile", icon: "user" },
    { to: "/jobAdvertisement/create", text: "Create Job Advertisement", icon: "plus" },
  ]
  return (
    <>
      <NaviProfile name={user.companyName} options={options} />
      <LogoutButton />
    </>
  );
}
