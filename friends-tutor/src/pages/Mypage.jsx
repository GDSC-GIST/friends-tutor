import React from "react";
import * as Component from "components/Components";
import * as Styled from "styles/ComponentStyles";
import gohome from "img/gohome.png";
import changeLang from "img/changeLang.png";
import certificate from "img/certificateImg.png";
import white from "img/white.png";
import logout from "img/logout.png";
import Modal from "styles/styled-components/Modal";
import Modal2 from "styles/styled-components/Modal2";
import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import {FE_PATH, HOST} from "util/Enums";
import { LanguageChangeAtom, ModalMessageAtom,ModalDetailsAtom, MypageUserNameAtom, MypageUserGradeAtom} from "util/atom";
import { useNavigate } from "react-router-dom";



var Message=0;var Details=0;
function Mypage(props){
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [ModalMessage, setModalMessage] = useAtom(ModalMessageAtom); //eslint-disable-line no-unused-vars
  const [ModalDetails, setModalDetails] = useAtom(ModalDetailsAtom); //eslint-disable-line no-unused-vars
  const [data, setData] = useState(null); //eslint-disable-line no-unused-vars
  const [MypageUserName, setMypageUserName] = useAtom(MypageUserNameAtom);
  const [MypageUserGrade, setMypageUserGrade] = useAtom(MypageUserGradeAtom);
  const accessToken = localStorage.getItem('login-token');
  const [LanguageChange,setLanguageChange] = useAtom(LanguageChangeAtom); //eslint-disable-line no-unused-vars

  const getCheckCertificate = async() => {
    const response = await axios.get(`${HOST.address}:${HOST.port}/certificate/check`,{ //eslint-disable-line no-unused-vars
    headers : {Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setData(response.data.message);
        //console.log(response.data.message);
        //console.log(response.data.details);
        Message = response.data.message;
        Details = response.data.details;
        setModalMessage(Message);
        setModalDetails(Details);

      });
  }; 

  const userinfo = async() => {
    const response = await axios.get(`${HOST.address}:${HOST.port}/user/info`,{ //eslint-disable-line no-unused-vars
    headers : {Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setMypageUserName(response.data.details.name);
        setMypageUserGrade(response.data.details.grade);
      });
  };
  userinfo();
  //console.log(MypageUserName);
  //console.log(MypageUserGrade);
  const onClickButton = () => {
    

    getCheckCertificate().then((result)=>{
      if (Message===0 && Details === 0){
        setIsOpen(true);
      }
      else if (Message===1 && Details === 0){
        //console.log("0&1");
      }
      else if (Message === 1 && Details !==0){
        setIsOpen(true);
      }
      else if (Message===2 || Details ===2){
        //console.log("error");
      }
      
      
    })   
  };
  const onClickButton2 = () => {
    setIsOpen2(true);

  };

  const onClickLogout = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('refresh-token');
    navigate(FE_PATH.main);
  }

  var userinformation="USER INFORMATION";
  var home="Home";
  var Language="Language";
  var Certificate="Certificate";
  var Grade=`${MypageUserGrade}th grade`;
  var Logout = "Logout";

  if (LanguageChange===0){
    userinformation="USER INFORMATION";
    home="Home";
    Language="Language";
    Certificate="Certificate";
    Grade=`${MypageUserGrade}th grade`;
    Logout = "Logout";
  }
  else if(LanguageChange===1){
    userinformation="사용자정보";
    home="홈";
    Language="언어설정";
    Certificate="인증서발급";
    Logout = "로그아웃";
    if (MypageUserGrade>=1 && MypageUserGrade<=6){
      Grade=`초등학교 ${MypageUserGrade}학년`;
    }
    else if (MypageUserGrade>=7 && MypageUserGrade<=9){
      Grade=`중학교 ${MypageUserGrade-6}학년`;
    }
    else if (MypageUserGrade>=10 &&MypageUserGrade<=12){
      Grade=`고등학교 ${MypageUserGrade-9}학년`;
    };
  };
    return (<>
        <Component.Topbar />
        <Styled.MainBodyFrame bgcolor="var(--gray4)">
            <Styled.ThemedBox>
                <Styled.MypageTitle>{userinformation}</Styled.MypageTitle>
            </Styled.ThemedBox>
            <Styled.ThemedBoxUnder>
                <Styled.MypageName>
                    {MypageUserName}
                </Styled.MypageName>
                <Styled.MypageGrade>
                    {Grade}
                </Styled.MypageGrade>
            </Styled.ThemedBoxUnder>
            <Styled.ThemedBoxRound>
              <Styled.MypageButton onClick={()=>{navigate(FE_PATH.course.list)}}>
                <img src={gohome} alt="gohome"></img>
                <Styled.MypageText>{home}</Styled.MypageText>
              </Styled.MypageButton>


              <Styled.MypageButton  onClick={onClickButton}>
                <img src={certificate} alt="certificate"></img>
                <Styled.MypageText>
                  {Certificate}
                </Styled.MypageText>
              </Styled.MypageButton>

                    {isOpen && (<Modal
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
                if (Message===0 && Details===0) {
                navigate(FE_PATH.mypage.certificate);
              }
                    }}
                  />)}

              <Styled.MypageButton onClick={onClickButton2}>
                <img src={changeLang} alt="changeLang"></img>
                <Styled.MypageText>{Language}</Styled.MypageText>
              </Styled.MypageButton>

              {isOpen2 && (<Modal2
              open={isOpen2}
              onClose={() => {
                setIsOpen2(false);
                    }}
                  />)}

              <Styled.MypageButton onClick={onClickLogout}>
                <img src={logout} alt="logout"></img>
                <Styled.MypageText>{Logout}</Styled.MypageText>
              </Styled.MypageButton>

              <Styled.MypageButton><img src={white} alt="white"></img><Styled.MypageText> </Styled.MypageText></Styled.MypageButton>
              <Styled.MypageButton><img src={white} alt="white"></img><Styled.MypageText> </Styled.MypageText></Styled.MypageButton>
              <Styled.MypageButton><img src={white} alt="white"></img><Styled.MypageText> </Styled.MypageText></Styled.MypageButton>
              <Styled.MypageButton><img src={white} alt="white"></img><Styled.MypageText> </Styled.MypageText></Styled.MypageButton>
        </Styled.ThemedBoxRound>
        </Styled.MainBodyFrame>
    </>);
}

export {Mypage};