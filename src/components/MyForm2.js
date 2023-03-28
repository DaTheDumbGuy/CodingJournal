import React from 'react'
import '../App.css'
import Content2 from './Content2';
import { useState, useRef, useEffect } from 'react';
const localData = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
function MyForm() {
    let inputText = useRef(null);
    let date = useRef(null);
    const [allData, setData] = useState(localData);
    function HandleSubmit(event) {
        // event.preventDefault();
        const ID = `${Date.now()}`;
        let data = {
            ID: ID,
            date: date.current.value,
            inputText: inputText.current.value,

        }
        setData([...allData, data]);
        alert(JSON.stringify(allData));
    }
    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(allData));
    }, [allData]);
    return (
        <div className='main'>
            <form action='' onSubmit={HandleSubmit}>
                <fieldset className='header'>
                    <div className='date2'>
                        <label>Date: </label>
                        <input type='date' ref={date} required />
                    </div>
                    <label for='thoughts' className='labelForm2'>Task</label>
                </fieldset>
                <textarea rows='2' cols='40' id='thoughts' ref={inputText}></textarea>
                <button className='save'>Save</button>
            </form>
            <Content2 props={allData} />
        </div>
    )
}

export default MyForm