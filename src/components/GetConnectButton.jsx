// import { useAuth } from "../context/authContext";
import { useSelector } from "react-redux";
import { createClick } from "../services/action";
import { toast } from "react-toastify";
const GetConnectButton = () => {
    const user = useSelector((state) => state.auth.user);
    // console.log(user)
    const handleCtaClick = async () => {
        try {
            // console.log("cta");
            const response = await createClick({
                id: user.id,
                category: "cta",
                domain: "others",
            });
            console.log(response);
        } catch (err) {
            toast.error("something went wrong", err.message);
        }
    };

    return (
        <button
            style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "0.8rem 1.5rem",
                border: "none",
                borderRadius: "20px",
                fontSize: " 1rem",
                width: "100%",
                margin: "auto",
                height: "40px",
                textAlign: "center",
            }}
            onClick={handleCtaClick}
        >
            Get Connected
        </button>
    )
}

export default GetConnectButton