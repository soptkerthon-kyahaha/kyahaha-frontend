import React, { useState, useEffect, useRef } from "react";
import style from "styled-components";

const BackContainer = style.div`
    display: ${(props) => (props.isClick ? "block" : "none")};
    position: absolute;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height : 100vh;
    background: rgba(0, 0, 0, 0.7);
`;

const Wrap = style.div`
    position: absolute;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
`;

const ModalContainer = style.div`
display : flex;
flex-direction:column;
align-items:center;
position : absolute;
width: 75.6250vw;
height: 20.2778vw;
color: white;
`;
const DateContainer = style.div`
display: flex;
justify-content:center;
align-items:center;
width: 40.9722vw;
height: 5.1389vw;
font-weight: bold;
font-size: 3.4722vw;
line-height: 5.1389vw;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TimeContainer = style.div`
display: flex;
justify-content:center;
align-items:center;
width: 72.6806vw;
height: 15.4167vw;
font-weight: bold;
font-size: 9.4167vw;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Button = style.div`
margin-top: 25vw;
display : flex;
justify-content:center;
align-items:center;
background: #EF8138;
width: 32.9861vw;
height: 6.2500vw;
border: 1px solid #EF8138;
border-radius: 7.4306vw;
font-weight: bold;
font-size: 3.4722vw;
line-height: 5.1389vw;
cursor : pointer;
color: white;
`;
const Modal = ({ isClick, history }) => {
  let date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const clockDate = date.getDate();
  const day = date.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [hour, setHour] = useState(0); // 0으로 초기화 바뀌는 state부분을 생각
  const [minute, setMinute] = useState(0); // 0으로 초기화 바뀌는 state부분을 생각
  const [second, setSecond] = useState(0); // 0으로 초기화 바뀌는 state부분을 생각
  const [mili, setMili] = useState(0);
  const [paused, setPaused] = useState(false);
  const [buttonText, setButtonText] = useState("멈추면 보이는 것들");

  const tmp = useRef(); // 변경가능한 값을 담고 있는 상자
  const onAutoIncrease = () => {
    setHour(date.getHours());
    setMinute(date.getMinutes());
    setSecond(date.getSeconds());
    setMili(date.getMilliseconds());
  };
  // react에서 Interval 사용할때 아래와 같이 사용해아함
  useEffect(() => {
    // if (paused) {
    tmp.current = onAutoIncrease;
    // }
  });

  useEffect(() => {
    function tick() {
      if (!paused) {
        tmp.current();
      }
    }
    let id = setInterval(tick, 2);
    return () => clearInterval(id);
  }, [paused]);

  const onHandleClick = (e) => {
    e.preventDefault();
    setButtonText("이제 조금 쉬어요 :)");
    setPaused((prev) => !prev);
    setTimeout(() => history.push("/healing"), 3000);
  };

  return (
    <>
      <BackContainer isClick={isClick}>
        <Wrap>
          <ModalContainer>
            <DateContainer>
              {year}년 {month + 1}월 {clockDate}일 {week[day]}요일
            </DateContainer>
            <TimeContainer>
              {hour.toLocaleString().padStart(2, "0")} :{" "}
              {minute.toLocaleString().padStart(2, "0")} :{" "}
              {second.toLocaleString().padStart(2, "0")} :{" "}
              {mili.toLocaleString().padStart(3, "0")}
            </TimeContainer>
          </ModalContainer>
          <Button onClick={onHandleClick}>{buttonText}</Button>
        </Wrap>
      </BackContainer>
    </>
  );
};

export default Modal;
