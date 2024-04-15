import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [applicationId, setApplicationId] = useState('');
    const [examType, setExamType] = useState('THEORY');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();


    const filterDigits = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setApplicationId(numericValue);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const deleteApp = async () => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                try {
                    const base64File = reader.result;
                    const response = await axios.post(`/api/archive`, { application_id: applicationId, exam_type: examType, file: base64File, file_name: file.name }, {
                        headers: {
                            Authorization: localStorage.getItem("access_token")
                        }
                    });
                    console.log('File uploaded successfully:', response.data);
                } catch (error) {
                    if (error.response) {
                        console.error('Server error:', error.response.data);
                        if ([401, 403].includes(error.response.status)) {
                            localStorage.removeItem("access_token");
                            sessionStorage.setItem("redirect", "/main");
                            navigate('/auth');
                        }
                    } else if (error.request) {
                        console.error('Network error:', error.request);
                    } else {
                        console.error('Error:', error.message);
                    }
                }
            };
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            sessionStorage.setItem("redirect", "/main");
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
            <h1 className='title'>Удаление заявки ВУ ИИС ЦОН 2.0</h1>
            <div className="main-container">
                <form id="app-form">
                    <label htmlFor="applicationId">Номер заявки</label>
                    <input
                        type="text"
                        id="applicationId"
                        className="input form-control"
                        placeholder='Номер заявки'
                        maxLength={12}
                        value={applicationId}

                        onChange={(e) => filterDigits(e.target.value)} />
                    <label htmlFor="exam_type">Вид экзамена</label>
                    <select defaultValue={examType} id="exam_type" className='form-control select' onChange={(e) => setExamType(e.target.value)}>
                        <option value="THEORY">Теория</option>
                        <option value="DRIVING">Практика</option>
                        <option value="ALL">Все</option>
                    </select>
                    <input type='file' onChange={e => handleFileChange(e)} />
                    <div className="form-group">
                        <button
                            type='button'
                            className="con-btn form-control con-color"
                            onClick={deleteApp}
                        >Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Main