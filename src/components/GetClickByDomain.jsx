import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { getClickByDomain } from "../services/action"
import { PieChart } from '@mui/x-charts/PieChart';
import { Container, Typography } from "@mui/material";

const GetClickByDomain = () => {
    const { user } = useAuth();
    const [clickDomain, setClickDomain] = useState([])
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getClickByDomain(user.token);
                setClickDomain(newdata.data);
            } catch (error) {
                toast.error("Something went wrong", error);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const chartData = clickDomain.map((item, index) => ({
        id: index,
        label: item._id.charAt(0).toUpperCase() + item._id.slice(1), // Capitalize first letter
        value: item.totalClicks,
        color: [
            '#2e7d32', // Dark green
            '#388e3c',
            '#43a047',
            '#4caf50',
            '#66bb6a' // For more categories
        ][index % 5] // Cycle through colors if more than 4 categories
    }));
    // console.log('clickDomain', clickDomain)
    return (
        <Container sx={{
            textAlign: 'start',
            background: 'white',
            borderRadius: '10px',
            width: '100%',
            maxWidth: 600,
            height: 400,
            padding: '0.5rem', // Add this
        }}>
            <Typography variant="h5" gutterBottom>
                Sites
            </Typography>

            {chartData.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: chartData,
                            innerRadius: 40,
                            outerRadius: 120,
                            paddingAngle: 2,
                            cornerRadius: 5,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30 }
                        }
                    ]}
                    width={600}
                    height={400}
                    sx={{
                        height: '100%',
                        '& .MuiChartsLegend-root': {
                            transform: 'translateX(-20px)' // Compact legend
                        }
                    }}
                    margin={{ right: 200 }}
                    slotProps={{
                        legend: {
                            direction: 'column',
                            position: { vertical: 'middle', horizontal: 'right' },
                            padding: 0,
                        }
                    }}
                />
            ) : (
                <Typography variant="body1">No data available</Typography>
            )}
        </Container>
    )
}

export default GetClickByDomain