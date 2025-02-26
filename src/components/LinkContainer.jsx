import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useLink } from "../context/linkContext"
import { useAuth } from "../context/authContext"
import { getLink, updateLink, deleteLink } from "../services/action"
import { useTab } from "../context/tabContext"
import Switch from "./Switch"
import { extractDomain } from "../services/extractDomain"

import styles from '../styles/LinkContainer.module.css'

const LinkContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [localLink, setLocallink] = useState([]);
    const { activeTab } = useTab();
    const { link, setLink } = useLink();
    const { user } = useAuth();
    useEffect(() => {
        setLocallink(link.filter((linkItem) => linkItem.category === activeTab));
    }, [link, activeTab]);
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const data = await getLink(user.token);
                setLink(data.data);
                // console.log("Link data:", link);
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (linkItem) => {
        setSelectedLink(linkItem);
        setIsModalOpen(true);
    };
    // console.log("Selected link:", selectedLink);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedLink(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSave = async () => {
        try {
            const domain = extractDomain(selectedLink.linkUrl);
            await updateLink(user.token, selectedLink._id, {
                linkTitle: selectedLink.linkTitle,
                linkUrl: selectedLink.linkUrl,
                domain
            });

            // Refresh links after successful update
            const freshData = await getLink(user.token);
            setLink(freshData.data);

            setIsModalOpen(false);
            toast.success("Link updated successfully");
        } catch (error) {
            toast.error("Failed to update link", error);
            // Handle error (show message, etc)
        }
    };
    // console.log("Local link:", localLink);
    // console.log("selected link:", selectedLink);

    const handleDelete = async (linkId) => {
        try {
            await deleteLink(user.token, linkId);
            const freshData = await getLink(user.token);
            setLink(freshData.data);
            toast.success("Link deleted successfully");
        } catch (error) {
            toast.error("Failed to delete link", error);
        }
    }

    return (
        <div className={styles.linkContainer}>
            <ul className={styles.linkList}>
                {localLink && localLink.length > 0 ? (
                    localLink.map((linkItem) => (
                        <li key={linkItem._id} className={styles.linkItem}>
                            <div className={styles.linkContent}>
                                <span className={styles.domain}>
                                    {linkItem.domain}
                                </span>
                                <div className={styles.urlContainer}>
                                    <a
                                        href={linkItem.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.url}
                                    >
                                        {linkItem.linkUrl.substring(0, 70)}
                                    </a>
                                    <Switch
                                        defaultChecked={true}
                                        onChange={() => { }} // Empty function for showcase
                                        className={styles.showcaseSwitch}
                                    />
                                </div>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button
                                    className={`${styles.button} ${styles.editButton}`}
                                    onClick={() => handleEdit(linkItem)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.button} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(linkItem._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className={styles.noLinks}>No links found</p>
                )}
            </ul>
            {isModalOpen && selectedLink && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Edit Link</h2>
                        <div className={styles.modalContent}>
                            <label>
                                linkTitle:
                                <input
                                    type="text"
                                    name="linkTitle"
                                    value={selectedLink.linkTitle}
                                    onChange={handleInputChange}
                                    className={styles.modalInput}
                                />
                            </label>
                            <label>
                                linkUrl:
                                <input
                                    type="text"
                                    name="linkUrl"
                                    value={selectedLink.linkUrl}
                                    onChange={handleInputChange}
                                    className={styles.modalInput}
                                />
                            </label>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.saveButton}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
// 
export default LinkContainer