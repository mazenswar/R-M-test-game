import React from 'react'
import DragDrop from '../components/DragDrop'

const link = "https://static.tvtropes.org/pmwiki/pub/images/abcb6534_7913_4eb1_a7a5_62b081ebc628.png"


export default function TestPageTwo() {
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }
    return (
        <div>
            <div onDragStart={handleDragStart} draggable id={1} style={{ height: '200px', width: '200px', backgroundColor: 'purple'}}>
                <img style={{width: '50%'}}src={link} alt="rick sanchez" />
            </div>
            <DragDrop line="defense"/>
            <DragDrop line="midfield"/>
            <DragDrop line="attack"/>
        </div>
    )
}


