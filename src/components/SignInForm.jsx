import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';
import { loginUser } from '../services/action';
import logo from '../assets/Group.png';
import styles from '../styles/SignUpform.module.css';


const SignInForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    // console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setLoading(true);
        try {
            // Prepare user data for API call
            const userData = {
                email: formData.email,
                password: formData.password
            };

            const response = await loginUser(userData);
            console.log(response);

            // Handle successful registration
            if (response.status === 'ok') {
                toast.success('Signin successful!');
                setFormData({
                    email: '',
                    password: "",
                });
            }

        } catch (error) {
            // Handle errors
            const errorMessage = error.response?.data?.message || 'Signin failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className={styles.container} style={{ justifyContent: 'start' }}>
            <div className={styles.logoContainer} >
                <img src={logo} alt="Logo" className={styles.logoImage} />
                <span className={styles.logoText}>SPARK<sup>™</sup></span>
            </div>
            <form className={styles.form} style={{ alignItems: 'start', marginTop: '15vh' }}>
                <h1 className={styles.heading} style={{ margin: '1vh' }}>Sign up to your Spark</h1>
                <div className={styles.formGroup}>
                    <input type="email" id="firstName" name="email" value={formData.firstName} onChange={handleChange} placeholder='Spark/Email' />
                </div>
                <div className={styles.formGroup} style={{ position: 'relative' }}>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='password' />
                    <IoIosEyeOff className={styles.eyeIcon} />
                </div>
                <button type="submit" className={styles.submitButton} onClick={handleSubmit} style={{ marginTop: '5vh', backgroundColor: '#DCDED2' }} disabled={loading}>{loading ? 'Logging In' : 'Log in'}</button>
            </form>
            <span style={{ textDecoration: 'underline', color: '#28A263', padding: '4vh 0' }}>Forgot password?</span>
            <span>Don&apos;t have an account?<span style={{ textDecoration: 'underline', color: '#28A263', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign up</span></span>
            <span style={{ color: '#676B5F', marginTop: '25vh' }}>This site is protected by reCAPTCHA and the  <span style={{ textDecoration: 'underline' }}>Google Privacy Policy </span> and <span style={{ textDecoration: 'underline' }}>Terms of Service</span>  apply.</span>
        </div>
    );
};

export default SignInForm;