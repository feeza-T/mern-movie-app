import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSection = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/browse"); // Navigate to the Premium Movies page
    };

    return (
        <section className="bg-gray-800 text-gray-300 min-h-screen flex flex-col items-center pt-10">
            <h1 className="text-4xl text-white font-bold mb-8">Make a Payment</h1>
            <div className="max-w-xl w-full bg-black rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Choose Your Subscription Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Subscription Plan 1 */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl text-white font-semibold">Basic Plan</h3>
                        <p className="mt-2 pl-5">$8.99/month</p>
                        <p className="mt-4 text-gray-400">Access to standard definition streaming.</p>
                    </div>

                    {/* Subscription Plan 2 */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl text-white font-semibold">Standard Plan</h3>
                        <p className="mt-2 pl-5">$13.99/month</p>
                        <p className="mt-4 text-gray-400">Access to high definition streaming.</p>
                    </div>

                    {/* Subscription Plan 3 */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl text-white font-semibold">Premium Plan</h3>
                        <p className="mt-2 pl-5">$17.99/month</p>
                        <p className="mt-4 text-gray-400">Access to ultra-high definition streaming.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                <form className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Name on Card" 
                        className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" 
                    />
                    <input 
                        type="text" 
                        placeholder="Card Number" 
                        className="w-full p-2 rounded-md bg-gray-700 border border-gray-600" 
                    />
                    <div className="flex justify-between">
                        <input 
                            type="text" 
                            placeholder="MM/YY" 
                            className="w-1/2 p-2 rounded-md bg-gray-700 border border-gray-600" 
                        />
                        <input 
                            type="text" 
                            placeholder="CVV" 
                            className="w-1/3 p-2 rounded-md bg-gray-700 border border-gray-600" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-500 transition"
                    >
                        Complete Payment
                    </button>
                </form>
                <button 
                    type="button" // Changed from "cancel" to "button" for semantic correctness
                    className="w-full bg-red-800 mt-5 text-white font-bold py-2 rounded-md hover:bg-red-700 transition"
                    onClick={handleCancel} // Added onClick handler
                >
                    Cancel
                </button>
            </div>
        </section>
    );
};

export default PaymentSection;
