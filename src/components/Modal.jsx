import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TabComponent from './TabComponent';
import { useTab } from '../context/tabContext';
import { useAuth } from '../context/authContext';
import { extractDomain } from '../services/extractDomain';
import { createLink } from '../services/action';
import { useLink } from '../context/linkContext';
import styles from '../styles/Modal.module.css';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png';


// eslint-disable-next-line react/prop-types
const Modal = ({ onClose }) => {
    const imageData = [
        { src: instagram, text: 'Instagram', id: '1' },
        { src: facebook, text: 'Facebook', id: '2' },
        { src: youtube, text: 'Youtube', id: '3' },
        { src: twitter, text: 'X', id: '4' },
    ];
    const { activeTab } = useTab();
    const { user } = useAuth();
    const { link, setLink } = useLink()
    const [input, setInput] = useState({
        linkTitle: '',
        linkUrl: '',
        category: '',
    });

    useEffect(() => {
        setInput(prev => ({
            ...prev,
            category: activeTab
        }));
    }, [activeTab]);

    const handleSubmit = async () => {
        try {
            if (!input.linkTitle || !input.linkUrl || !input.category) {
                toast.error('Please fill all required fields');
                return;
            }
            if (!user.token) {
                toast.error('Please login to save links');
                return;
            }

            const domain = extractDomain(input.linkUrl);
            const linkData = {
                linkTitle: input.linkTitle,
                linkUrl: input.linkUrl,
                category: input.category,
                domain
            };
            const response = await createLink(linkData, user.token);
            setLink(prev => [...prev, response.data]);
            toast.success('Link saved successfully!');
            setInput({ linkTitle: '', linkUrl: '', category: '' });
            onClose();

        } catch (error) {
            console.error("Invalid URL:", error);
            return "other";
        }

    }
    console.log(link)
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

                {/* Toggle Button */}
                <div className={styles.toggleContainer}>
                    <TabComponent logo={true} />
                </div>

                {/* Input Fields */}
                <h2 style={{ padding: '0.5rem' }}>
                    Enter URL
                </h2>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Link title"
                        value={input.linkTitle}
                        onChange={(e) => setInput(prev => ({ ...prev, linkTitle: e.target.value }))}
                        className={styles.modalInput}
                        name='linkTitle'
                    />
                    <input
                        type="text"
                        placeholder={'Link url'}
                        value={input.linkUrl}
                        onChange={(e) => setInput(prev => ({ ...prev, linkUrl: e.target.value }))}
                        className={styles.modalInput}
                        name='linkUrl'
                    />
                    <button className={styles.saveButton} onClick={handleSubmit}>
                        Save Link
                    </button>
                </div>

                {activeTab != 'shop' && <h3 style={{ padding: '0.5rem' }}>Applications</h3>}
                {/* Image Gallery */}
                <div className={styles.imageGallery}>

                    {activeTab != 'shop' && imageData.map((item) => (
                        <div key={item.id} className={styles.galleryItem}>
                            <img
                                src={item.src}
                                alt={item.text}
                                className={styles.thumbnail}
                            />
                            <span className={styles.imageText}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;