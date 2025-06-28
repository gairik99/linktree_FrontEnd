import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getUserWithLinks } from "../services/action";
// import { useAuth } from "../context/authContext";
import { setUser } from "../slices/authSlice";
import { useLink } from "../context/linkContext";
import PhoneView from "../components/PhoneView";

const ProfileDetailsPage = () => {
    const { userid } = useParams();
    // const { setUser } = useAuth();
    const { setLink } = useLink();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await getUserWithLinks(userid);

                // Update user context
                // setUser(prev => ({
                //     ...prev,
                //     userName: response.userName,
                //     imageurl: response.imageurl,
                //     bannerBackground: response.bannerBackground,
                //     bannerColor: response.bannerColor,
                //     buttonAlignment: response.buttonAlignment,
                //     buttonStyle: response.buttonStyle,
                //     buttonColor: response.buttonColor,
                //     buttonFontColor: response.buttonFontColor,
                //     theme: response.theme,
                //     id: response._id
                // }));
                dispatch(setUser({
                    ...user,
                    userName: response.userName,
                    imageurl: response.imageurl,
                    bannerBackground: response.bannerBackground,
                    bannerColor: response.bannerColor,
                    buttonAlignment: response.buttonAlignment,
                    buttonStyle: response.buttonStyle,
                    buttonColor: response.buttonColor,
                    buttonFontColor: response.buttonFontColor,
                    theme: response.theme,
                    id: response._id

                }))

                // Update link context
                setLink(response.links || []);
            } catch (error) {
                toast.error(error.message || "Failed to load profile");
            }
        };

        fetchLinks();
    }, [userid, setLink, dispatch, user]);
    // console.log("ProfileDetailsPage rendered");

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#8ecae6' }}>
            <PhoneView />
        </div>
    )
}

export default ProfileDetailsPage