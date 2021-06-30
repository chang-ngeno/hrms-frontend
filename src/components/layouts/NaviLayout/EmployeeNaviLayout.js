import React from "react";
import LogoutButton from "./LogoutButton";

import NaviButton from "./NaviButton";
import NaviProfile from "./NaviProfile";

export default function EmployeeNaviLayout(props) {
  const user = props.user

  const options = [
    { to: "/account", text: "Hesap", icon: "cog" },
    { to: `/employee/${props.user.userId}`, text: "Profil", icon: "user" },
    { to: "/resume", text: "Özgeçmiş", icon: "newspaper" },
  ]
  return (
    <>
      <NaviProfile name={user.firstName + " " + user.lastName} options={options} />
      <LogoutButton />
    </>
  );
}
