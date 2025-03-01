import { useEffect, useState } from 'react'
import { useLink } from '../context/linkContext'
import { useStyle } from '../context/styleContext'
import { useAuth } from '../context/authContext'
import youtube from '../assets/youtube.png'
import facebook from '../assets/facebook.png'
import x from '../assets/twitter.png'
import instagram from '../assets/instagram.png'
import other from '../assets/Group.png'
import styles from '../styles/PhoneLinkContainer.module.css'
import classes from '../styles/Appearance.module.css';


const PhoneLinkContainer = () => {
    const { link } = useLink();
    const { style } = useStyle();
    const { user } = useAuth();
    const [localLink, setLocallink] = useState([]);

    let theme = style.theme || user.theme
    let buttonStyle = style.buttonStyle || user.buttonStyle
    let buttonBackground = style.buttonColor || user.buttonColor
    let buttonFontColor = style.buttonFontColor || user.buttonFontColor
    let layout = style.buttonAlignment || user.buttonAlignment || 'stack'

    console.log(style)

    const imageArr = [
        { id: 1, domain: 'facebook', icon: facebook },
        { id: 2, domain: 'instagram', icon: instagram },
        { id: 3, domain: 'x', icon: x },
        { id: 4, domain: 'youtube', icon: youtube },
        { id: 5, domain: 'other', icon: other }

    ]
    const getDomainIcon = (domain) => {
        const found = imageArr.find(img => img.domain === domain);
        return found ? found.icon : imageArr[4].icon;
    };

    useEffect(() => {
        setLocallink(link.filter((linkItem) => linkItem.category === 'link'));
    }, [link]);
    // console.log('phoneLink', style)

    return (
        <div className={`${styles.container} ${styles[layout]}`} style={{ background: theme }}>
            {localLink.length === 0 ? (
                <p className={styles.noLinks}>No links available</p>
            ) : (
                localLink.map((linkItem) => (
                    <a
                        key={linkItem._id}
                        href={linkItem.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkItem} ${classes[buttonStyle]}`}
                        style={{ background: buttonBackground }}
                    >
                        <div className={styles.content} style={{ color: buttonFontColor }}>
                            <img
                                src={getDomainIcon(linkItem.domain)}
                                alt={linkItem.domain}
                                className={styles.icon}
                            />
                            <div className={styles.textContainer}>
                                <h4 className={styles.title} style={{ color: buttonFontColor }}>{linkItem.linkTitle}</h4>
                            </div>
                        </div>
                    </a>
                ))
            )}
        </div>
    )
}

export default PhoneLinkContainer