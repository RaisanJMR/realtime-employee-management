import { useContext, useEffect, useState } from 'react'
import Employe from './components/Employe'
import Header from './components/Header'
import Form from './components/Form'
import EmployeeContext from './context/EmployeeContext'

function App() {
  const { employees, getEmployee } = useContext(EmployeeContext)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getEmployee()
    return () => {
      console.log('CLEAN UP: cancelling request')
    }
  }, [])

  const selectPageHandle = (selectedPage) => {
    console.log(selectedPage)
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(employees.length / 2) &&
      selectedPage !== page
    ) {
      setPage(selectedPage)
    }
  }

  return (
    <>
      <Header />
      <div className='details-container'>
        <div className='section-1'>
          <div className="section-table">

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
          {employees?.slice(page * 2 - 2, page * 2).map((user, index) => (
            <Employe
              id={user.id}
              name={user.name}
              position={user.position}
              experience={user.experience}
              key={user.id}
            />
          ))}
          </div>
          {employees.length > 0 && (
            <div className='pagination'>
              <span
                className={page > 1 ? '' : 'page-disable'}
                onClick={() => selectPageHandle(page - 1)}>
                ◀️
              </span>
              {[...Array(Math.ceil(employees.length / 2))].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? 'page-selected' : ''}
                    onClick={() => selectPageHandle(i + 1)}
                    key={i}>
                    {i + 1}
                  </span>
                )
              })}
              <span
                className={page < employees.length / 2 ? '' : 'page-disable'}
                onClick={() => selectPageHandle(page + 1)}>
                ▶️
              </span>
            </div>
          )}
        </div>
        <Form />
      </div>
    </>
  )
}

export default App
