import './Register.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Register(){
    const USER_REGEX = /^[a-zA-z0-9]{4,12}$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //오류메시지
    const [errorMessage, setErrorMessage] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    //유효성검사
    const [isId, setIsId] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    //중복검사
    const duplicateId = useRef(null);
    const duplicateEmail = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(id && name && email && password != null){
            axios.post('http://localhost:8080/user/register', {
                id: id,
                name: name,
                email: email,
                password: password,
                role: 'user'
            })
            .then(response => {
                console.log(response.data);
                alert(name + "님, 가입을 환영합니다!");
                navigate('/login');
            })
            .catch(error => {
                setErrorMessage(error.response.data || "Register failed");
                console.error(error);
                alert("가입이 실패하였습니다.");
            });
        }else alert("정보를 모두 입력해주세요.");
    };

    const idCheck = (e) => {
        e.preventDefault();
        if(id != '' && id != null){
            axios.post('http://localhost:8080/user/loginCheck', {
                id: id
            })
            .then(response => {
                console.log(response.data);
                alert("사용 가능한 아이디입니다.");
            })
            .catch(error => {
                console.log(error);
                alert("해당 아이디가 이미 존재합니다.");
                if(duplicateId.current){
                    duplicateId.current.focus();
                }
            })
        } else alert("입력해주세요.");
    }

    const emailCheck = (e) => {
        e.preventDefault();
        if(email != '' && email != null){
            axios.post('http://localhost:8080/user/loginCheck', {
                email: email
            })
            .then(response => {
                console.log(response.data);
                alert("사용 가능한 이메일입니다.");
            })
            .catch(error => {
                console.log(error);
                alert("해당 이메일이 이미 존재합니다.");
                if(duplicateEmail.current){
                    duplicateEmail.current.focus();
                }
            })
        } else alert("입력해주세요.");
    }

    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[a-zA-Z0-9]{4,12}$/;

        if(!idRegExp.test(currentId)){
            setIdMessage("4-12자리 사이 대소문자 또는 숫자만 입력해주세요.");
            setIsId(false);
        }else {
            setIdMessage("");
            setIsId(true);
        }
    };

    const onChangePassword = (e) => {
      const currentPassword = e.target.value;
      setPassword(currentPassword);

      const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegExp.test(currentPassword)) {
        setIsPassword(false);
        setPasswordMessage({
          text: "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.",
          color: "red"
        });
      } else {
        setIsPassword(true);
        setPasswordMessage({
          text: "안전한 비밀번호입니다.",
          color: "green"
        });
      }
    };

     const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        // .com과 .co.kr 형식도 가능
        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegExp.test(currentEmail)) {
          setEmailMessage("이메일의 형식이 올바르지 않습니다.");
          setIsEmail(false);
        } else {
          setEmailMessage("");
          setIsEmail(true);
        }
      };

    return(
    <div className="container-wrapper">
      <div class="card-container">
          <div className="p-5">
            <div className="mb-5">
              <h3 className="h3 font-weight-bold text-theme">회원가입</h3>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="yourName">이름</label>
                <p></p>
                <input type="text" className="form-control" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
              </div>

              <label htmlFor="yourId">아이디</label>
              <p className="idMessage" style={{color: 'red'}} > {idMessage} </p>
              <div className="form-group" style={{display: "flex", border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden"}}>
                <input
                  type="text"
                  className="form-control" id="id" value={id} onChange={onChangeId} ref={duplicateId}
                  style={{flex: "1", padding: "10px", border: "none", outline: "none"}}
                />
                <button onClick={idCheck} style={{padding: "10px 25px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer"}}>
                  중복확인
                </button>
              </div>

              <label htmlFor="exampleInputEmail1">이메일</label>
              <p className="emailMessage" style={{color: 'red'}} > {emailMessage} </p>
              <div className="form-group" style={{display: "flex", border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden"}}>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={onChangeEmail}
                  ref={duplicateEmail}
                  style={{flex: "1", padding: "10px", border: "none", outline: "none"}}
                />
                <button onClick={emailCheck} style={{padding: "10px 25px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer"}}>
                  중복확인
                </button>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="exampleInputPassword1">비밀번호</label>
                <p className="passwordMessage" style={{color: passwordMessage.color}}> {passwordMessage.text} </p>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <button type="submit" onClick={handleSubmit} className="btn btn-theme">
                가입하기
              </button>
            </form>
          </div>
          <p className="text-muted text-center mt-3 mb-0">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="text-primary ml-1">
              로그인
            </a>
          </p>
      </div>
    </div>
    )
}

export default Register;