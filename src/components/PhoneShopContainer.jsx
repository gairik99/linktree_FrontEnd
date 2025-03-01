import { useEffect, useState } from 'react'
import { useLink } from '../context/linkContext'
import { useStyle } from '../context/styleContext'
import { useAuth } from '../context/authContext'
import shopimg from '../assets/shopimg.png'
import shopimg2 from '../assets/shopimg2.png'
import styles from '../styles/PhoneShopContainer.module.css'
import classes from '../styles/Appearance.module.css';


const PhoneShopContainer = () => {
    const { link } = useLink();
    const { style } = useStyle();
    const { user } = useAuth();
    const [localLink, setLocallink] = useState([]);

    let theme = style.theme || user.theme
    let buttonStyle = style.buttonStyle || user.buttonStyle
    let buttonBackground = style.buttonColor || user.buttonColor
    let buttonFontColor = style.buttonFontColor || user.buttonFontColor
    let layout = style.buttonAlignment || user.buttonAlignment || 'stack'

    useEffect(() => {
        setLocallink(link.filter((linkItem) => linkItem.category === 'shop'));
    }, [link]);
    // console.log('phoneLink', localLink, layout)

    return (
        <div className={`${styles.container} ${styles[layout]}`} style={{ background: theme }}>
            {localLink.length === 0 ? (
                <p className={styles.noLinks}>No links available</p>
            ) : (
                localLink.map((linkItem) => (
                    <div
                        key={linkItem._id}
                        className={`${styles.linkItem} ${classes[buttonStyle]}`}
                        style={{ background: buttonBackground }}
                    >
                        <div className={styles.content}>
                            <div style={{ width: '90%', background: 'ffffff', display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={shopimg}
                                    alt={linkItem.domain}
                                    className={styles.icon}
                                    style={{ width: '100%', height: '4rem', objectFit: 'contain', }}
                                />
                            </div>
                            <div className={styles.textContainer} style={{ color: buttonFontColor }}>
                                <h5 className={styles.title}>{linkItem.linkTitle}</h5>
                                <a
                                    href={linkItem.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.button}
                                >
                                    <img src={shopimg2} alt="Shop link" />
                                    <span style={{ color: 'white' }}>Buy Now</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default PhoneShopContainer