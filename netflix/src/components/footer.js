import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <div className="flex justify-center space-x-4 mb-4">
                <a href="/contact" className="text-blue-300 hover:text-blue-500">
                    Contact Us
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
                    Facebook
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
                    Twitter
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
                    Instagram
                </a>
            </div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
