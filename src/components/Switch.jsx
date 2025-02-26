import styles from "../styles/Switch.module.css"; // Import the CSS module

// eslint-disable-next-line react/prop-types
const Switch = ({ isOn = true }) => {
    return (
        <div className={styles.switch}>
            <div className={`${styles.slider} ${isOn ? styles.checked : ""}`}>
                <div className={styles.thumb} />
            </div>
        </div>
    );
};

export default Switch;