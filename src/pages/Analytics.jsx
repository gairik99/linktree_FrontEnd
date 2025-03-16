import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useLink } from "../context/linkContext";
import SideBar from "../components/SideBar";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { getClickByCategory } from "../services/action";
import styles from "../styles/Analytics.module.css";
import MonthlyClicks from "../components/MonthlyClicks";
import GetClickByos from "../components/GetClickByos";
import GetClickByDomain from "../components/GetClickByDomain";
import GetLinkWithmaxClick from "../components/GetLinkWithmaxClick";
import MobileLogout from "../components/MobileLogout";
import MobileNavBar from "../components/MobileNavBar";
import "react-datepicker/dist/react-datepicker.css";

const Analytics = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [clickCategory, setClickCategory] = useState([]);
    const { user, setUser } = useAuth();
    const { setLink } = useLink();
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getClickByCategory(user.token);
                const orderedData = newdata.data.sort((a, b) => {
                    const order = ["link", "shop", "cta"];
                    const aIndex = order.indexOf(a.category);
                    const bIndex = order.indexOf(b.category);

                    // Handle categories not in our priority list
                    if (aIndex === -1) return 1;
                    if (bIndex === -1) return -1;

                    return aIndex - bIndex;
                });
                // console.log(orderedData)
                setClickCategory(() => orderedData);
            } catch (error) {
                toast.error("something went wrong", error);
                setUser({ token: '' });
                setLink([]);
                navigate('/')
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                display: "flex",
                overflow: "auto",
                position: "realtive",
                paddingBottom: "1rem",
                background: " #F1F6FA",
            }}
        >
            {!isHidden && <SideBar />}
            <div style={{ display: "flex", flexDirection: "column", width: isHidden ? '98vw' : "80vw", marginBottom: isHidden ? '5rem' : '' }}>
                {isHidden && <MobileLogout />}
                {!isHidden && <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <p>
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Hi,</span>{" "}
                        {user.name}!
                    </p>
                    <span>Congratulations. You got a great response today.</span>
                </div>}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <h4 style={{ padding: "1rem", }}>Overview</h4>
                    <div style={{ display: "flex", margin: isHidden ? 'auto' : "0px", borderRadius: "10px", alignItems: 'center' }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: 'center',
                                padding: '0.6rem'

                            }}
                        >
                            <CiCalendar />
                        </div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className={styles.datepickerInput}
                        />
                    </div>
                </div>
                <div className={styles.categoryContainer} style={{ gridTemplateColumns: isHidden ? 'repeat(3,80vw)' : '', overflowX: isHidden ? 'scroll' : '', }}>
                    {clickCategory?.length === 0 && (
                        <div className={styles.categoryCard}>
                            <span className={styles.categoryName}>
                                No click data available
                            </span>
                        </div>
                    )}

                    {clickCategory?.map((item, index) => (
                        <div
                            key={index}
                            className={styles.categoryCard}
                            style={{ background: index === 0 ? "#22D679" : "" }}
                        >
                            <span
                                className={styles.categoryName}
                                style={{ color: index === 0 ? "white" : "" }}
                            >
                                {item.category != "cta"
                                    ? `Clicks on ${item.category}`
                                    : `${item.category.toUpperCase()}`}
                            </span>
                            <span
                                className={styles.categoryCount}
                                style={{ color: index === 0 ? "white" : "" }}
                            >
                                {item.count}
                            </span>
                        </div>
                    ))}
                </div>
                <div style={{ padding: "1rem" }}>
                    <MonthlyClicks />
                </div>
                <div style={{ display: "flex", padding: "1rem", gap: "1rem", flexDirection: isHidden ? 'column' : '' }}>
                    <div style={{ flex: 1, height: 400 }}>
                        <GetClickByos />
                    </div>
                    <div style={{ flex: 1, minHeight: 400, marginTop: "0rem" }}>
                        <GetClickByDomain />
                    </div>
                </div>
                <div style={{ padding: "1rem", marginRight: isHidden ? '1.8rem' : '', width: isHidden ? '100%' : '' }}>
                    <GetLinkWithmaxClick />
                </div>
            </div>
            {isHidden && (
                <div style={{ width: "90%", }}>
                    <MobileNavBar />
                </div>
            )}
        </div>
    );
};

export default Analytics;
