import React, {useState, useRef} from 'react'
import uuid from 'react-uuid'
import styles from './Main.module.css'

const Main = () => {
    const fieldOfAdding = useRef()
    const fieldOfSearching = useRef()
    const [dataNote, setDataNote] = useState([]) 

    function highlight(text) {
        return text.replace(text, `<span style='color: red'>${text}</span>`)
    }

    const addNote = (event) => {
        event.preventDefault()
        const newNote = [...dataNote, {title:fieldOfAdding.current.value}]
        setDataNote(newNote)
        fieldOfAdding.current.value = ''
    }

    const deleteNote = (indexNote) => {
        const updateDataNote = dataNote.filter((item, idx) => idx !== indexNote)
        setDataNote(updateDataNote)
    }

    const editNote = (indexNote) => {
        const updateTitle = prompt('Write new text')
        const updateDataNote = dataNote.map((item, idx) => {
            if (idx === indexNote) {
                // highlight(updateTitle)
                return {...item, title:updateTitle} 
            } else {
                return item
            }
        })
        setDataNote(updateDataNote)
    }

    const searchTag = (event) => {
        event.preventDefault()
        const updateDataNote = dataNote.filter(item => item.title.search(fieldOfSearching.current.value) !== -1)
        setDataNote(updateDataNote)
    }

    return (
        <div className={styles.container}>
            <form onSubmit={(event) => searchTag(event)} className={styles.searchForm}>
                <input type="search" ref={fieldOfSearching} name="search" placeholder='search tag' className={styles.searchInput}/>
                <button  className={styles.searchButton}>Search tag</button>
            </form>
            <form onSubmit={(event) => addNote(event)} className={styles.addingForm}>
                <input type='text' ref={fieldOfAdding} placeholder='add note' className={styles.addingInput}/>
                <button className={styles.addingButton}>Add note</button>
                <input type='button' value="Clear all" onClick={() => setDataNote([])} className={styles.clearAllButton} />
            </form>
            {dataNote ?
            <div className={styles.notes}>
                {dataNote.map((item, index) => (
                    <div key={uuid()} className={styles.note}>
                        <p>{item.title}</p>
                        <div onClick={() => editNote(index)} className={styles.editButton}></div>
                        <div onClick={() => deleteNote(index)} className={styles.closeButton}></div>
                    </div>
                ))}
            </div> :
            <div></div>}
        </div>
    )
}

export default Main