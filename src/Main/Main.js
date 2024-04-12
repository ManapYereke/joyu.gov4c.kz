import React, { useState, useEffect, useRef } from 'react';

const Main = () => {
    const [applicationId, setApplicationId] = useState('');
    const [examType, setExamType] = useState('THEORY');
    const [file, setFile] = useState(null);

    const filterDigits = (value) => {
        const numericValue = value.replace(/\D/g, '');
        setApplicationId(numericValue);
    };

    const handleFileChange = (event) => {
        setFile(event.target.file);
    };

    const deleteApp = () => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const base64File = reader.result.split(',')[1]; // Отделяем часть base64 данных после запятой
              const response = await axios.post('http://example.com/upload', { file: base64File });
      
              console.log('File uploaded successfully:', response.data);
            };
          } catch (error) {
            console.error('Error uploading file:', error);
          }
    }

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
                    <input type='file' onChange={handleFileChange}/>
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