import React from "react";
import "./Headre.scss";
import {
    action_icon,
    code_icon,
  git_icon,
  issues_icon,
  menu_icon,
  noti_icon,
  pr_icon,
  profile_icon,
} from "../Common/icons";

const local_bar_menu = [

  {sp_class:'',
    icon: code_icon,
    text: "Code",
    cnt: null,
  },
  {sp_class:'',
    icon: issues_icon,
    text: "issues",
    cnt: '1.1k',
  },
  {sp_class:'removeOnMediaQuery',
    icon: pr_icon,
    text: "Pull Requests",
    cnt: 388,
  },
  {sp_class:'removeOnMediaQuery',
    icon: action_icon,
    text: "Actions",
    cnt: null,
  },
];

const LocalBarMenu = ({ menuData }) => {
  const { icon, text, cnt, sp_class } = menuData;
  return (
    <div className={`bar-menu-item hover ${sp_class} ${text==="Pull Requests"?'selected-bar-menu':'disable-menu-item'}`}>
    {icon}
      <div>{text}</div>
      {cnt &&  <div className="count-text">{cnt}</div>}
     
    </div>
  );
};

function Header() {
  return (
    <div className="page-header">
      <div className="globel-bar">
        <div className="globel-bar-left bar">
          <div className="button-border">{menu_icon}</div>
          <div>{git_icon}</div>
          <div className="repo-name"> facebook / react</div>
        </div>
        <div className="globel-bar-right bar">
          <div className="button-border removeOnMediaQuery_350px">{issues_icon}</div>{" "}
          <div className="button-border removeOnMediaQuery_350px">{pr_icon}</div>{" "}
          <div className="button-border removeOnMediaQuery_350px">{noti_icon}</div>
          <div className="profile-icon">{profile_icon}</div>
        </div>
      </div>
      <div className="local-bar ">
        {local_bar_menu.map((barMenu, i) => {
          return <LocalBarMenu key={i + barMenu.text} menuData={barMenu} />;
        })}
      </div>
    </div>
  );
}

export default Header;
