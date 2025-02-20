import SignupForm from "../components/SignUpform"

import signupImage from '../assets/signup.png';

const SignupPage = () => {
    return (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            <div><SignupForm /></div>
            <div style={{ height: '100vh', width: '30vw' }}>
                <img src={signupImage} alt='image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
    )
}

export default SignupPage