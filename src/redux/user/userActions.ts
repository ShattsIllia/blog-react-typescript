import {addUser, deleteUser} from './mutations';
import axios from '../../API/axios';
import { Dispatch } from 'redux';

export const createNewUser = (email: string, password: string, login: string) => {
    return (dispatch: Dispatch ) => {
        axios.post('/users', {
            "email": email,
            "password": password,
            "name": login,
        })
        .then(response => {
                dispatch(addUser(response.data));
                localStorage.setItem('userId', response.data._id)
            })
        .catch(error => {
            console.log('add user to api error: ', error.message);
        })
    };
};

export const getUserById = (userId: string | null) => {
    return (dispatch: Dispatch) => {
        axios.get(`/users/${userId}`)
        .then(response => {
                dispatch(addUser(response.data));
            })
        .catch(error => {
            console.log('Get current user error: ', error.message);
        })
    };
};

export const changeUserName = (userName: string, userId: string | null) => {   
    return (dispatch: Dispatch) => {
        axios.patch(`/users/${userId}`, {name: userName})
        .then(response => {
                dispatch(addUser(response.data));
            })
        .catch(error => {
                console.log('Get current user error: ', error.message);
        })
    };
};  

export const changeUserAvatar = (files: FileList, userId: string | null) => {   
    let data = new FormData();
    data.append("avatar", files[0]);
    console.log('dasdadasdasdas',data)
    return (dispatch: Dispatch) => {
       
        axios.put(`/users/upload/${userId}`, data)
        .then(response => {
                dispatch(addUser(response.data));
            })
        .catch(error => {
                console.log('Get current user error: ', error.message);
        })
    };
}; 

export const deleteUserById = (userId: string | null) => {   
    return (dispatch: Dispatch) => {
        axios.delete(`/users/${userId}`)
        .then(response => {
                dispatch(deleteUser(response.data));
        }).then (() => {
            debugger
                localStorage.clear();
                document.location.href = "/";
        } )
        .catch(error => {
                console.log('Get current user error: ', error.message);
        })
    };
};
