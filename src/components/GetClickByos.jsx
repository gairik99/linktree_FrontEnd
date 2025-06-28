import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClickByOs } from "../services/action"
// import { useAuth } from "../context/authContext";
import { useSelector } from "react-redux";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const GetClickByos = () => {
    const user = useSelector((state) => state.auth.user);
    const [clickOs, setClickOs] = useState([])
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getClickByOs(user.token);
                setClickOs(newdata.data);
            } catch (error) {
                toast.error("Something went wrong", error);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const greenShades = [
        '#2e7d32', // Dark green
        '#388e3c',
        '#43a047',
        '#4caf50',
        '#66bb6a'  // Light green
    ];
    const chartData = clickOs.map(item => ({
        os: item._id,
        clicks: item.totalClicks
    }));
    // console.log(clickOs)
    return (
        <div style={{ width: '100%', maxWidth: 600, background: 'white', padding: '0.5rem', borderRadius: '10px', height: 400 }}>
            <h2>Traffic by Device</h2>
            {chartData.length > 0 ? (
                <BarChart
                    dataset={chartData}
                    xAxis={[{
                        scaleType: 'band',
                        dataKey: 'os',

                    }]}
                    series={[{
                        dataKey: 'clicks',
                        color: greenShades,
                    }]}
                    yAxis={[{

                    }]}
                    height={400}
                    sx={{
                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translate(-20px, 0)',
                        },
                        // Optional: Add custom bar styling
                        '& .MuiBarElement-root': {
                            rx: 4, // Rounded corners
                            ry: 4
                        }
                    }}
                    colors={greenShades} // Alternative approach
                />
            ) : (
                <p>No data available</p>
            )}
        </div>
    )
}

export default GetClickByos