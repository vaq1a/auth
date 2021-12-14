import {useState} from 'react';
import styles from './SignUp.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {userApi} from "../../api/userApi";

const schema = yup.object({
    login: yup.string().min(4).max(10).required(),
    password: yup.string().min(8).required(),
}).required();

const SignUp = ({
    dispatch,
    state,

}) => {
    const [notification, setNotification] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const {message} = await userApi.signUp(data);

        setNotification(message);
    };

    return (
        <>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} placeholder="Login" type="text" {...register('login')} />
                <div>{errors.login?.message}</div>
                <input className={styles.input} placeholder="Password" type="password" {...register('password')} />
                <div>{errors.password?.message}</div>
                <input type="submit" />
            </form>

            {
                notification && <div>{notification}</div>
            }
        </>
    )
}

export default SignUp;
