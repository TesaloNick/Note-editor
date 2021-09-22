import React, {useState, useRef} from 'react'
import uuid from 'react-uuid'
import styles from './Main.module.css'

const Main = () => {
    const fieldOfAdding = useRef()
    const fieldOfSearching = useRef()
    const [dataNote, setDataNote] = useState([]) 
    const [newdataNote, setNewDataNote] = useState([]) 

    function highlight(text) {
        return text.replace(text, `<span style='color: red'>${text}</span>`)
    }

    const addNote = (event) => {
        event.preventDefault()
        const arrayTags = [...fieldOfAdding.current.value.matchAll(/#\w+/gm)].map(item => item[0])
        const news = fieldOfAdding.current.value.replace(/#\w+/gm, `<span style='color: red'>${fieldOfAdding.current.value}</span>`);
        const newNote = [...dataNote, {title: news, id: uuid(), tags: arrayTags}]
        setDataNote(newNote)
        fieldOfAdding.current.value = ''
    }

    const deleteNote = (indexNote) => {
        const updateDataNote = dataNote.filter((item, idx) => idx !== indexNote)
        dataNote.map((item, idx) => {if (idx === indexNote) {
            const updateNewDataNote = newdataNote.filter(note => item.id !== note.id)
            setNewDataNote(updateNewDataNote)
        }})
        setDataNote(updateDataNote)
    }

    const editNote = (indexNote) => {
        const updateTitle = prompt('Write new text', dataNote[indexNote].title === '' ? '' : dataNote[indexNote].title)
        const arrayTags = [...updateTitle.matchAll(/#\w+/gm)].map(item => item[0])
        const updateDataNote = dataNote.map((item, idx) => {
            if (idx === indexNote) {
                const updateNewDataNote = newdataNote.map(note => {if (item.id === note.id) {
                    return {...note, title: updateTitle, tags: arrayTags}
                } else {
                    return note
                }})
                setNewDataNote(updateNewDataNote)
                return {...item, title:updateTitle, tags: arrayTags} 
            } else {
                return item
            }
        })
        setDataNote(updateDataNote)
    }

    const searchTag = (event) => {
        event.preventDefault()       
        if (newdataNote.length < dataNote.length) setNewDataNote(dataNote)
        const updateDataNote = dataNote.filter(item => item.tags.includes(`#${fieldOfSearching.current.value}`))
        setDataNote(updateDataNote)
    }

    const searchTagOnClick = (tag) => {
        if (newdataNote.length < dataNote.length) setNewDataNote(dataNote)
        fieldOfSearching.current.value = tag.slice(1);
        const updateDataNote = dataNote.filter(item => item.tags.includes(tag))
        setDataNote(updateDataNote)
    }

    const restoreNotes = () => {
        if (fieldOfSearching.current.value === '') setDataNote(newdataNote)
    }
    // console.log(dataNote, newdataNote);
    return (
        <div className={styles.container}>
            <form onSubmit={(event) => searchTag(event)} className={styles.searchForm}>
                <input type="search" ref={fieldOfSearching} name="search" placeholder='search tag' className={styles.searchInput} onChange={() => restoreNotes()} />
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
                        <div className={styles.noteBody}>
                            <p>{item.title}</p>
                            <div onClick={() => editNote(index)} className={styles.editButton}></div>
                            <div onClick={() => deleteNote(index)} className={styles.closeButton}></div>
                        </div>
                        <div className={styles.noteTags}>
                            <p>Tags:</p>
                            {item.tags.map(tag => (
                                <p onClick={() => searchTagOnClick(tag)} className={styles.tag}>{tag}</p>
                            ))}
                        </div>
                    </div>
                ))}

            </div> :
            <div></div>}
        </div>
    )
}

export default Main