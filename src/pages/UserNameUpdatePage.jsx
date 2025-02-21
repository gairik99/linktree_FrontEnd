import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { updateUserProfile } from "../services/action";
import signupImage from "../assets/signup.png";
import styles from "../styles/UserNameUpdatePage.module.css";
import logo from "../assets/Group.png";


const buttonArr = [
    { name: "Business", id: 1, logo: "🏢" },
    { name: "Creative", id: 2, logo: "🎨" },
    { name: "Education", id: 3, logo: "📚" },
    { name: "Entertainment", id: 4, logo: "🎶" },
    { name: "Fashion and Beauty", id: 5, logo: "👗" },
    { name: "Food and Beverage", id: 6, logo: "🍕" },
    { name: 'Goverment and Politics', id: 7, logo: '⚖️' },
    { name: 'Health and Wellness', id: 8, logo: '🍎' },
    { name: 'Non-Profit', id: 9, logo: '💗' },
    { name: 'Other', id: 10, logo: '🤍' },
    { name: 'Tech', id: 11, logo: '🖥️' },
    { name: 'Travel and Tourism', id: 12, logo: '✈️' }
];

const UserNameUpdatePage = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        userName: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const handleCategorySelect = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            category: categoryId
        }));
    };

    const handleUsernameChange = (e) => {
        setFormData(prev => ({
            ...prev,
            userName: e.target.value
        }));
    };
    // console.log(formData);
    // console.log(user.token)

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await updateUserProfile(formData, user.token);
            console.log(response);
            if (response.message) {
                toast.success(response.message);
                setUser(prev => ({
                    ...prev,
                    userName: response.user.userName,
                    category: response.user.category
                }));
            }


        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Update failed. Please try again.";
            toast.error(errorMessage);

        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ display: "flex", overflow: "hidden" }}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo" className={styles.logoImage} />
                    <span className={styles.logoText}>
                        SPARK<sup>™</sup>
                    </span>
                </div>
                <h1 className={styles.heading}>Tell us about yourself</h1>
                <h4 style={{ color: "#676B5F" }}>
                    For a personalized Spark experience
                </h4>
                <input type="text" placeholder="Tell us your username" value={formData.userName || user.userName}
                    onChange={handleUsernameChange} />
                <span style={{ marginTop: '5vh' }}>Select one category that best describes your Linktree:</span>
                <div className={styles.buttonsContainer}>
                    {buttonArr.map((button) => (
                        <button
                            key={button.id}
                            className={`${styles.categoryButton} ${user.category === button.id.toString() ? styles.selected : ""
                                }`}
                            onClick={() => handleCategorySelect(button.id.toString())}
                        >
                            <span>{button.logo}</span>
                            {button.name}
                        </button>
                    ))}
                </div>
                <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>{loading ? 'wait' : 'Continue'}</button>
            </div>
            <div style={{ height: "100vh", width: "30vw" }}>
                <img
                    src={signupImage}
                    alt="image"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
        </div>
    );
};

export default UserNameUpdatePage;
