import { useTab } from "../context/tabContext";
import shop from "../assets/shop.png";

// eslint-disable-next-line react/prop-types
const TabComponent = ({ logo }) => {
    const { activeTab, setActiveTab } = useTab();
    // Default to 'link'


    return (
        <div
            style={{
                display: "flex",
                width: "84%",
                backgroundColor: "grey",
                borderRadius: "20px",
                marginTop: "1rem",
            }}
        >
            <button
                onClick={() => setActiveTab("link")}
                style={{
                    flex: 1,
                    padding: "12px 0",
                    border: "none",
                    background: activeTab == "link" ? "#4caf50" : "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: activeTab === "link" ? "white" : "#6B7280",
                    fontWeight: "600",
                    borderRadius: activeTab === "link" ? "20px" : "0",
                    transition: "all 0.2s ease",
                    margin: 0,
                }}
            >
                <span
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {logo ? (
                        <span>
                            <img src={shop} style={{ width: "15px", height: "15px" }} />
                            Add Link
                        </span>
                    ) : (
                        "Link"
                    )}
                </span>
            </button>
            <button
                onClick={() => setActiveTab("shop")}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    padding: "12px 0",
                    border: "none",
                    background: activeTab == "shop" ? "#4caf50" : "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: activeTab === "shop" ? "white" : "#6B7280",
                    fontWeight: "600",
                    borderRadius: activeTab === "shop" ? "20px" : "0",
                    transition: "all 0.2s ease",
                    margin: 0,
                }}
            >
                <span
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {logo ? (
                        <span>
                            <img
                                src={shop}
                                alt="shop logo"
                                style={{ width: "15px", height: "15px" }}
                            />
                            Add Shop
                        </span>
                    ) : (
                        "Shop"
                    )}
                </span>
            </button>
        </div>
    );
};

export default TabComponent;
