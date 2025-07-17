import React, { useState, useEffect } from 'react';
import eggs from "../ShopPage/crate.jpg";
import ep31 from "../ShopPage/ep31.png";
import ep2 from "../ShopPage/ep2.png";
import ep34 from "../ShopPage/ep34.png";
import fav from "../ShopPage/fav.jpg";
import wan from "../ShopPage/wan.jpg";
import maone from "../ShopPage/maone.jpg";
import matwo from "../ShopPage/matwo.jpg";
import sograin from "../ShopPage/sog.jpg";
import cow from "../ShopPage/cow.jpg";
import rice from "../ShopPage/rice.jpg";
import nut from "../ShopPage/gnut.jpg";
import compost from "../ShopPage/com.jpg";
import sprint from "../ShopPage/sprint.jpg";

const productsData = [
    { id: 1, name: "EP31", crop: "Hybrid Maize", days: "85 - 110 days (Intermediate)", color: "Yellow", potential: "8.4 t/ha", des: "Tolerant to common maize diseases", price: 45, image: ep31, category: "seeds" },

    { id: 2, name: "EP32", crop: "Hybrid Maize", days: "85 days (Extra-Early)", color: "White", potential: "5.5 t/ha", des: "Drought Tolerant. Tolerant to common maize diseases", price: 40, image: ep2, category: "seeds" },

    { id: 3, name: "EP34", crop: "Hybrid Maize", days: "90 days (Early)", color: "Yellow", potential: "6 t/ha", des: "Drought Tolerant Tolerant to common maize diseases", price: 40, image: ep34, category: "seeds" },

    { id: 4, name: "Afayak", crop: "Soyabean", days: "115-118 days", color: "Yellow", potential: "2-3.5 t/ha", des: "Non-shattering pods", price: 25, image: ep34, category: "seeds" },

    { id: 5, name: "Favour", crop: "Soyabean", days: "110-115 days (Early)", color: "Yellow", potential: "2.0-2.4 t/ha", des: "Non-shattering pods", price: 25, image: fav, category: "seeds" },

    { id: 6, name: "Wang-Kai", crop: "Cowpea", days: "62-65 days (Early)", color: " Creamy White", color2: "Brown", potential: "2.5t/ha", des: "Resistant to Aphids cracivora and Striga ", price: 40, image: wan, category: "seeds" },

    { id: 7, name: "Maize", color: " Yellow", price2: 350, image: maone, category: "grain" },

    { id: 8, name: "Maize", color: " White", price2: 350, image: matwo, category: "grain" },

    { id: 9, name: "Soyabean", price2: 350, image: sograin, category: "grain" },

    { id: 10, name: "Cowpea", price2: 1000, image: cow, category: "grain" },

    { id: 11, name: "Rice(Parboiled)", price2: 360, image: rice, category: "grain" },

    { id: 12, name: "Groundnut", price2: 650, image: nut, category: "grain" },

    { id: 13, name: "Compost", price2: 70, image: compost, category: "poultry products" },

    { id: 14, name: "Crate of Eggs(Unsorted)", price2: 57, image: eggs, category: "poultry products" },

    { id: 15, name: "Sprint Layer(For meat)", price3: 80, image: sprint, category: "poultry products" },

];


