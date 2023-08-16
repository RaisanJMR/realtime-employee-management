import { useContext, useEffect } from 'react'
import Employe from './components/Employe'
import Header from './components/Header'
import Form from './components/Form'
import EmployeeContext from './context/EmployeeContext'

function App() {
  const { employees, getEmployee } = useContext(EmployeeContext)

  useEffect(() => {
    getEmployee()
    return () => {
      console.log('CLEAN UP: cancelling request')
    }
  }, [])

  return (
    <>
      <Header />
      <div className='details-container'>
        <div className='section-1'>
          <div className='details-header'>
            <div className='table-header'>
              <p>name</p>
            </div>
            <div className='table-header'>
              <p>position</p>
            </div>
            <div className='table-header'>
              <p>experience</p>
            </div>
            <div className='table-header'>
              <p>delete</p>
            </div>
          </div>
          {employees?.map((user, index) => (
            <Employe
              id={user.id}
              name={user.name}
              position={user.position}
              experience={user.experience}
              key={user.id}
            />
          ))}
        </div>
        <Form />
      </div>
    </>
  )
}

export default App
