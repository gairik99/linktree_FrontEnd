import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { loginUser } from "../services/action";
import { useAuth } from "../context/authContext";
import logo from "../assets/Group.png";
import styles from "../styles/SignUpform.module.css";

// eslint-disable-next-line react/prop-types
const SignInForm = ({ hidden }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    // console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                password: formData.password,
            };

            const response = await loginUser(userData);
            setUser((prev) => ({
                ...prev,
                token: response.token,
                userName: response.user.userName,
                email: response.user.email,
                imageurl: response.user.imageurl,
                name: response.user.firstName + " " + response.user.lastName,
                category: response.user.category,
                bannerBackground: response.user.bannerBackground,
                bio: response.user.bio,
                bannerColor: response.user.bannerColor,
                buttonAlignment: response.user.buttonAlignment,
                buttonStyle: response.user.buttonStyle,
                buttonColor: response.user.buttonColor,
                buttonFontColor: response.user.buttonFontColor,
                theme: response.user.theme,
                id: response.user._id

            }));
            console.log(response);

            // Handle successful registration
            if (response.status === "ok") {
                toast.success("Signin successful!");
                setFormData((prev) => ({
                    ...prev,
                    email: "",
                    password: "",
                }));
                navigate("/usernameupdate");
            }
        } catch (error) {
            // Handle errors
            const errorMessage =
                error.response?.data?.message || "Signin failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container} style={{ justifyContent: "start", width: hidden ? '100vw' : '' }}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
                <span className={styles.logoText}>
                    SPARK<sup>™</sup>
                </span>
            </div>
            <form
                className={styles.form}
                style={{ alignItems: "start", marginTop: "15vh", width: hidden ? '90vw' : '' }}
            >
                <h1 className={styles.heading} style={{ margin: "1vh" }}>
                    Sign up to your Spark
                </h1>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Spark/Email"
                    />
                </div>
                <div className={styles.formGroup} style={{ position: "relative" }}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />
                    <IoIosEyeOff className={styles.eyeIcon} />
                </div>
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    style={{ marginTop: "5vh", backgroundColor: "#DCDED2" }}
                    disabled={loading}
                >
                    {loading ? "Logging In" : "Log in"}
                </button>
            </form>
            <span
                style={{
                    textDecoration: "underline",
                    color: "#28A263",
                    padding: "4vh 0",
                }}
                onClick={() => navigate('/forgotpassword')}
            >
                Forgot password?
            </span>
            <span>
                Don&apos;t have an account?
                <span
                    style={{
                        textDecoration: "underline",
                        color: "#28A263",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/signup")}
                >
                    Sign up
                </span>
            </span>
            <span style={{ color: "#676B5F", marginTop: "25vh" }}>
                This site is protected by reCAPTCHA and the{" "}
                <span style={{ textDecoration: "underline" }}>
                    Google Privacy Policy{" "}
                </span>{" "}
                and{" "}
                <span style={{ textDecoration: "underline" }}>Terms of Service</span>{" "}
                apply.
            </span>
        </div>
    );
};

export default SignInForm;
