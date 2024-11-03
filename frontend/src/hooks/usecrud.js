import {useState} from 'react';
import axios from "axios";

export default function usecrud() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetch_employees = async () => {
        try {
            const { data, status } = await axios.get('http://localhost:8080/api/employees');
            if(status === 200) {
                setEmployees(data);
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { fetch_employees, employees, isLoading, setEmployees }
    
}