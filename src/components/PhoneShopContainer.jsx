import { useEffect, useState } from 'react'
import { useLink } from '../context/linkContext'
import shopimg from '../assets/shopimg.png'
import shopimg2 from '../assets/shopimg2.png'
import styles from '../styles/PhoneShopContainer.module.css'

// eslint-disable-next-line react/prop-types
const PhoneShopContainer = ({ layout = 'stack' }) => {
    const { link } = useLink();
    const [localLink, setLocallink] = useState([]);



    useEffect(() => {
        setLocallink(link.filter((linkItem) => linkItem.category === 'shop'));
    }, [link]);
    console.log('phoneLink', localLink, layout)

    return (
        <div className={`${styles.container} ${styles[layout]}`}>
            {localLink.length === 0 ? (
                <p className={styles.noLinks}>No links available</p>
            ) : (
                localLink.map((linkItem) => (
                    <div
                        key={linkItem._id}
                        className={styles.linkItem}
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
                            <div className={styles.textContainer}>
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