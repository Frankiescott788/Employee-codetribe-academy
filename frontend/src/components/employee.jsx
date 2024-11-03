import { Container } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Employee(){
    const { id } = useParams();
    const [employee, setEmployee] = useState('');
    const redirect = useNavigate();
    const delete_employee = async () =>{
        try {
            await axios.delete(`http://localhost:5000/employees/${ id }`);
            redirect('/')
        } catch (error) {
            
        }
    }
    const fetch_employee = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/employees/${ id }`);
            const data = res.data;
            setEmployee(data.name)
        } catch (error) {
            
        }
    }
    fetch_employee()
    return(
        <Fragment>
            <Container sx={{
                marginTop : '20vh'
            }}>
                {employee}
                <button onClick={delete_employee}>delete</button>
            </Container>
        </Fragment>
    )
}

export default Employee