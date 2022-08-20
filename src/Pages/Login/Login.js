import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Loading from './Loading';
import { Link, useNavigate,useLocation } from 'react-router-dom';


const Login = () => {
    const [signInWithGoogle, user2, loading2, error2] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if(user||user2){
        navigate(from, { replace: true });
    }
    if (loading || loading2 ) {
        return <Loading></Loading>
    }
    let errorMessage;
    if (error||error2) {
        errorMessage = <p className='text-red-500'>{error?.message } </p>
    }
    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password)


    };
    return (
        <div className='h-screen flex justify-center items-center'>
           <div className="card w-96 bg-base-100  shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Login</h2>


    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>

                                </label>
                                <input {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'use a proper email'
                                    }
                                })}
                                    type="email"
                                    placeholder="Your email"
                                    className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    {errors.email?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>

                                </label>
                                <input {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'must be 6 character or longer'
                                    }
                                })}
                                    type="password"
                                    placeholder="Your Password"
                                    className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    {errors.password?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                                </label>
                            </div>
      {errorMessage}
                            <input className='btn w-full max-w-xs btn-primary' type="submit" value='Log in' />
    </form>
    <p><small>New to <spna className="text-secondary">Ed-Tech</spna>?<Link className='text-primary' to='/signup'>Create an account</Link></small></p>

  
  <div className="divider">OR</div>
  
  <button onClick={()=>signInWithGoogle()} className="btn btn-outline btn-primary">Continue with Google</button>
  </div>
</div>
        </div>
    );
};

export default Login;