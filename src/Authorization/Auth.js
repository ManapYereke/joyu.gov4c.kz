import React, { useState, useEffect, useRef } from 'react';

const Auth = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSended, setOtpSended] = useState(false);

    const getOtp = () => {
        setOtpSended(true);
        console.log(login, password)
    }

    const loginField = useRef(null);
    const passwordField = useRef(null);
    const otpField = useRef(null);
    const otpBtn = useRef(null);
    const confirmBtn = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (event.target === loginField.current && passwordField.current)
                passwordField.current.focus();
            else if (event.target === passwordField.current)
                otpBtn.current.click();
            else if (event.target === otpField.current)
                confirmBtn.current.focus()
        }
    }

    return (
        <div className="login-container">
            <img src="/img/con-logo.svg" alt="ИИС ЦОН 2.0 ВУ"></img>
            <form action="" id="login-form">
                <div className="login-msg">Удаление заявки ВУ</div>
                {!otpSended && (
                    <div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input form-control"
                                placeholder='Имя пользователя'
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={loginField} />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="input form-control"
                                placeholder='Пароль'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={passwordField} />
                        </div>
                        <div className="form-group">
                            <button
                                type='button'
                                className="con-btn form-control con-color"
                                onClick={getOtp}
                                ref={otpBtn}>Получить код</button>
                        </div>
                    </div>
                )}
                {otpSended && (
                    <div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input form-control"
                                placeholder='Имя пользователя'
                                value={login}
                                disabled />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="input form-control"
                                placeholder='Код из СМС'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={otpField} />
                        </div>
                        <div className="form-group">
                            <button
                                type='button'
                                className="con-btn form-control con-color"
                                ref={confirmBtn}>Подтвердить</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Auth;