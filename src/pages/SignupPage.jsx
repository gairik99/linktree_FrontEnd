import { useState, useEffect } from 'react';

import SignUpForm from '../components/SignUpForm'
import signupImage from '../assets/signup.png';

const SignupPage = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            <div><SignUpForm hidden={isHidden} /></div>
            {!isHidden && <div style={{ height: '100vh', width: '30vw' }}>
                <img src={signupImage} alt='image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>}
        </div>
    )
}

export default SignupPage