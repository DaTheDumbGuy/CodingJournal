import React from 'react'
import '../App.css'
import Content from './Content';
import { useState, useRef, useEffect } from 'react';
const localData = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
function MyForm() {
    let inputText = useRef(null);
    const currentDate = new Date(Date.now()).toLocaleDateString();

    const [allData, setData] = useState(localData);
    function HandleSubmit(event) {
        // event.preventDefault();
        const ID = `${Date.now()}`;
        let data = {
            ID: ID,
            date: currentDate,
            inputText: inputText.current.value,

        }
        setData([...allData, data]);
        alert(JSON.stringify(allData));
    }
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(allData));
    }, [allData]);
    return (
        <div className='main'>
            <form action='' onSubmit={HandleSubmit}>
                <fieldset className='header'>
                    <div>
                        <label>Date: </label>
                        <span>{currentDate}</span>
                    </div>
                    <label for='thoughts'>Thoughts for the Day</label>
                </fieldset>
                <textarea rows='2' cols='40' id='thoughts' ref={inputText}></textarea>
                <button className='save'>Save</button>
            </form>
            <Content props={allData} />
        </div>
    )
}

export default MyForm