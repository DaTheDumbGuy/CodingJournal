import React, { useState, useEffect } from 'react';
import '../App.css';

const localData = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function MyForm2() {
    const [inputText, setInputText] = useState('');
    const [allData, setData] = useState(localData);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [dateInput, setDateInput] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(allData));
    }, [allData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editing) {
            const updatedData = allData.map((item) => {
                if (item.ID === editId) {
                    return { ...item, inputText, date: dateInput };
                }
                return item;
            });
            setData(updatedData);
            setEditing(false);
            setEditId(null);
            setInputText('');
            setDateInput('');
        } else {
            const ID = `${Date.now()}`;
            const data = {
                ID,
                date: dateInput,
                inputText,
            };
            setData([...allData, data]);
            setInputText('');
            setDateInput('');
        }
    };

    const handleEdit = (id) => {
        const itemToEdit = allData.find((item) => item.ID === id);
        setEditing(true);
        setEditId(id);
        setInputText(itemToEdit.inputText);
        setDateInput(itemToEdit.date);
    };

    const handleDelete = (id) => {
        const updatedData = allData.filter((item) => item.ID !== id);
        setData(updatedData);
    };

    return (
        <div className='main'>
            <form onSubmit={handleSubmit}>
                <fieldset className='header'>
                    <div>
                        <label htmlFor='dateInput'>Date: </label>
                        <input type='date' id='dateInput' value={dateInput} required onChange={(event) => setDateInput(event.target.value)} />
                    </div>
                    <label htmlFor='thoughts'>Tasks</label>
                </fieldset>
                <textarea
                    rows='2'
                    cols='40'
                    id='thoughts'
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                ></textarea>
                <button className='save'>{editing ? 'Update' : 'Save'}</button>
            </form>
            <Content
                data={allData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}
function Content({ data, handleEdit, handleDelete }) {
    return (
        <div>
            <article>
                <h4 className='titleArticle'>Tasks</h4>
                {data.map((item) => (
                    <section key={item.ID}>
                        <div className='content'>
                            <p className="date">Date: <span>{item.date}</span></p>
                            <p className="text">{item.inputText}</p>
                        </div>
                        <div className='btn'>
                            <button className='edit' onClick={() => handleEdit(item.ID)}>
                                Edit
                            </button>
                            <button className='delete' onClick={() => handleDelete(item.ID)}>
                                Delete
                            </button>
                        </div>
                    </section>
                ))}
            </article>
        </div>
    );
}


export default MyForm2