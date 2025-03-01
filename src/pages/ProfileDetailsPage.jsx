import { useParams } from "react-router-dom"

const ProfileDetailsPage = () => {
    const { userid } = useParams();
    console.log(userid)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>ProfileDetailsPage  {userid}</div>
    )
}

export default ProfileDetailsPage