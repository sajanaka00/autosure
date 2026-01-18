import car1Image from '../assets/images/cars/bmw.jpg';
import car2Image from '../assets/images/cars/blog2.jpg';
import car3Image from '../assets/images/cars/blog3.jpg';
import car4Image from '../assets/images/cars/blog4.jpg';
import car5Image from '../assets/images/cars/blog5.jpg';
import car6Image from '../assets/images/cars/blog6.jpg';

export const fallbackBlogPosts = [
    {
        _id: '1',
        category: "Technology",
        title: "The Future of Electric Architecture",
        excerpt: "Exploring how EV platforms are revolutionizing vehicle design and interior space.",
        author: { name: "Alex Morgan", bio: "EV Specialist and Automotive Engineer." },
        createdAt: "2024-03-15",
        image: car1Image,
        readTime: "5 min read",
        content: {
            intro: "Electric vehicle platforms are not just changing how cars drive, but how they are built, designed, and lived in.",
            body: "The shift to electrification has liberated automotive designers from the constraints of the combustion engine. Without the need for a massive engine block, transmission tunnel, and exhaust system, the 'skateboard' chassis allows for radically new interior configurations.\n\nAutomakers are now reimagining the car as a lounge space. Swiveling seats, flat floors, and augmented reality windshields are moving from concept cars to production vehicles. This shift isn't just about comfort; it's about redefining the relationship between the passenger and the machine.\n\nSafety architectures are also evolving. The battery pack, located in the floor, lowers the center of gravity, reducing rollover risk. Crump zones are being redesigned to manage energy absorption more efficiently than ever before.",
            quote: {
                text: "The skateboard chassis is the canvas upon which the future of mobility will be painted.",
                author: "Chief Design Officer"
            }
        },
        images: {
            hero: car1Image,
            content: car2Image
        },
        likes: 124,
        approvedComments: []
    },
    {
        _id: '2',
        category: "Reviews",
        title: "2024 BMW X5: A Masterclass in Luxury",
        excerpt: "Detailed breakdown of the new X5's performance, comfort, and tech features.",
        author: { name: "Sarah Jenkins", bio: "Luxury Car Reviewer with 10 years experience." },
        createdAt: "2024-03-12",
        image: car2Image,
        readTime: "8 min read",
        content: {
            intro: "The 2024 BMW X5 continues to set the benchmark for what a luxury SUV should be.",
            body: "From the moment you step inside, the attention to detail is evident. The crystal controls, the Merino leather upholstery, and the panoramic sky lounge LED roof create an atmosphere of sophisticated opulence.\n\nOn the road, the X5 balances comfort and sportiness with characteristic BMW poise. The air suspension absorbs imperfections with ease, while the steering remains precise and engaging. Whether navigating city streets or cruising on the highway, the experience is effortless.\n\nThe technology suite has also seen a major upgrade. The new Curved Display runs iDrive 8.5, offering intuitive control over navigation, media, and vehicle settings. It's a powerhouse of a vehicle that doesn't compromise on family practicality.",
            quote: {
                text: "It isn't just an SUV; it is a statement of intent.",
                author: "Automotive Daily"
            }
        },
        images: {
            hero: car2Image,
            content: car3Image
        },
        likes: 89,
        approvedComments: []
    },
    {
        _id: '3',
        category: "Industry News",
        title: "Global Automotive Trends Report 2024",
        excerpt: "Key insights into where the automotive industry is heading in the next decade.",
        author: { name: "David Chen", bio: "Market Analyst." },
        createdAt: "2024-03-10",
        image: car3Image,
        readTime: "12 min read",
        content: {
            intro: "The automotive landscape is shifting faster than ever before.",
            body: "Sustainability, connectivity, and autonomy are the three pillars driving this change. Manufacturers are racing to achieve carbon neutrality, not just in their vehicles but across their entire supply chains.\n\nConnectivity is transforming the car into a digital device. Over-the-air updates mean your car gets better with time, adding features and improving performance long after it has left the dealership.\n\nAutonomy remains the holy grail. While Level 5 autonomy is still years away, advanced driver-assistance systems are making driving safer and less fatiguing today.",
            quote: { text: "Adapt or be left behind.", author: "Industry Insider" },
        },
        images: { hero: car3Image, content: car4Image },
        likes: 215,
        approvedComments: []
    },
    {
        _id: '4',
        category: "Maintenance",
        title: "Essential Spring Car Care Guide",
        excerpt: "Get your vehicle ready for the warmer months with this comprehensive checklist.",
        author: { name: "Mike Ross", bio: "Senior Mechanic." },
        createdAt: "2024-03-08",
        image: car4Image,
        readTime: "4 min read",
        content: {
            intro: "Spring is here, and it's time to shake off the winter chill from your vehicle.",
            body: "Winter takes a toll on cars. Salt, cold temperatures, and potholes can cause hidden damage. Start with a thorough wash and wax to protect the paint. Check your tire pressure and tread depth; temperature fluctuations can affect inflation.\n\nVerify your fluids. Oil, coolant, and brake fluid are the lifeblood of your engine. Replacing 'winter' wiper blades with standard ones ensures clear visibility during spring showers.",
            quote: { text: "Maintenance is cheaper than repair.", author: "The Garage" },
        },
        images: { hero: car4Image, content: car5Image },
        likes: 45,
        approvedComments: []
    },
    {
        _id: '5',
        category: "Lifestyle",
        title: "Best Road Trip Routes for Summer",
        excerpt: "Discover hidden gems and scenic routes across the country for your next adventure.",
        author: { name: "Emma Wilson", bio: "Travel Writer." },
        createdAt: "2024-03-05",
        image: car5Image,
        readTime: "6 min read",
        content: {
            intro: "The open road beckons. Here are the top routes to explore this summer.",
            body: "From the coastal highways of California to the mountain passes of the Rockies, these drives offer breathtaking views and unforgettable experiences. Pack your bags, create a playlist, and just drive.\n\nRoute 1: The Pacific Coast Highway. Iconic for a reason. Route 2: The Blue Ridge Parkway. A slower pace through Appalachia. Route 3: The Overseas Highway. Driving on water in the Florida Keys.",
            quote: { text: "The journey is the destination.", author: "Traveler's Digest" },
        },
        images: { hero: car5Image, content: car6Image },
        likes: 156,
        approvedComments: []
    },
    {
        _id: '6',
        category: "Technology",
        title: "AI in Automotive Safety Systems",
        excerpt: "How artificial intelligence is making our roads safer than ever before.",
        author: { name: "James Lee", bio: "Tech Editor." },
        createdAt: "2024-03-01",
        image: car6Image,
        readTime: "7 min read",
        content: {
            intro: "AI is the invisible co-pilot in modern vehicles.",
            body: "Automatic emergency braking, lane-keeping assist, and adaptive cruise control all rely on sophisticated AI algorithms processing data from cameras and radar. These systems react faster than human reflexes, preventing accidents before they happen.\n\nThe next generation of safety systems will predict hazardous situations by analyzing traffic patterns and pedestrian behavior.",
            quote: { text: "Safety is not a feature, it's a necessity.", author: "NCAP" },
        },
        images: { hero: car6Image, content: car1Image },
        likes: 98,
        approvedComments: []
    },
];
