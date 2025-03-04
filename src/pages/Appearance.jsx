import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import PhoneView from "../components/PhoneView";
import { useAuth } from "../context/authContext";
import styles from "../styles/Appearance.module.css";
import stack from "../assets/stack.png";
import grid from "../assets/grid.png";
import carousel from "../assets/carousel.png";
import { useStyle } from "../context/styleContext";
import { toast } from "react-toastify";
import air1 from "../assets/air1.png";
import air2 from "../assets/air2.png";
import air3 from "../assets/air3.png";
import air4 from "../assets/air4.png";
import mineral1 from "../assets/mineral1.png";
import mineral2 from "../assets/mineral2.png";
import mineral3 from "../assets/mineral3.png";
import mineral4 from "../assets/mineral4.png";
import { updateUserProfile } from "../services/action";
import { IoEyeOutline } from "react-icons/io5";
import MobileNavBar from "../components/MobileNavBar";
import MobileLogout from "../components/MobileLogout";

const Appearance = () => {
    const { user, setUser } = useAuth();
    const { style, setStyle } = useStyle();
    const [prevwiewModal, setPreviewModal] = useState(false);
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // console.log(style);
    const themeArr = [
        { img: air1, title: "Air Snow", buttonColor: "#D9D9D9", theme: "#FFFFFF" },
        { img: air2, title: "Air Grey", buttonColor: "#FFFFFF", theme: "#EBEEF1" },
        { img: air3, title: "Air Smoke", buttonColor: "#FFFFFF", theme: "#2A3235" },
        { img: air4, title: "Air Black", buttonColor: "#1C1C1C", theme: "#000000" },
        {
            img: mineral1,
            title: "Mineral Blue",
            buttonColor: "#E0F6FF",
            theme: "#E0F6FF",
        },
        {
            img: mineral2,
            title: "Mineral Green",
            buttonColor: "#E0FAEE",
            theme: "#E0FAEE",
        },
        {
            img: mineral3,
            title: "Mineral Orangek",
            buttonColor: "#FFEEE2",
            theme: "#FFEEE2",
        },
        {
            img: mineral4,
            title: "Mineral Yellow",
            buttonColor: "#FFF8E0",
            theme: "#FFF8E0",
        },
    ];
    const handleSave = async () => {
        try {
            const payload = {};

            if (style.buttonAlignment)
                payload.buttonAlignment = style.buttonAlignment;
            if (style.buttonStyle) payload.buttonStyle = style.buttonStyle;
            if (style.buttonColor) payload.buttonColor = style.buttonColor;
            if (style.buttonFontColor)
                payload.buttonFontColor = style.buttonFontColor;
            if (style.theme) payload.theme = style.theme;
            if (Object.keys(payload).length > 0) {
                const response = await updateUserProfile(payload, user.token);
                // Add success handling here (e.g., show notification)
                if (response.status === "ok") {
                    setUser((prev) => ({
                        ...prev,
                        buttonAlignment: response.user.buttonAlignment,
                        buttonStyle: response.user.buttonStyle,
                        buttonColor: response.user.buttonColor,
                        buttonFontColor: response.user.buttonFontColor,
                        theme: response.user.theme,
                    }));
                    toast.success("profile udate successfully");
                }
            }
        } catch (err) {
            toast.error("could not update profile", err.message);
        }
    };
    return (
        <div style={{ display: "flex", background: " #F1F6FA", overflow: "auto" }}>
            {!isHidden && <SideBar />}
            {!isHidden && (
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
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                        }}
                    >
                        <p>
                            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                                Hi,
                            </span>{" "}
                            {user.name}!
                        </p>
                        <span>Congratulations. You got a great response today.</span>
                    </div>
                    <PhoneView />
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginLeft: "4vw",
                    position: "relative",
                    marginBottom: "10vh",
                }}
            >
                {isHidden && <MobileLogout />}
                <h3 style={{ marginTop: "8vh" }}>Layout</h3>
                <div
                    className={styles.container}
                    style={{ width: isHidden ? "400px" : "" }}
                >
                    <div
                        className={styles.box}
                        onClick={() =>
                            setStyle((prev) => ({ ...prev, buttonAlignment: "stack" }))
                        }
                    >
                        <img src={stack} alt="Item 1" className={styles.image} />
                        <p className={styles.text}>Stack</p>
                    </div>

                    <div
                        className={styles.box}
                        onClick={() =>
                            setStyle((prev) => ({ ...prev, buttonAlignment: "grid" }))
                        }
                    >
                        <img src={grid} alt="Item 2" className={styles.image} />
                        <p className={styles.text}>Grid</p>
                    </div>

                    <div
                        className={styles.box}
                        onClick={() =>
                            setStyle((prev) => ({ ...prev, buttonAlignment: "carousel" }))
                        }
                    >
                        <img src={carousel} alt="Item 3" className={styles.image} />
                        <p className={styles.text}>Carousel</p>
                    </div>
                </div>
                <h3 style={{ marginTop: "4vh" }}>Buttons</h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        background: "white",
                        borderRadius: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <h6>Fill</h6>
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button1}`}
                                onClick={() =>
                                    setStyle((prev) => ({
                                        ...prev,
                                        buttonStyle: "button1",
                                        buttonColor: "#000000",
                                    }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button2}`}
                                onClick={() =>
                                    setStyle((prev) => ({
                                        ...prev,
                                        buttonStyle: "button2",
                                        buttonColor: "#000000",
                                    }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button3}`}
                                onClick={() =>
                                    setStyle((prev) => ({
                                        ...prev,
                                        buttonStyle: "button3",
                                        buttonColor: "#000000",
                                    }))
                                }
                            ></button>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <h6>Outline</h6>
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button4}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button4" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button5}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button5" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button6}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button6" }))
                                }
                            ></button>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <h6>Hard Shadow</h6>
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button7}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button7" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button8}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button8" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button9}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button9" }))
                                }
                            ></button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <h6>Soft Shadow</h6>
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button10}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button10" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button11}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button11" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button12}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button12" }))
                                }
                            ></button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <h6>Special</h6>
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button13}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button13" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button14}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button14" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button15}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button15" }))
                                }
                            ></button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "1rem",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ display: "flex", gap: "0.8rem" }}>
                            <button
                                className={`${styles.button} ${styles.button16}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button16" }))
                                }
                            ></button>
                            <button
                                className={`${styles.button} ${styles.button17}`}
                                onClick={() =>
                                    setStyle((prev) => ({ ...prev, buttonStyle: "button17" }))
                                }
                            ></button>
                        </div>
                    </div>
                    <h4 style={{ padding: "1rem" }}>Button Color</h4>
                    <div style={{ display: "flex", gap: "0.8rem" }}>
                        <div
                            style={{
                                height: "48px",
                                width: "48px",
                                background: style.buttonColor || "grey",
                                marginLeft: "1rem",
                                marginBottom: "1rem",
                            }}
                        ></div>
                        <label className={styles.inputLabel}>
                            <p className={styles.labelText}>Button color</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                style={{ backgroundColor: "rgb(234, 233, 233)" }}
                                value={style.buttonColor}
                                onChange={(e) =>
                                    setStyle((prev) => ({ ...prev, buttonColor: e.target.value }))
                                }
                                placeholder="#ffffff"
                            />
                        </label>
                    </div>
                    <h4 style={{ padding: "1rem" }}>Button font color</h4>
                    <div style={{ display: "flex", gap: "0.8rem" }}>
                        <div
                            style={{
                                height: "48px",
                                width: "48px",
                                background: style.buttonFontColor || "grey",
                                marginLeft: "1rem",
                                marginBottom: "1rem",
                            }}
                        ></div>
                        <label className={styles.inputLabel}>
                            <p className={styles.labelText}>Button font color</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                style={{ backgroundColor: "rgb(234, 233, 233)" }}
                                value={style.buttonFontColor}
                                onChange={(e) =>
                                    setStyle((prev) => ({
                                        ...prev,
                                        buttonFontColor: e.target.value,
                                    }))
                                }
                                placeholder="#ffffff"
                            />
                        </label>
                    </div>
                </div>
                <h3 style={{ marginTop: "4vh" }}>Fonts</h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        gap: "10px",
                        background: "white",
                        borderRadius: "10px",
                    }}
                >
                    <h5 style={{ padding: "1rem" }}>Font</h5>
                    <div
                        style={{
                            height: "80px",
                            width: "96%",
                            border: "1px solid black",
                            padding: "1rem",
                            margin: "auto",
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                            borderRadius: "5px",
                        }}
                    >
                        <div
                            style={{
                                height: "48px",
                                width: "48px",
                                background: "#DFE4E8",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Aa
                        </div>
                        <span>DM Sans</span>
                    </div>
                    <h5 style={{ padding: "1rem" }}>Color</h5>
                    <div style={{ display: "flex", gap: "0.8rem" }}>
                        <div
                            style={{
                                height: "48px",
                                width: "48px",
                                background: "white",
                                marginLeft: "1rem",
                                marginBottom: "1rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                            }}
                        ></div>
                        <label className={styles.inputLabel}>
                            <p className={styles.labelText}> color</p>
                            <input
                                type="text"
                                className={styles.inputField}
                                style={{ backgroundColor: "rgb(234, 233, 233)" }}
                                placeholder="#ffffff"
                            />
                        </label>
                    </div>
                </div>
                <h3 style={{ marginTop: "4vh" }}>Themes</h3>
                <div className={styles.themesContainer}>
                    {themeArr.map((theme, index) => (
                        <div
                            key={index}
                            className={styles.themeItem}
                            style={{ marginBlock: isHidden ? "2rem" : "" }}
                            onClick={() =>
                                setStyle((prev) => ({
                                    ...prev,
                                    buttonColor: theme.buttonColor,
                                    theme: theme.theme,
                                }))
                            }
                        >
                            <img
                                src={theme.img}
                                alt={theme.title}
                                className={styles.themeImage}
                                style={{ marginBlock: isHidden ? "0.5rem" : "" }}
                            />
                            <p className={styles.themeTitle}>{theme.title}</p>
                        </div>
                    ))}
                </div>
                <button
                    style={{
                        position: "absolute",
                        bottom: isHidden ? "-150px" : "-80px",
                        right: isHidden ? "" : "20px",
                        left: isHidden ? '1px' : '',
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
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
            {isHidden && (
                <div
                    style={{
                        display: "flex",
                        background: "white",
                        position: "fixed",
                        bottom: "120px",
                        left: "38%",
                        width: "100px",
                        height: "25px",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.8rem",
                        borderRadius: "5px",
                        gap: "0.5rem",
                        zIndex: "10",
                    }}
                    onClick={() => setPreviewModal(true)}
                >
                    <IoEyeOutline />
                    <span>preview</span>
                </div>
            )}
            {isHidden && (
                <div style={{ width: "90%" }}>
                    <MobileNavBar />
                </div>
            )}
            {isHidden && prevwiewModal && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setPreviewModal(false)}
                >
                    <div style={{ width: "361px", height: "743" }}>
                        <PhoneView />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appearance;
