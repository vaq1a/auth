import styles from './SignIn.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {userApi} from "../../api/userApi";

const schema = yup.object({
    login: yup.string().min(4).max(10).required(),
    password: yup.string().min(8).required(),
}).required();

const SignIn = ({
    dispatch,
    state,

}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const value = await userApi.signIn(data);

        if(!value.user) {
            dispatch({
                type: 'SET_ERROR',
                payload: {
                    message: value.message
                }
            });

            return;
        }

        dispatch({
            type: 'LOGIN',
            payload: {
                auth: true,
                error: null,
                id: value.user._id,
                login: value.user.login,
                password: value.user.password,
            }
        });

        window.localStorage.setItem('token', value.token);
    };

    return (
        <>
            <div>Sign In</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} placeholder="Login" type="text" {...register('login')} />
                <div>{errors.login?.message}</div>
                <input className={styles.input} placeholder="Password" type="password" {...register('password')} />
                <div>{errors.password?.message}</div>
                <input type="submit" />
            </form>
            <div>
                {
                    state.error && state.error
                }
            </div>
        </>
    )
}

export default SignIn;