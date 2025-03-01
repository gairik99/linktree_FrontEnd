import { useState } from "react";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/authContext";
import { validateUpdateForm } from "../utils/validateUpdateForm";
import { updateUserProfile } from "../services/action";

import styles from "../styles/Settings.module.css";

const Settings = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.name.split(' ')[0] || '',
        lastName: user?.name.split(' ')[1] || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async () => {
        // Handle form submission
        try {
            const err = validateUpdateForm(formData);
            if (err) {
                toast.error(err)
            }

            const payload = {};
            if (formData.firstName) payload.firstName = formData.firstName
            if (formData.lastName) payload.lastName = formData.lastName
            if (formData.email) payload.email = formData.email
            if (formData.password) payload.password = formData.password
            const response = await updateUserProfile(payload, user.token)
            if (response.status == 'ok') {
                setUser(prev => ({ ...prev, name: response.user.firstName + " " + response.user.lastName, email: response.user.email }))
                toast.success('profile update successfully')
            }
        } catch (err) {
            toast.error('could not update profile', err)
        }


    };
    console.log(formData)
    return (
        <div style={{ display: "flex", background: " #F1F6FA", overflow: "auto", position: 'realtive', paddingBottom: '1rem' }}>
            <SideBar />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
                    <p>
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Hi,</span>{" "}
                        {user.name}!
                    </p>
                    <span>Congratulations. You got a great response today.</span>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginLeft: "1vw",
                    position: "relative",
                    marginBottom: "10vh",
                    background: 'white',
                    borderRadius: '8px'
                }}>
                    <form className={styles.formContainer}>
                        <div className={styles.heading}>
                            <span className={styles.headingText}>Profile</span>
                            <hr />
                        </div>

                        <div className={styles.nameFields}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className={styles.inputField}
                                    value={formData.firstName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className={styles.inputField}
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.inputField}
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={styles.inputField}
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={styles.inputField}
                                placeholder="Confirm new password"
                                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                value={formData.confirmPassword}
                            />
                        </div>

                        <button type='button' className={styles.submitButton} onClick={handleSubmit}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;