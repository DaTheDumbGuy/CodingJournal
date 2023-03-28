import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react';
function Content({ props }) {
    function createData(ID, date, inputText) {
        return { ID, date, inputText };
    }
    const [sections, setSections] = useState(props.map((section) => {
        return createData(section.ID, section.date, section.inputText);
    }));
    useEffect(() => {
        setSections(props.map((section) => {
            return createData(section.ID, section.date, section.inputText);
        }));
    }, [props]);
    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(sections))
    }, [sections]);
    const deleteItem = (id) => {
        const updatedSections = sections.filter((section) => section.ID !== id);
        setSections(updatedSections);
    };
    return (
        <div>
            <article>
                <h4 className='titleArticle'>Task</h4>
                {sections.map((section) => (//iterate ulit para idisplay lahat
                    <section>
                        <div>
                            <p>Date: <span>{section.date}</span></p>
                            <p>{section.inputText}</p>
                        </div>
                        <div className='btn'><button className='delete' onClick={() => deleteItem(section.ID)}>Delete</button></div>
                    </section>
                ))}
            </article>
        </div>
    )
}

export default Content