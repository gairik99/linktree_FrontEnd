import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";
import PhoneView from "../components/PhoneView";
import { useAuth } from "../context/authContext";
import { uploadImage } from "../services/cloudinary";
import { updateUserProfile } from "../services/action";
import person from "../assets/person.png";
import styles from "../styles/Link.module.css";
import TabComponent from "../components/TabComponent";
import Modal from "../components/Modal";
import LinkContainer from "../components/LinkContainer";
import icon from "../assets/Group.png";

const Link = () => {
    const colorOptions = [
        { id: 1, color: "#FFFFFF", background: "#000000" },
        { id: 2, color: "#FFFFFF", background: "#342b26" },
        { id: 3, color: "#000000", background: "#FFFFFF" },
    ];

    const { user, setUser } = useAuth();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.imageurl || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        userName: user?.userName || "",
        bio: user?.bio || "",
        imageurl: user?.imageurl || "",
        bannerColor: user?.bannerColor || "",
        bannerBackground: user?.bannerBackground || "",
    });

    useEffect(() => {
        return () => {
            // Clean up object URL when component unmounts
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Revoke previous URL if exists
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setSelectedImage(file);
        }
    };
    // console.log(selectedImage);
    // console.log(formData);
    const handleRemove = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setSelectedImage(null);
        // Clear file input value
        fileInputRef.current.value = "";
    };
    const handleFormSubmit = async () => {
        try {
            const payload = {};

            // Only add fields if they have values
            if (formData.userName) payload.userName = formData.userName;
            if (formData.bio) payload.bio = formData.bio;
            if (formData.bannerColor) payload.bannerColor = formData.bannerColor;
            if (formData.bannerBackground) payload.bannerBackground = formData.bannerBackground;
            if (selectedImage) {
                payload.imageurl = await uploadImage(selectedImage);
            }
            // console.log('cloudinary', imageurl)
            if (Object.keys(payload).length > 0) {
                const response = await updateUserProfile(payload, user.token);

                console.log('response', response);
                if (response.status == 'ok') {
                    toast.success('profile update successful')
                    setUser(prev => ({ ...prev, userName: response.user.userName, bio: response.user.bio, bannerColor: response.user.bannerColor, bannerBackground: response.user.bannerBackground, imageurl: response.user.imageurl }))
                }

            }
        } catch (err) {
            toast.error('Could not update profile', err)
        }
    };

    return (
        <div style={{ display: "flex", background: " #F1F6FA", overflow: "auto" }}>
            <SideBar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginLeft: "4vw",
                    height: "855px",
                }}
            >
                <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <p>
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Hi,</span>{" "}
                        {user.name}!
                    </p>
                    <span>Congratulations. You got a great response today.</span>
                </div>
                <PhoneView />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginLeft: "4vw",
                    position: "relative",
                    marginBottom: "6vh",
                }}
            >
                <h3 style={{ marginTop: "8vh" }}>Profile</h3>
                <div className={styles.profileContainer}>
                    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <div className={styles.imageContainer}>
                            <img
                                src={previewUrl || person}
                                alt="person"
                                className={styles.profileImage}
                            />
                        </div>
                        <div className={styles.controlsContainer}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className={styles.hiddenInput}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className={styles.pickButton}
                            >
                                Pick an Image
                            </button>
                            <button className={styles.removeButton} onClick={handleRemove}>
                                Remove
                            </button>
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>
                            <p className={styles.labelText}>Profile Title</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                style={{ backgroundColor: "rgb(234, 233, 233)" }}
                                onChange={(e) =>
                                    setFormData({ ...formData, userName: e.target.value })
                                }
                                value={formData?.userName}
                            />
                        </label>
                        <label className={styles.inputLabel}>
                            <p className={styles.labelText}>Bio</p>
                            <input
                                type="email"
                                value={formData?.bio}
                                className={styles.inputField}
                                style={{ backgroundColor: "rgb(234, 233, 233)" }}
                                onChange={(e) =>
                                    setFormData({ ...formData, bio: e.target.value })
                                }
                            />
                        </label>
                    </div>
                </div>
                <div
                    className={styles.profileContainer}
                    style={{ marginBottom: "1rem" }}
                >
                    {/* Replace ToggleButton with your actual toggle component */}
                    <div style={{ width: "16vw" }}>
                        <TabComponent logo={true} />
                    </div>

                    <button
                        className={styles.customButton}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>+</span> Add
                    </button>
                    <LinkContainer />
                </div>
                <h3 style={{ marginTop: "2vh" }}>Banner</h3>
                <div className={styles.userCard}>
                    <div
                        className={styles.cardContent}
                        style={{
                            backgroundColor: formData.bannerBackground,
                            color: formData.bannerColor,
                            borderRadius: "10px",
                        }}
                    >
                        <div className={styles.avatarContainer}>
                            <img
                                src={previewUrl || person}
                                alt="User avatar"
                                className={styles.userAvatar}
                            />
                        </div>
                        <span className={styles.userName}>{`@${user?.userName || "username"
                            }`}</span>
                        <span className={styles.userTitle}>
                            <img
                                src={icon}
                                alt={icon}
                                style={{ height: "10px", width: "10px" }}
                            />
                            {`/${user?.bio || "bio"}`}
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        {colorOptions.map((option) => (
                            <div
                                key={option.id}
                                style={{
                                    backgroundColor: option.background,
                                    height: "50px",
                                    width: "50px",
                                    borderRadius: "50%",
                                    border: "1px solid black",
                                }}
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        bannerColor: option.color,
                                        bannerBackground: option.background,
                                    })
                                }
                            ></div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div
                            style={{
                                backgroundColor: formData.bannerBackground,
                                height: "60px",
                                width: "60px",
                                borderRadius: "20%",
                                border: "1px solid black",
                            }}
                        ></div>
                        <p
                            style={{
                                height: "60px",
                                width: "20rem",
                                background: "lightGRey",
                                borderRadius: "2%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {formData.bannerColor}
                        </p>
                    </div>
                </div>
                <button
                    style={{
                        position: "absolute",
                        bottom: "-30px",
                        right: "20px",
                        backgroundColor: "#4CAF50", // Green color
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        zIndex: 100,
                    }}
                    onClick={handleFormSubmit}
                >
                    Save Changes
                </button>
            </div>

            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Link;
