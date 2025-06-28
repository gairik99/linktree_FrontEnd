import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLink } from "../context/linkContext";
// import { useAuth } from "../context/authContext";
import { updateLink, deleteLink, getLinkWithClickPagenation } from "../services/action";
import { useTab } from "../context/tabContext";
import Switch from "./Switch";
import { extractDomain } from "../services/extractDomain";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../styles/LinkContainer.module.css";
import click from "../assets/click.png";

const LinkContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const { activeTab } = useTab();
    const { link: allLinks, setLink: setAllLinks } = useLink();
    const user = useSelector((state) => state.auth.user);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const observer = useRef();

    // Filter links for current tab
    const filteredLinks = useMemo(() => {
        return allLinks.filter(linkItem => linkItem.category === activeTab);
    }, [allLinks, activeTab]);

    // Intersection Observer callback
    const lastLinkRef = useCallback((node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    // Fetch links from API
    const fetchLinks = useCallback(async (pageNum = 1, append = false) => {
        setIsLoading(true);
        try {
            const result = await getLinkWithClickPagenation(
                user.token,
                pageNum,
                activeTab
            );
            const newLinks = result.data.links;
            // console.log('called')
            setHasMore(newLinks.length === 4); // Assuming 4 items per page

            if (append) {
                // Merge new links with existing, avoid duplicates
                setAllLinks(prev => [
                    ...prev.filter(link =>
                        !newLinks.some(newLink => newLink._id === link._id)
                    ),
                    ...newLinks
                ]);
            } else {
                // Preserve links from other categories
                setAllLinks(prev => [
                    ...prev.filter(link => link.category !== activeTab),
                    ...newLinks
                ]);
            }
        } catch (error) {
            toast.error("Failed to fetch links");
            console.error("Fetch error:", error);
            setAllLinks([]);
            navigate("/");
        } finally {
            setIsLoading(false);
        }
    }, [user.token, activeTab, setAllLinks, navigate]);

    // Initial fetch and tab change handler
    useEffect(() => {
        setPage(1);
        fetchLinks(1, false);
    }, [activeTab, fetchLinks]);

    // Page change handler
    useEffect(() => {
        if (page > 1) {
            fetchLinks(page, true);
        }
    }, [page, fetchLinks]);

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    const handleEdit = (linkItem) => {
        setSelectedLink(linkItem);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedLink(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!selectedLink) return;

        try {
            const domain = extractDomain(selectedLink.linkUrl);
            await updateLink(user.token, selectedLink._id, {
                linkTitle: selectedLink.linkTitle,
                linkUrl: selectedLink.linkUrl,
                domain,
            });

            // Refresh current tab
            // const result = await getLinkWithClickPagenation(
            //     user.token,
            //     page,
            //     activeTab
            // );
            // const updatedLinks = result.data.links;
            // console.log(updatedLinks)

            // // Update context while preserving other categories
            // setAllLinks(prev => [
            //     ...prev.filter(link => link.category !== activeTab),
            //     ...updatedLinks
            // ]);
            fetchLinks(1, true);

            setIsModalOpen(false);
            toast.success("Link updated successfully");
        } catch (error) {
            toast.error("Failed to update link");
            console.error("Update error:", error);
        }
    };

    const handleDelete = async (linkId) => {
        try {
            await deleteLink(user.token, linkId);

            // Refresh current tab
            // const result = await getLinkWithClickPagenation(
            //     user.token,
            //     page,
            //     activeTab
            // );
            // const updatedLinks = result.data.links;

            // Update context while preserving other categories
            let link = allLinks.filter(link => link._id != linkId)
            setAllLinks(link);

            toast.success("Link deleted successfully");
        } catch (error) {
            toast.error("Failed to delete link");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className={styles.linkContainer}>
            <ul className={styles.linkList}>
                {filteredLinks.length > 0 ? (
                    filteredLinks.map((linkItem, index) => (
                        <li
                            key={linkItem._id}
                            className={styles.linkItem}
                            ref={index === filteredLinks.length - 1 ? lastLinkRef : null}
                        >
                            <div className={styles.linkContent}>
                                <span className={styles.domain}>{linkItem.domain}</span>
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
                                        onChange={() => { }}
                                        className={styles.showcaseSwitch}
                                    />
                                </div>
                            </div>
                            <div className={styles.buttonGroup}>
                                <p>
                                    <img src={click} alt='clickIcon' />
                                    <span>{linkItem?.totalClicks || 0} clicks</span>
                                </p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        className={`${styles.button} ${styles.editButton}`}
                                        onClick={() => handleEdit(linkItem)}
                                    >
                                        <CiEdit />
                                    </button>
                                    <button
                                        className={`${styles.button} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(linkItem._id)}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : !isLoading ? (
                    <p className={styles.noLinks}>No links found</p>
                ) : null}
            </ul>

            {isLoading && <p className={styles.loading}>Loading more links...</p>}

            {isModalOpen && selectedLink && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Edit Link</h2>
                        <div className={styles.modalContent}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="linkTitle"
                                    value={selectedLink.linkTitle}
                                    onChange={handleInputChange}
                                    className={styles.modalInput}
                                />
                            </label>
                            <label>
                                URL:
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
                                disabled={!selectedLink.linkTitle || !selectedLink.linkUrl}
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
    );
};

export default LinkContainer;