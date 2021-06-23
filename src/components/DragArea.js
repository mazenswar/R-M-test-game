import React, {useReducer} from 'react'

function reducer(state, {type, payload}) {
    switch(type) {
        case '':
            return state;
        default: 
            return state;
    }
}


export default function DragArea() {
    const [state, dispatch] = useReducer(reducer, { dropDepth: 0, inDropZone: false, fileList: [] })
    return (
        <div>
            
        </div>
    )
}
