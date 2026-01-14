import React from 'react';

const AboutMarquee = () => {
    const brands = [
        { name: "Audi", logo: "https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" },
        { name: "BMW", logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png" },
        { name: "Mercedes", logo: "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png" },
        { name: "Porsche", logo: "https://logos-world.net/wp-content/uploads/2021/06/Porsche-Logo.png" },
        { name: "Tesla", logo: "https://logos-world.net/wp-content/uploads/2020/10/Tesla-Logo.png" },
        { name: "Lexus", logo: "https://logos-world.net/wp-content/uploads/2021/10/Lexus-Logo.png" },
        { name: "Jaguar", logo: "https://logos-world.net/wp-content/uploads/2021/04/Jaguar-Logo.png" },
        { name: "Land Rover", logo: "https://logos-world.net/wp-content/uploads/2021/04/Land-Rover-Logo.png" }
    ];

    return (
        <section className="au-marquee-section">
            <div className="au-marquee-content">
                {brands.map((brand, i) => (
                    <div key={i} className="au-brand-item">
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
                {/* Duplicate for infinite scroll */}
                {brands.map((brand, i) => (
                    <div key={`d-${i}`} className="au-brand-item">
                        <img src={brand.logo} alt={brand.name} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutMarquee;
