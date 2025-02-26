import { useEffect, useState } from 'react'
import { useLink } from '../context/linkContext'

import youtube from '../assets/youtube.png'
import facebook from '../assets/facebook.png'
import x from '../assets/twitter.png'
import instagram from '../assets/instagram.png'
import other from '../assets/Group.png'
import styles from '../styles/PhoneLinkContainer.module.css'




// eslint-disable-next-line react/prop-types
const PhoneLinkContainer = ({ layout = 'grid' }) => {
    const { link } = useLink();
    const [localLink, setLocallink] = useState([]);

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
    // console.log('phoneLink', localLink, layout)

    return (
        <div className={`${styles.container} ${styles[layout]}`}>
            {localLink.length === 0 ? (
                <p className={styles.noLinks}>No links available</p>
            ) : (
                localLink.map((linkItem) => (
                    <a
                        key={linkItem._id}
                        href={linkItem.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkItem}
                    >
                        <div className={styles.content}>
                            <img
                                src={getDomainIcon(linkItem.domain)}
                                alt={linkItem.domain}
                                className={styles.icon}
                            />
                            <div className={styles.textContainer}>
                                <h4 className={styles.title}>{linkItem.linkTitle}</h4>
                            </div>
                        </div>
                    </a>
                ))
            )}
        </div>
    )
}

export default PhoneLinkContainer