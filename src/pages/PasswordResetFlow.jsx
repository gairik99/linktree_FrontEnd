import { useState } from 'react';
import { sendVerificationCode } from '../services/action';
import { resetPassword } from '../services/action';

const PasswordResetFlow = () => {
    const [step, setStep] = useState(1); // 1 = email, 2 = code+password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Step 1: Send email to get verification code
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await sendVerificationCode(email);
            setStep(2);
            setSuccess('Verification code sent to your email');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending verification code');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit code and new password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (code.length !== 6) {
            setError('Code must be 6 digits');
            setLoading(false);
            return;
        }

        try {
            await resetPassword(email, code, password)
            setSuccess('Password reset successfully!');
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-reset-container">
            <style>
                {`
            .password-reset-container {
              max-width: 400px;
              margin: 40px auto;
              padding: 20px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
  
            .password-reset-container h1 {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 20px;
            }
  
            .password-reset-container label {
              display: block;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 8px;
            }
  
            .password-reset-container input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
              margin-bottom: 16px;
            }
  
            .password-reset-container input:focus {
              outline: none;
              border-color: #2e7d32;
            }
  
            .password-reset-container button {
              width: 100%;
              padding: 12px;
              background: #2e7d32;
              color: #fff;
              border: none;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
            }
  
            .password-reset-container button:hover {
              background: #2e7d32;
            }
  
            .password-reset-container button:disabled {
              background: #ccc;
              cursor: not-allowed;
            }
  
            .error-message {
              padding: 10px;
              background: #ffebee;
              color: #c62828;
              border-radius: 4px;
              margin-bottom: 16px;
            }
  
            .success-message {
              padding: 10px;
              background: #e8f5e9;
              color: #2e7d32;
              border-radius: 4px;
              margin-bottom: 16px;
            }
          `}
            </style>

            <h1>Password Reset</h1>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {step === 1 && (
                <form onSubmit={handleSendEmail}>
                    <div>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Verification Code'}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleResetPassword}>
                    <div>
                        <label>Verification Code (6 digits)</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                            placeholder="Enter 6-digit code"
                            required
                        />
                    </div>

                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            )}
        </div>
    );

};

export default PasswordResetFlow;