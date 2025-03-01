import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import NavBar from "../components/NavBar"
import styles from "../styles/Home.module.css"
import analytics1 from "../assets/analytics1.png"
import analytics2 from "../assets/analytics2.png"
import analytics3 from "../assets/analytics3.png"
import logo1 from "../assets/logo1.png"
import img1 from "../assets/AutoLayoutHorizontal.png"
import img2 from "../assets/AutoLayoutHorizontal1.png"
import img3 from "../assets/AutoLayoutHorizontal2.png"
import img4 from "../assets/AutoLayoutHorizontal3.png"
import img5 from "../assets/AutoLayoutHorizontal4.png"
import img6 from "../assets/AutoLayoutHorizontal5.png"
import img7 from "../assets/AutoLayoutHorizontal6.png"
import img8 from "../assets/AutoLayoutHorizontal7.png"
import img9 from "../assets/AutoLayoutHorizontal8.png"
import footerimage from "../assets/footerImg.png"
import { useEffect } from "react"


const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user.token)
            navigate('/link')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const images = [
        img1, img2, img3,
        img4, img5, img6,
        img7, img8, img9
    ];
    console.log(user.token)
    const arrFooter1 = [
        'About Spark', 'Careers', 'Terms and Conditions',
        'Blog', 'Getting Started', 'Privacy Policy',
        'Press', 'Features', 'Cookie Notice',
        'Social Good', 'FAQS', 'Trust Center',
        'Contact', 'Report And Violation'
    ]
    return (
        <div style={{ display: "flex", overflowY: "auto", justifyContent: 'center', margin: '0px', flexDirection: 'column', overflowX: 'hidden', position: 'relative', background: '#F1F6FA', }} >
            <NavBar />
            <div style={{ display: "flex", width: '95%', marginTop: '10rem', marginLeft: '4rem', flexDirection: 'row', height: '50vh', top: '3rem', zIndex: '4' }}>
                <div className={styles.container1}>
                    <h1 className={styles.heading}>The easiest place to update and share your Connection</h1>
                    <p className={styles.text}>
                        Help your followers discover everything you’re sharing all over the internet, in one simple place. They’ll thank you for it!
                    </p>
                    <button className={styles.button}>Get your free Spark</button>
                </div>

                <div style={{ width: "70%" }}>
                    <img src={analytics1} alt="analytics" style={{ width: "100%", height: '100%', objectFit: 'contain' }} />
                </div>

            </div>
            <div style={{ display: "flex", width: '95%', marginTop: '10rem', marginLeft: '4rem', flexDirection: 'row', height: '50vh', top: '3rem', zIndex: '4' }}>
                <div style={{ width: "50%" }}>
                    <img src={analytics2} alt="analytics" style={{ width: "100%", height: '100%', objectFit: 'contain', background: 'white', borderRadius: '20px' }} />
                </div>
                <div className={styles.container1} style={{ paddingLeft: '1rem' }}>
                    <h1 className={styles.heading}>Analyze your audience and keep your followers engaged</h1>
                    <p className={styles.text} style={{ fontSize: "1rem" }}>
                        Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.
                    </p>
                </div>
            </div>

            <div style={{ display: "flex", width: '95%', marginTop: '10rem', marginLeft: '4rem', flexDirection: 'row', height: '50vh', top: '3rem', zIndex: '4' }}>
                <div className={styles.container1} style={{ paddingLeft: '1rem' }}>
                    <h1 className={styles.heading}>Share limitless content in limitless ways</h1>
                    <p className={styles.text} style={{ fontSize: "0.8rem" }}>
                        Connect your content in all its forms and help followers find more of what they’re looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more… It all comes together in one powerful place
                    </p>
                </div>
                <div style={{ width: "70%" }}>
                    <img src={analytics3} alt="analytics" style={{ width: "100%", height: '100%', objectFit: 'contain', borderRadius: '20px' }} />
                </div>
            </div>
            <div style={{ display: "flex", width: '80%', marginTop: '10rem', marginLeft: '4rem', flexDirection: 'row', height: '20vh', top: '3rem', zIndex: '4', justifyContent: 'space-between' }}>
                <div className={styles.container1} style={{ paddingLeft: '1rem', paddingTop: '0px' }}>
                    <h1 className={styles.heading} style={{ paddingTop: '0px' }}>Here&apos;s what our <span style={{ color: '#4caf50' }}>customer</span> has to say</h1>
                    <button className={styles.button} style={{ fontSize: "0.8rem", background: 'none', color: '#4caf50', border: '1px solid #4caf50', padding: '0.5rem 1rem' }}>
                        Read customer stories
                    </button>
                </div>
                <div style={{ width: "20%", display: 'flex', justifyContent: 'center', marginRight: '5vw', alignItems: 'flex-start' }}>
                    <img src={logo1} alt="analytics" style={{ width: "15px", height: '15px', objectFit: 'contain', }} />
                    <p style={{ marginLeft: '0.5rem' }}>[short description goes in here] lorem ipsum is a placeholder text to demonstrate.</p>
                </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.box} style={{ background: '#D7D6D5' }}>
                    <div className={styles.row} style={{ fontSize: '1.2rem', fontWeight: '520' }}>Amazing Tool! Saved me months</div>
                    <div className={styles.row}>This is a placeholder for your testimonials and what the client has to say,put them here and make sure it is 100% true and meaningful</div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.row} style={{ fontSize: '1.2rem', fontWeight: '520' }}>Amazing Tool! Saved me months</div>
                    <div className={styles.row}>This is a placeholder for your testimonials and what the client has to say,put them here and make sure it is 100% true and meaningful</div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.row} style={{ fontSize: '1.2rem', fontWeight: '520' }}>Amazing Tool! Saved me months</div>
                    <div className={styles.row}>This is a placeholder for your testimonials and what the client has to say,put them here and make sure it is 100% true and meaningful</div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.box} style={{ background: '#D7D6D5' }}>
                    <div className={styles.row} style={{ fontSize: '1.2rem', fontWeight: '520' }}>Amazing Tool! Saved me months</div>
                    <div className={styles.row}>This is a placeholder for your testimonials and what the client has to say,put them here and make sure it is 100% true and meaningful</div>
                    <div className={styles.rowBottom}>
                        <div className={styles.circle}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p className={styles.text}>JK Rowling</p>
                            <p className={styles.text}>Director, Spark.com</p>
                        </div>

                    </div>
                </div>
            </div>
            <h1 style={{ padding: '2rem', marginLeft: '2vw' }}>All Link Apps and Integrations</h1>
            <div className={styles.gallery}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img
                            src={image}
                            alt={`Gallery item ${index + 1}`}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', height: '35vh', width: '95%', margin: 'auto', marginTop: '6vh', background: 'white' }}>
                <div style={{ display: 'flex', margin: '2rem' }}>
                    <button style={{ background: '#D3D3D3', marginRight: '1vw', height: '6vh', width: '4vw', border: 'none', borderRadius: '10px' }} onClick={() => navigate('/signin')} >Log in</button>
                    <button className={styles.button1} style={{ height: '6vh', width: '6vw' }} onClick={() => navigate('/signup')}>Sign up</button>
                </div>
                <div className={styles.gridContainer}>
                    {arrFooter1.map((item, index) => (
                        <div key={index} className={styles.gridItem}>{item}</div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%', height: '10vh', margin: "auto", background: 'white' }}>
                <div style={{ width: '40%', margin: '2rem', fontWeight: '600', fontSize: '0.8rem' }}>
                    We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
                </div>
                <div >
                    <img src={footerimage} style={{ marginRight: '1rem', margin: '2rem' }} />
                </div>
            </div>
        </div>
    )
}

export default Home