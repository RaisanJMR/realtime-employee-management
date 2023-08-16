import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { createContext, useState } from 'react'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {

  const [employees, setEmployees] = useState([])



  const getEmployee = () => {
    const collectionReference = collection(db, 'employees')
    const q = query(collectionReference, orderBy('createdAt'))
    try {
      onSnapshot(q, (snap) => {
        const newUsers = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setEmployees(newUsers)
      })
    } catch (error) {
      console.log('ERROR FETCHING DATA', error)
    }
  }


  const deleteEmployee = (id) => {
    const documentRef = doc(db, 'employees', id)
    deleteDoc(documentRef)
      .then(() => {
        alert('DATA DELETED')
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <EmployeeContext.Provider
      value={{ employees, getEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContext
