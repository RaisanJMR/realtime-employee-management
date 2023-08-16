import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'

const Form = () => {
    const collectionReference = collection(db, 'employees')
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !position || !experience) {
            return alert("all fields required")
        }
        addDoc(collectionReference, {
            name,
            position,
            experience,
            createdAt: serverTimestamp()
        }).then(() => {
            alert("ADDED TO DB")
            setName("")
            setPosition("")
            setExperience("")
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div className='add-user'>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <input type="text" className='value-field' value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='add name' />
                </div>
                <div className='input-field'>
                    <input type="text" className='value-field' value={position} onChange={(e) => setPosition(e.target.value)} name='position' id='position' placeholder='position' />
                </div>
                <div className='input-field'>
                    <input type="text" className='value-field' value={experience} onChange={(e) => setExperience(e.target.value)} name='email' id='email' placeholder='add experience' />
                </div>

                <button className='btn' type="submit">save</button>

            </form>
        </div>
    )
}

export default Form