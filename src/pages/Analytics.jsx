import { useAuth } from "../context/authContext";
import SideBar from "../components/SideBar";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Analytics = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useAuth();
    return (
        <div
            style={{
                display: "flex",
                overflow: "auto",
                position: "realtive",
                paddingBottom: "1rem",
                background: " #F1F6FA"
            }}
        >
            <SideBar />
            <div style={{ display: "flex", flexDirection: "column", width: '80vw' }}>
                <div
                    style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
                >
                    <p>
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Hi,</span>{" "}
                        {user.name}!
                    </p>
                    <span>Congratulations. You got a great response today.</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <h4 style={{ padding: "1rem", marginTop: '1.2rem' }}>Overview</h4>
                    <div style={{ display: 'flex', margin: '0px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', margin: '1rem' }}>
                            <CiCalendar />
                        </div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
