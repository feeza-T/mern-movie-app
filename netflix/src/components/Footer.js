import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const handleCopyNumber = (number) => {
        navigator.clipboard.writeText(number);
        alert("Number copied to clipboard!");
    };

    const handleCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div 
            className="bg-white text-black py-10 border-t border-gray-500"  // Footer background white and text black
            style={{ height: '250px' }}> {/* Increased height */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                
                <div className="flex flex-col items-center space-y-2"> {/* Added flex-col and space for spacing */}
                    <h4 className="text-lg font-bold">Follow Us</h4> {/* Bold Follow Us heading */}
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                    </div>
                </div>

                <div className="text-center my-4 md:my-0">
                    <h4 className="text-lg font-bold">Contact With Us</h4> {/* Bold "Contact With Us" heading */}
                    <p
                        className="cursor-pointer"
                        onClick={() => handleCopyNumber('+1-234-567-8901')}
                        onDoubleClick={() => handleCall('+1-234-567-8901')}
                    >
                        Contact: +1-234-567-8901 (Double-click to Call / Click to Copy)
                    </p>
                    <p
                        className="cursor-pointer"
                        onClick={() => handleCopyNumber('+1-987-654-3210')}
                        onDoubleClick={() => handleCall('+1-987-654-3210')}
                    >
                        Contact: +1-987-654-3210 (Double-click to Call / Click to Copy)
                    </p>
                </div>

                <div className="text-center">
                    <h4 className="font-bold">Video Streaming Details:</h4> {/* Bold Video Streaming Details heading */}
                    <p>Our platform supports HD, Full HD, and 4K video streaming.</p>
                    <p>Enjoy seamless streaming with adaptive bitrate technology.</p>
                    <p>Compatible with all major devices and platforms including mobile, desktop, and smart TVs.</p>
                    <p>Unlimited access to movies and series anytime, anywhere.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
