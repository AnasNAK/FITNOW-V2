import axios from 'axios';

const URL_API = 'http://localhost/api';

export const LoginUser = async (credentials) => {
    try {
        const response = await axios.post(`${URL_API}/login`, credentials);
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw new Error('Error logging in');
    }
}

export const RegisterUser = async (UserData)=>{
    try {
        const response = await axios.post(`${URL_API}/register`,UserData);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        throw new Error('Error registering user');
    }
}