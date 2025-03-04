import share from "../assets/share.png";
import person from "../assets/person.png";
import icon from "../assets/Group.png";
import { useAuth } from "../context/authContext";
import { useStyle } from "../context/styleContext";
import TabComponent from "../components/TabComponent";
import PhoneLinkContainer from "./PhoneLinkContainer";
import { toast } from "react-toastify";
import GetConnectButton from "./GetConnectButton";
import PhoneShopContainer from "./PhoneShopContainer";
import { useTab } from "../context/tabContext";

const PhoneView = () => {
    const { user } = useAuth();
    const { style } = useStyle();
    const { activeTab } = useTab();
    // console.log(user);
    // console.log("PhoneView rendered");

    let background = style.theme || user.theme;

    const profilelink = `https://linktreegairik.netlify.app/profile/${user.id}`;
    const handleClick = async () => {
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(profilelink);
            toast.success("Profile link copied!");
        } catch (err) {
            toast.error("Could not copy profile link", err.message);
        }
    };



    return (
        <div
            style={{
                height: "742.5px",
                width: "361px",
                display: "flex ",
                flexDirection: "column",
                border: "15px solid black",
                borderRadius: "25px",
                position: "relative",
                background: background || '#e2dada94',
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "30%",
                    background: user.bannerBackground || "#342B26",
                    borderBottomRightRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <img
                    src={share}
                    alt="share"
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "15px",
                        background: "white",
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        padding: "5px",
                    }}
                    onClick={handleClick}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <img
                        src={user.imageurl || person}
                        alt="person"
                        style={{
                            position: "absolute",
                            background: "white",
                            height: "100px",
                            width: "100px",
                            borderRadius: "50%",
                            padding: "5px",
                        }}
                    />
                    <p
                        style={{
                            position: "absolute",
                            bottom: "1rem",
                            color: user?.bannerColor || "white",
                            fontSize: "1.2rem",
                        }}
                    >
                        @{user.userName}
                    </p>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "70%",
                    background: background,
                }}
            >
                <TabComponent />
                {activeTab == "link" && <PhoneLinkContainer />}
                {activeTab == "shop" && <PhoneShopContainer />}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <GetConnectButton />
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                        <img
                            src={icon}
                            alt="Logo"
                            style={{
                                height: "25px",
                                width: "auto",
                            }}
                        />
                        <p
                            style={{
                                fontWeight: "900",
                                fontSize: "1rem",
                                color: " #2d3436",
                                marginTop: "0.4rem",
                                lineHeight: 1, // Added to tighten vertical spacing
                            }}
                        >
                            SPARK
                            <sup
                                style={{
                                    fontSize: "0.3em",
                                    marginLeft: "2px",
                                    position: "relative",
                                    top: "-10px", // Moved up 3 pixels
                                    verticalAlign: "baseline", // Changed from super
                                }}
                            >
                                ™
                            </sup>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneView;
