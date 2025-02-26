import share from "../assets/share.png";
import person from "../assets/person.png";
import { useAuth } from "../context/authContext";
import TabComponent from "../components/TabComponent"
import PhoneLinkContainer from "./PhoneLinkContainer";

import PhoneShopContainer from "./PhoneShopContainer";
import { useTab } from "../context/tabContext";

const PhoneView = () => {
    const { user } = useAuth();
    const { activeTab } = useTab();
    // console.log(user);
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
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                }} >
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
                    <p style={{ position: 'absolute', bottom: '1rem', color: user?.bannerColor || 'white', fontSize: '1.2rem' }}>@{user.userName}</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '70%' }}>
                <TabComponent />
                {activeTab == 'link' && <PhoneLinkContainer layout='stack' />}
                {activeTab == 'shop' && <PhoneShopContainer layout='grid' />}
            </div>
        </div>
    );
};

export default PhoneView;