const ShopItems = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('grainCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showCart, setShowCart] = useState(false);
    const [email, setEmail] = useState('');
    const [wantsReceipt, setWantsReceipt] = useState(false);


    useEffect(() => {
        localStorage.setItem('grainCart', JSON.stringify(cart));
    }, [cart]);

    const filteredProducts = productsData.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleAddOrRemove = (product) => {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            setCart(cart.filter(item => item.id !== product.id));
            alert(`${product.name} removed from cart.`);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
            alert(`${product.name} added to cart.`);
        }
    };

    const handleIncrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const handleDecrease = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCart(updatedCart);
    };

    const total = cart.reduce((acc, item) => {
        const unitPrice = item.price || item.price2 || item.price3 || 0;
        return acc + unitPrice * item.quantity;
    }, 0);

    const handlePaystackPayment = () => {
        // Safety check: Make sure Paystack is loaded
        if (!window.PaystackPop) {
            alert("Paystack is not ready. Please try again in a few seconds.");
            return;
        }

        // If user wants a receipt but did not enter email, prompt them
        if (wantsReceipt && email.trim() === '') {
            alert("Please enter your email to receive a receipt.");
            return;
        }

        // Set user email based on whether they want a receipt
        const userEmail = wantsReceipt && email.trim() !== ''
            ? email
            : `guest_${Date.now()}@noemail.com`;

        const handler = window.PaystackPop.setup({
            key: 'pk_live_1b8c09489c60a19e9bfc06bdab8490d7fb248fb3', // Replace with your actual public key
            email: userEmail,
            amount: total * 100, // Paystack uses kobo/pesewas
            currency: 'GHS',
            ref: 'ref_' + Math.floor(Math.random() * 1000000000 + 1),
            callback: function (response) {
                alert('🎉 Payment successful! Reference: ' + response.reference);
                setCart([]);
                localStorage.removeItem('grainCart');
                setShowCart(false);
                setEmail('');
                setWantsReceipt(false);
            },
            onClose: function () {
                alert('❌ Payment popup closed. Transaction not completed.');
            }
        });

        handler.openIframe();
    };


    return (
        <div className="min-h-screen bg-white text-green-900 relative">
            <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
                <div className='sticky top-[4rem] z-40 bg-white py-4 px-4 md:px-8'>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                        <h1 className="text-3xl font-bold">Shop Our Products</h1>

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="border px-4 py-2 rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="relative inline-block">
                            <select
                                className="appearance-none border px-6 py-2 rounded-full pr-10"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="grain">Grains</option>
                                <option value="poultry products">Poultry Products</option>
                                <option value="seeds">Seeds</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12a1 1 0 01-.7-.3l-3-3a1 1 0 111.4-1.4L10 9.58l2.3-2.3a1 1 0 111.4 1.42l-3 3a1 1 0 01-.7.3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900"
                        >
                            View Cart ({cart.length})
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map(product => {
                        const inCart = cart.find(item => item.id === product.id);
                        return (
                            <div
                                key={product.id}
                                className="flex flex-col justify-between h-full border-gray-900 shadow-lg rounded-lg overflow-hidden p-4"
                            >
                                <div>
                                    <img src={product.image} alt={product.name} loading='lazy' className="w-full h-64 object-cover mb-4" />
                                    <h2 className="text-xl font-semibold">{product.name}</h2>

                                    {product.crop && (
                                        <p className="text-gray-500 font-bold mb-2">
                                            <span className="text-gray-600">Crop: </span>{product.crop}
                                        </p>
                                    )}
                                    {product.days && (
                                        <p className="text-gray-500 font-bold mb-2">
                                            <span className="text-gray-600">Days of Maturity: </span>{product.days}
                                        </p>
                                    )}
                                    {product.color && (
                                        <p className="text-gray-500 font-bold mb-2">
                                            <span className="text-gray-600">Grain Color: </span>{product.color}
                                        </p>
                                    )}
                                    {product.color2 && (
                                        <p className="text-gray-500 font-bold mb-2">
                                            <span className="text-gray-600">Grain Color: </span>{product.color2}
                                        </p>
                                    )}
                                    {product.potential && (
                                        <p className="text-gray-500 font-bold mb-2">
                                            <span className="text-gray-600">Potential yield: </span>{product.potential}
                                        </p>
                                    )}
                                    {product.des && (
                                        <p className="text-gray-500 font-bold mb-2">{product.des}</p>
                                    )}
                                    {product.price && (
                                        <p className="text-gray-500 font-bold mb-4">
                                            <span className="text-gray-600">Price: </span>GH₵{product.price}/kg
                                        </p>
                                    )}
                                    {product.price2 && (
                                        <p className="text-gray-500 font-bold mb-4">
                                            <span className="text-gray-600">Price: </span>GH₵{product.price2}/50kg
                                        </p>
                                    )}
                                    {product.price3 && (
                                        <p className="text-gray-500 font-bold mb-4">
                                            <span className="text-gray-600">Price: </span>GH₵{product.price3}/Bird
                                        </p>
                                    )}
                                </div>

                                <button
                                    className={`w-48 px-4 py-2 rounded-full mt-auto ${inCart ? 'bg-red-600 hover:bg-red-700' : 'bg-green-900 hover:bg-green-900'} text-white`}
                                    onClick={() => handleAddOrRemove(product)}
                                >
                                    {inCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {showCart && (
                <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg border-l p-6 overflow-y-auto z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-green-800 hover:text-red-600 text-2xl font-bold"
                            aria-label="Close cart"
                        >
                            &times;
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p>GH₵{item.price || item.price2 || item.price3} x {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleDecrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrease(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-6">
                                <label className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={wantsReceipt}
                                        onChange={(e) => setWantsReceipt(e.target.checked)}
                                        className="accent-green-700"
                                    />
                                    <span className="text-sm">Email me a receipt</span>
                                </label>

                                {wantsReceipt && (
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full border p-2 rounded mb-4"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                )}

                                <div className="font-semibold mb-2">Total: GH₵{total}</div>
                                <button
                                    onClick={handlePaystackPayment}
                                    className="w-full bg-green-800 text-white py-2 rounded-full hover:bg-green-900"
                                >
                                    Click to Pay
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShopItems;
