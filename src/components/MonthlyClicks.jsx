import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LineChart } from '@mui/x-charts/LineChart';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getClickByMonth } from '../services/action';
import { useAuth } from '../context/authContext';


const MonthlyClicks = () => {
    // Ensure data is sorted by month (assuming months are in format 1-12)
    const { user } = useAuth();
    const [clickMonth, setClickMonth] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getClickByMonth(user.token);
                setClickMonth(newdata.data);
            } catch (error) {
                toast.error("Something went wrong", error);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Extract months correctly from _id
    const sortedData = [...clickMonth]
        .map(item => ({
            month: item._id.month,  // Correctly extract month
            totalClicks: item.totalClicks || 0 // Ensure no undefined values
        }))
        .sort((a, b) => a.month - b.month); // Sort month-wise

    // Convert month numbers to short names
    const monthNames = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    };

    return (
        <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '12px', padding: '1rem' }}>
            <h5>Monthly Clicks Overview</h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <LineChart
                    xAxis={[{
                        data: sortedData.map(item => monthNames[item.month]), // Extract correctly
                        scaleType: 'band',
                        label: 'Months'
                    }]}
                    series={[{
                        data: sortedData.map(item => item.totalClicks),
                        label: 'Total Clicks',
                        showMark: true,
                        color: '#22D679'
                    }]}
                    height={300}
                    margin={{ left: 70 }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default MonthlyClicks;