import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/user/login', {
            email: email,
            password: password
        })
        .then(response => {
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            window.location.href = '/MailList';
        })
        .catch(error => {
            setErrorMessage(error.response.data || "Login failed");
            console.error(error);
            alert("로그인에 실패하였습니다.");
            if(passwordRef.current) {
                passwordRef.current.focus();
            }
        });
    };

    return (
        <div className="lgn-container-wrapper">
          <div class="lgn-card-container">
            <div>
            <div className="p-5">
                <div className="mb-5">
                <h3 className="h3 font-weight-bold text-theme">로그인</h3>
                </div>

                <form onSubmit = {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">이메일</label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="exampleInputPassword1">비밀번호</label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    ref={passwordRef}
                    />
                </div>
                <button type="submit" className="btn btn-theme">
                    로그인
                </button>
                <a
                    href="#forgot-password"
                    className="forgot-link float-right text-primary"
                >
                    비밀번호를 잊어버리셨나요?
                </a>

                <p className="text-muted text-center mt-3 mb-0">
                    계정이 없으신가요?{" "}
                    <a href="/register" className="text-primary ml-1">
                    가입하기
                    </a>
                </p>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Login;