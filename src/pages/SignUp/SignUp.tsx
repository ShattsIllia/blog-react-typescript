import React, {ChangeEvent, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core'
import { withLayout } from '../../components/layout/Layout';
import {useDispatch} from 'react-redux';
import { createNewUser } from '../../redux/user/userActions';

const SignUp: React.FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch()
    const history = useHistory();

    const loginHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
         setLogin(e.currentTarget.value);
    }
    const passwordHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setPassword(e.currentTarget.value);
    }
    const emailHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEmail(e.currentTarget.value);
    }

    const handleFormSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault(); 
        dispatch(createNewUser(email, password, login))
        history.push('/sign-in')
    }  

    return (
        <form style={{display: 'flex', flexDirection: 'column', width: '400px', textAlign: 'center', gap: '20px'}}>
            <h1>Sign Up</h1>
            <TextField label="Write Your Login"  id="name" onChange={e => loginHandleChange(e)}/>
            <TextField label="Write Your password"  id="password" onChange={e => passwordHandleChange(e)}/>
            <TextField label="Write Your email"  id="email" onChange={e => emailHandleChange(e)}/>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>Submit</Button>
        </form>
    );
}

export default withLayout(SignUp);