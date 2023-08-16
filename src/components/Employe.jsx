import { FaTrash } from "react-icons/fa";
import { useContext } from 'react'
import EmployeeContext from '../context/EmployeeContext';

const Employe = ({ id, name, position, experience }) => {

    const { deleteEmployee } = useContext(EmployeeContext)


    return (
        <div className='employee-item'>
            <div className='row'>
                <p>{name}</p>
            </div>
            <div className='row'>
                <p>{position}</p>
            </div>
            <div className='row'>
                <p>{experience}</p>
            </div>
            <div className='row'>
                <button className='del-btn' onClick={() => deleteEmployee(id)}>
                    <FaTrash />
                </button>
            </div>
        </div>




    )
}

export default Employe
