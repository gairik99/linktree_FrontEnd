import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { getTopLink } from "../services/action";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography, Container } from "@mui/material";

const GetLinkWithmaxClick = () => {
    const { user } = useAuth();
    const [topLink, setTopLink] = useState([]);
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const newdata = await getTopLink(user.token);
                setTopLink(newdata.data);
            } catch (error) {
                toast.error("Something went wrong", error);
            }
        };
        fetchLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.log(topLink);
    const greenShades = [
        "#2e7d32", // Dark green
        "#388e3c",
        "#43a047",
        "#4caf50",
        "#66bb6a", // Light green
    ];

    const chartData = topLink.map((item, index) => ({
        label: `link ${index + 1}`,
        value: item.totalClicks,
        originalUrl: item.linkUrl, // Keep original URL for tooltip
    }));
    return (
        <Container
            sx={{
                background: "white",
                borderRadius: "10px",
                height: 400,
                mb: 3,
                ml: 0,

            }}
        >
            <Typography variant="h5" gutterBottom sx={{ mb: 3, p: 1 }}>
                Traffic by links
            </Typography>

            {chartData.length > 0 ? (
                <BarChart
                    dataset={chartData}
                    xAxis={[
                        {
                            scaleType: "band",
                            dataKey: "label",
                        },
                    ]}
                    series={[
                        {
                            dataKey: "value",
                            color: greenShades,
                        },
                    ]}
                    yAxis={[{}]}
                    height={300}
                    sx={{
                        "& .MuiChartsAxis-tickLabel": {
                            fontSize: "0.75rem",
                        },
                        "& .MuiBarElement-root": {
                            rx: 3,
                            ry: 3,
                        },
                    }}
                    tooltip={{
                        trigger: "item",
                        renderer: (params) => (
                            <div
                                style={{
                                    background: "white",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            >
                                <strong>{params.series.dataKey}:</strong> {params.value}
                                <br />
                                <span style={{ fontSize: "0.8rem", color: "#666" }}>
                                    {chartData[params.dataIndex]?.originalUrl}
                                </span>
                            </div>
                        ),
                    }}
                />
            ) : (
                <Typography variant="body1">No link data available</Typography>
            )}
        </Container>
    );
};

export default GetLinkWithmaxClick;
