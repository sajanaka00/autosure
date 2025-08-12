import React from 'react';
import ChooseUs1 from '../../assets/images/vectors/choose-us1.png'
import ChooseUs2 from '../../assets/images/vectors/choose-us2.png'
import ChooseUs3 from '../../assets/images/vectors/choose-us3.png'
import ChooseUs4 from '../../assets/images/vectors/choose-us4.png'
import '../../styles/why-choose-us.css';

const WhyChooseUs = () => {
  return (
    <div className="wcu-section">
      <div className="wcu-title">Why Choose Us?</div>
      
      <div className="wcu-features-grid">
        {/* First Feature - Special Financing Offers */}
        <div className="wcu-feature">
          <div className="wcu-icon-1">
            <div className="wcu-icon-wrapper">
              <div className="wcu-icon-inner">
                <img className="wcu-icon-img" src={ChooseUs1} alt="Special Financing Offers" />
              </div>
            </div>
          </div>
          <div className="wcu-heading-1">
            Special Financing Offers
          </div>
          <div className="wcu-desc-1">
            Our stress-free finance department that can
            find financial solutions to save you money.
          </div>
        </div>

        {/* Second Feature - Trusted Car Dealership */}
        <div className="wcu-feature">
          <div className="wcu-icon-2">
            <div className="wcu-icon-wrapper">
              <img className="wcu-icon-img" src={ChooseUs2} alt="Trusted Car Dealership" />
            </div>
          </div>
          <div className="wcu-heading-2">Trusted Car Dealership</div>
          <div className="wcu-desc-2">
            Our stress-free finance department that can
            find financial solutions to save you money.
          </div>
        </div>

        {/* Third Feature - Transparent Pricing */}
        <div className="wcu-feature">
          <div className="wcu-icon-3">
            <div className="wcu-icon-wrapper">
              <div className="wcu-icon-inner">
                <img className="wcu-icon-img" src={ChooseUs3} alt="Transparent Pricing" />
              </div>
            </div>
          </div>
          <div className="wcu-heading-3">Transparent Pricing</div>
          <div className="wcu-desc-3">
            Our stress-free finance department that can
            find financial solutions to save you money.
          </div>
        </div>

        {/* Fourth Feature - Expert Car Service */}
        <div className="wcu-feature">
          <div className="wcu-icon-4">
            <div className="wcu-icon-wrapper">
              <img className="wcu-icon-img" src={ChooseUs4} alt="Expert Car Service" />
            </div>
          </div>
          <div className="wcu-heading-4">Expert Car Service</div>
          <div className="wcu-desc-4">
            Our stress-free finance department that can
            find financial solutions to save you money.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;