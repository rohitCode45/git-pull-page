import React, { useEffect, useState } from "react";
import "./PrView.scss";
import axios from "axios";
import { GET_PR, accessToken } from "../Common/endpoints";
import {
  close_pr_icon,
  comments_icon,
  open_pr_icon,
  pr_icon,
} from "../Common/icons";

const AUTH_TOKEN = `Bearer ${accessToken}`;
const filterButtons = [
  { icon: open_pr_icon, text: "Open" },
  { icon: close_pr_icon, text: "Closed" },
];

const PrRow = ({ prInfo, currentPrs }) => {
  const { comments_url, number, user, title } = prInfo;
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    getCommentCount(comments_url);
  }, []);
  const getCommentCount = (getCommentCount) => {
    const headers = {
      Authorization: AUTH_TOKEN,
    };
    axios
      .get(comments_url, {
        headers: headers,
      })
      .then((res) => {
        const cnt = res.data.length;
        setCommentCount(cnt);
      });
  };
  return (
    <div className="pr-row">
      <div className="left-side">
        <div className={`icon-title1 ${currentPrs === "Open" ? 'open-pr-icon' : 'close-pr-icon'}`}>
          {currentPrs === "Open" ? open_pr_icon : close_pr_icon}
          {title}
        </div>
        <div className="number-auther">{`#${number} by ${user}`}</div>
      </div>
      {commentCount > 0 && (
        <div className="right-side removeOnMediaQuery">
          {comments_icon}
          {commentCount}
        </div>
      )}
    </div>
  );
};

const initPrList = [];
function PrView() {
  const [prList, setPrList] = useState(initPrList);
  const [currentPrs, setCurrentPrs] = useState("Open");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getPrList(currentPrs);
  }, [currentPrs]);
  const getPrList = async (currentPrs) => {
    setLoader(true);
    const queryParams = {
      state: currentPrs.toLowerCase(),
    };
    const headers = {
      Authorization: AUTH_TOKEN,
    };
    axios
      .get(GET_PR, {
        params: queryParams,
        headers: headers,
      })
      .then((res) => {
        const RESPONSE = res.data ?? [];
        const _prList = [];
        RESPONSE.forEach((pr) => {
          const { title, number, user, comments_url } = pr;
          const _prInfo = {
            title,
            number,
            user: user.login,
            comments_url,
          };
          _prList.push(_prInfo);
        });
        setPrList(_prList);
        setLoader(false);
      })
      .catch((err) => {});
  };
  return (
    <div className="pr-view">
      <div className={`pr-container ${loader ? "skeleton" : ""}`}>
        <div className="filters">
          {filterButtons.map((btn) => {
            return (
              <div
                onClick={() => {
                  setCurrentPrs(btn.text);
                }}
                className={`filterButton ${
                  btn.text === currentPrs ? "selectedFilter" : ""
                }`}
              >
                {btn.icon} {btn.text}
              </div>
            );
          })}
        </div>
        {prList.map((pr, i) => {
          return (
            <PrRow key={pr.user + i} prInfo={pr} currentPrs={currentPrs} />
          );
        })}
      </div>
    </div>
  );
}

export default PrView;
