import PageWithTopAndSideBar from "./PageWithTopAndSideBar.jsx";
import {useEffect, useState} from "react";
import ContactWidget from "./ContactWidget.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const posts = [
    {
        id: 1,
        title: "The Importance of Regular Dental Checkups",
        content:
            "Regular dental visits are essential to maintaining healthy teeth and gums...",
        image: "https://static01.nyt.com/images/2024/04/23/well/12WELL-ADVOCATE-DENTIST/12WELL-ADVOCATE-DENTIST-mediumSquareAt3X.jpg",
    },
    {
        id: 2,
        title: "Top 5 Tips for a Brighter Smile",
        content:
            "From brushing technique to professional cleanings, here are five tips...",
        image: "https://www.shutterstock.com/image-vector/little-kid-go-dentist-cleaning-600nw-2229828281.jpg",
    },
    {
        id: 3,
        title: "What to Expect During Your First Appointment",
        content:
            "Visiting a new dentist can be nerve-wracking. Here's what to expect...",
        image: "https://cdn.creazilla.com/cliparts/69125/dentist-clipart-original.png",
    },
];

const contactInfo = {
    phone: "+40758122580",
    email: "stomarix@dental.com",
    addressLine1: "Strada Yugoslaviei 66",
    addressLine2: "Cluj-Napoca, Cluj, Romania",
};

function HomePage() {
    const [copied, setCopied] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#contact-info') {
            const el = document.getElementById('contact-info');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                navigate(location.pathname, { replace: true });
            }, 1000);
        }
    }, [location, navigate]);

    const handleCopyNumber = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.phone);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <PageWithTopAndSideBar>
            <div className="flex-1">
                {/* Header Section */}
                <section
                    className="text-center bg-cover bg-center py-20"
                    style={{
                        backgroundImage:
                            'url("https://dentistry.co.uk/app/uploads/2024/01/dentists-jan.jpg")',
                    }}
                >
                    <h1 className="text-2xl font-semibold mb-4 text-invert">Welcome to our Website</h1>
                    <div className="flex flex-col items-center gap-4">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg border border-black text-lg font-medium"
                            onClick={() => navigate("/patient/schedule-appointment")}
                        >
                            Make an Appointment for a Check-up
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg border border-black text-lg font-medium"
                            onClick={handleCopyNumber}
                        >
                            {copied ? (
                                <>
                                    Copied ✅
                                </>
                            ):(
                                <>
                                    Call us on
                                    <br/>
                                    ☎️ {contactInfo.phone}
                                    <p className="text-xs">Click to Copy</p>
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* Posts Section */}
                <main className="w-full px-10 py-10 space-y-10">
                    <div className="space-y-10">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="flex flex-col md:flex-row bg-gray-200 text-black p-6 rounded-3xl shadow-md items-center"
                            >
                                <img
                                    src={`${post.image}?auto=format&fit=crop&w=400&h=400`}
                                    alt={post.title}
                                    className="w-56 h-56 object-cover rounded-lg mr-6 mb-4 md:mb-0"
                                />

                                <div>
                                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <ContactWidget
                            phone={contactInfo.phone}
                            email={contactInfo.email}
                            addressLine1={contactInfo.addressLine1}
                            addressLine2={contactInfo.addressLine2}
                        />
                    </div>
                </main>
            </div>
        </PageWithTopAndSideBar>
    );
}

export default HomePage;