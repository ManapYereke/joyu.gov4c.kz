import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Admin = () => {
    const [applicationId, setApplicationId] = useState('');
    const [archivedApps, setArchivedApps] = useState(null);

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [iin, setIin] = useState();
    const [permissionType, setPermissionType] = useState("user");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate();

    const filterDigits = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setApplicationId(numericValue);
    };

    const getArchivedApp = async () => {
        setArchivedApps(null);
        try {
            const response = await axios.get(`/api/admin/archive/${applicationId}`, {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            });
            setArchivedApps(response.data);
        } catch (error) {
            console.error('Error reading file:', error);
            if (error.response) {
                if ([401, 403].includes(error.response.status)) {
                    localStorage.removeItem("access_token");
                    sessionStorage.setItem("redirect", "/admin");
                    navigate('/auth');
                }
            }
        }
    }

    const addUser = async () => {
        try {
            const requestData = {
                login,
                password,
                iin,
                permission_type: permissionType,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber
            }
            const response = await axios.post(`/api/admin/register`, requestData, {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            });
            if (response.status === 200) {
                alert("Success");
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                if ([401, 403].includes(error.response.status)) {
                    localStorage.removeItem("access_token");
                    sessionStorage.setItem("redirect", "/admin");
                    navigate('/auth');
                }
            }
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            sessionStorage.setItem("redirect", "/admin");
            navigate('/auth');
        }
        /*const checkTokenExpiration = () => {
            // Проверка срока действия accessToken
            // Если срок истек, обновляем токены через refreshToken
            // Для примера, здесь может быть ваша логика проверки срока действия токенов
        };

        const intervalId = setInterval(checkTokenExpiration, 60000); // Проверка каждую минуту
        return () => clearInterval(intervalId);*/
    }, []);


    return (
        <div>
            <h1 className='title'>Админ просмотра удаленных заявок ВУ ИИС ЦОН 2.0</h1>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Проверка заявки</Tab>
                    <Tab>Добавление пользователя</Tab>
                </TabList>

                <TabPanel>
                    <div className="main-container">
                        <form id="app-form">
                            <div className="form-group">
                                <label htmlFor="applicationId">Номер заявки</label>
                                <input
                                    type="text"
                                    id="applicationId"
                                    className="input form-control"
                                    placeholder='Номер заявки'
                                    maxLength={12}
                                    value={applicationId}

                                    onChange={(e) => filterDigits(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button
                                    type='button'
                                    className="con-btn form-control con-color"
                                    onClick={getArchivedApp}>Получить данные</button>
                            </div>
                        </form>
                        {Array.isArray(archivedApps) && archivedApps.length > 0 && (
                            <div className="result">
                                {archivedApps.map(app => (
                                    <div key={app.applicationId}>
                                        <p>Номер заявки: {app.application_id}</p>
                                        <p>Дата и время архивации: {app.archive_date.substring(0, 19)}</p>
                                        <p>Вид экзамена: {app.exam_type === "DRIVING" ? "Вождение" : app.exam_type === "THEORY" ? "Теория" : "Неизвестно"}</p>
                                        <p>ФИО оператора: {`${app.operator_first_name} ${app.operator_last_name}`}</p>
                                        <p>Файл:
                                            {/* <img src={`data:image/jpeg;base64,${app.file}`} alt="Base64 Image" /> */}
                                            <a href={`${app.file}`} download={app.file_name}>{app.file_name}</a>
                                        </p>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="main-container">
                        <form id="user-form">
                            <div className="form-group">
                                <label htmlFor="login">Логин</label>
                                <input
                                    type="text"
                                    id="login"
                                    className="input form-control"
                                    placeholder='Логин'
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="text"
                                    id="password"
                                    className="input form-control"
                                    placeholder='Пароль'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="iin">ИИН</label>
                                <input
                                    type="text"
                                    id="iin"
                                    className="input form-control"
                                    placeholder='ИИН'
                                    maxLength={12}
                                    value={iin}
                                    onChange={(e) => setIin(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="permissionType">Роль</label>
                                <select defaultValue={permissionType} id="permissionType" className='form-control select' onChange={(e) => setPermissionType(e.target.value)}>
                                    <option value="user">Оператор</option>
                                    <option value="admin">Администратор</option>
                                </select></div>
                            <div className="form-group">
                                <label htmlFor="firstName">Имя</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="input form-control"
                                    placeholder='Имя'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Фамилия</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="input form-control"
                                    placeholder='Фамилия'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Номер телефона</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className="input form-control"
                                    placeholder='Номер телефона'
                                    maxLength={11}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button
                                    type='button'
                                    className="con-btn form-control con-color"
                                    onClick={addUser}>Добавить пользователя</button>
                            </div>
                        </form>
                    </div>
                </TabPanel>
            </Tabs>
        </div >
    )
}
export default Admin