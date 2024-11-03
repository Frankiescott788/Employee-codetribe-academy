import {Container} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Nav(){
    const navigate = useNavigate();
    return (
        <nav>
            <Container>
                <div className='navigation-list'>
                    <div className='logo'>
                        <span className='logo-On'>On</span>Boarding
                    </div>
                    <div>
                        <button className='add-btn' onClick={() => navigate('/register')}>New Employee</button>
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Nav