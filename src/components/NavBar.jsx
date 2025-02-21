import logo from "../assets/Group.png";
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <span className={styles.logoText}>
                    SPARK<sup>™</sup><p style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '0.5rem', display: 'inline-block' }}>| Marketplace</p>
                </span>
            </div>
            <div className={styles.navbarRight}>
                <button className={styles.navbarButton}>Sign up free</button>
            </div>
        </nav>
    )
}

export default NavBar

