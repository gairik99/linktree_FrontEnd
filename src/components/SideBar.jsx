import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLink } from "../context/linkContext";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import logo from "../assets/Group.png";
import person from "../assets/person.png";
import link1 from "../assets/link1.png";
import link2 from "../assets/link2.png";
import link3 from "../assets/link3.png";
import link4 from "../assets/link4.png";
import styles from "../styles/SideBar.module.css";
import { useAuth } from "../context/authContext";

const SideBar = () => {
    const [modal, setModal] = useState(false);
    const { user, setUser } = useAuth();
    const { setLink } = useLink();
    const navigate = useNavigate();
    const navItems = [
        { id: 1, text: "Links", path: "/link", icon: link1 },
        { id: 2, text: "Appearance", path: "/appearance", icon: link2 },
        { id: 3, text: "Analytics", path: "/analytics", icon: link3 },
        { id: 4, text: "Settings", path: "/settings", icon: link4 },
    ];
    // console.log(modal);
    const handleSignout = () => {

        setUser({ token: '' });
        setLink([])
        navigate('/')

    }
    return (
        <div className={styles.sidebar}>
            {/* Logo Section */}
            <NavLink to="/" className={styles.logoContainer}>
                <img src={logo} alt="Brand Logo" className={styles.logo} />
                <h2 className={styles.brandName} style={{ textDecoration: "none" }}>
                    Spark
                </h2>
            </NavLink>

            {/* Navigation Items */}
            <nav className={styles.navMenu}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                        }
                    >
                        <img src={item.icon} alt={item.text} className={styles.navIcon} />
                        <span className={styles.navText}>{item.text}</span>
                    </NavLink>
                ))}
            </nav>
            {modal && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "40px",
                        background: "grey",
                        borderRadius: "20px",
                        height: "40px",
                        width: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{ padding: "0.6rem", color: "whitesmoke", display: "flex" }}
                    >
                        <CiLogout /> <span onClick={handleSignout}>Sign out</span>
                    </span>
                </div>
            )}
            <div
                className={styles.bottomLeftContainer}
                onClick={() => setModal((prev) => !prev)}
            >
                <img src={person} alt="Bottom Icon" className={styles.bottomIcon} />
                <span className={styles.bottomText}>{user.name}</span>
            </div>
        </div>
    );
};

export default SideBar;
