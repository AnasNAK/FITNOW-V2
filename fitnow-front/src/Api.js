import axios from 'axios';

const URL_API = 'http://localhost/api';

export const LoginUser = async (credentials) => {
    try {
        const response = await axios.post(`${URL_API}/login`, credentials);

        if (response.status === 200) {
            console.log('User logged in:', response.data);
            return response.data;
        } else {
            throw new Error('Failed to login. Please try again later.');
        }
    } catch (error) {
        throw new Error('Error logging in');
    }
}


export const RegisterUser = async (UserData) => {
    try {
        const response = await axios.post(`${URL_API}/register`, UserData);
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw new Error('Error registering user');
    }
}


export const fetchProgress = async (token) => {
    try {
        const response = await axios.get(`${URL_API}/fitness-progresses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching progress');
    }
};

export const deleteProgress = async (id, token) => {
    try {
        await axios.delete(`${URL_API}/fitness-progresses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Error deleting progress');
    }
};

export const updateProgressStatus = async (id, token) => {
    try {
        await axios.patch(`${URL_API}/fitness-progresses/${id}/status`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Error updating progress status');
    }
};
export const updateProgress = async (id, token,formData) => {
    try {
        await axios.patch(`${URL_API}/fitness-progresses/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Error updating progress status');
    }
};

export const InsertProgress = async (formData, token) => {
    try {
        const response = await axios.post(`${URL_API}/fitness-progresses`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error inserting progress');
    }
};

export const UpdateProgress = async (formData, token) => {
    try {
        const response = await axios.put(`${URL_API}/fitness-progresses/${formData.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating progress');
    }
};