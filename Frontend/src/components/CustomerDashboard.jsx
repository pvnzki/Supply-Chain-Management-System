import React, { useEffect, useContext, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';
import { AiFillDashboard } from "react-icons/ai";
import { FaYandex, FaTruck } from 'react-icons/fa';
import Shop, { orders } from '../pages/Customer/Shop'; 

const CustomerDashboard = () => {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 


  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  useEffect(() => {
    if (location.pathname === '/customer') {
      console.log("Dashboard loaded"); 
    }
  }, [location.pathname]); 

  return (
    <div className="flex min-h-screen font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-tr from-emerald-500 via-cyan-700 to-blue-500 shadow-xl rounded-r-xl">
        <div className="py-6 px-6 flex items-center justify-center">
          <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
            <h2 className="text-2xl font-semibold text-white ml-1 mr-2 mt-1">PathS</h2>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" fill='#ffff'>
                <path d="M36,4H14C8.477,4,4,8.477,4,14v22c0,5.523,4.477,10,10,10h22c5.523,0,10-4.477,10-10V14C46,8.477,41.523,4,36,4z M14.869,39.252c-0.84-0.587-6.333-4.256-6.333-4.256l4.116-5.04l2.559,1.827c0.951,1.536,2.298,3.699,2.931,4.649 c0.632,0.948,0.931,2.78,0.985,3.346l0.073,0.759C17.964,40.778,16.399,40.312,14.869,39.252z M24.664,35.752L20.8,39.616 c0,0-0.252-2.605-1.26-4.116c-1.008-1.511-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.36-3.36 c0,0,0.756,1.848,1.764,3.528c1.092,1.764,3.948,6.384,3.948,6.384C25.504,32.728,25.672,34.744,24.664,35.752z M25.927,28.78 c0,0-0.569-0.307-1.357-0.736c-0.925-1.496-2.196-3.552-2.846-4.601c-0.914-1.524-1.63-3.263-1.638-3.28l-0.148-0.36 c1.026-0.236,2.423,0.327,3.972,1.295c0.03,0,0.54,0.283,1.242,0.685c0.953,1.541,2.34,3.768,2.985,4.737 c0.854,1.353,1.473,3.258,1.478,3.277l0.07,0.218C28.621,30.104,27.258,29.668,25.927,28.78z M34.66,25.84l-3.444,3.444 c0,0-0.673-2.1-1.68-3.695c-1.008-1.512-3.948-6.3-3.948-6.3c-1.26-2.016-1.428-4.032-0.42-5.04l3.864-3.864 c0,0,0.252,2.352,1.26,4.032C31.384,16.18,34.24,20.8,34.24,20.8C35.5,22.816,35.668,24.832,34.66,25.84z M37.516,19.96 l-3.213-2.252l-2.583-4.176c-0.65-1.085-0.957-2.773-1.018-3.33l-0.114-1.029c1.244-0.44,2.973-0.004,4.656,1.291 c0.84,0.589,6.388,4.456,6.388,4.456L37.516,19.96z"></path>
            </svg>
          </Link>
        </div>
        <div className="flex items-center px-6 py-4 text-gray-200 mb-0 mt-6">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
            alt="Bordered avatar"
            onClick={openModal} 
          />
          <div className="ml-4">
            <p className="mb-0 font-semibold text-white cursor-pointer" onClick={openModal} >{user.username}</p>
            <p className="mb-1 text-sm text-gray-300 cursor-pointer" onClick={openModal} >{user.role}</p>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="relative bg-white p-20 rounded-2xl shadow-lg flex space-x-10">
              {/* Profile Photo */}
              <div className="relative">
                <img
                  className="w-96 h-96 rounded-full object-cover"
                  src="https://cdn.bestmovie.it/wp-content/uploads/2024/03/sydney-sweeney.jpg"
                  alt="Enlarged avatar"
                />

              </div>

              {/* Profile Details */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Username: </span>{user.username}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Email: </span>{user.email}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-bold">Role: </span>{user.role}
                </p>
               
                <div className="mt-6">
                  <button
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    onClick={closeModal} 
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="px-5 mb-5 mt-0">
          <button
            onClick={handleLogout}
            className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-10">
          <h3 className="mx-6 mb-3 text-xs text-gray-300 uppercase tracking-widest">Customer</h3>
          <Link
            to="/customer"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <AiFillDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/customer/shop"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer/shop')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaYandex className="h-5 w-5 mr-3" />
            Shop
          </Link>

          <Link
            to="/customer/orders"
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              isActive('/customer/orders')
                ? 'bg-gradient-to-tr from-teal-900  to-slate-700 text-white'
                : 'text-gray-200 hover:bg-orange-100 hover:text-black'
            }`}
            style={{ textDecoration: 'none' }}
          >
            <FaTruck className="h-5 w-5 mr-3" />
            Orders
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
          <form action="" className="w-full max-w-md">
            {/* Search form can go here */}
          </form>
        </div>

        {/* Main Content Area */}
        <div className="p-6 pt-0">
          {/* Conditionally render dashboard content based on the current path */}
          {location.pathname === '/customer' && (
            <section className="p-3 sm:p-10 space-y-3">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
                  <h2 className="text-xl text-gray-600 ml-0.5">Overview</h2>
                </div>
              </div>
              {/* Dashboard Content*/}
              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.353-1.855M7 20a3 3 0 00-3 3v1h12v-1a3 3 0 00-3-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-gray-500">120</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Pending Orders</h3>
                    <p className="text-gray-500">12</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 12l2.25 2.25L15 12m0 0l-2.25-2.25L9.75 12m5.25 0h-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Completed Orders</h3>
                    <p className="text-gray-500">108</p>
                  </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-2xl">
                  <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Canceled Orders</h3>
                    <p className="text-gray-500">8</p>
                  </div>
                </div>
              </section>
              <section className="grid xl:grid-cols-1 gap-6">
                <div className="flex flex-col p-10 bg-white shadow rounded-2xl">
                  <div>
                    <h3 className="text-md font-semibold">Shop Items</h3>
                    <p className="text-gray-500">Click to Order</p>
                  </div>
                  {/* Wrapper for the Shop items */}
                  <div className="flex overflow-x-auto space-x-2 p-0">
                    {/* Display only 2 items in the Shop component */}
                    {orders.slice(0, 4).map((order) => (
                      <Link
                        key={order.id}
                        to={`/customer/orders/${order.id}`}
                        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-90 hover:shadow-xl"
                      >
                      <div key={order.id} className="flex-shrink-0 w-64 p-4 rounded-lg">
                        <img src={order.imgSrc} alt={order.products} className="w-full h-32 object-cover mb-2" />
                        <span className="text-gray-400 mr-3 uppercase text-xs">Order #{order.id}</span>
                        <h4 className="text-lg font-semibold mb-1">{order.products}</h4>
                        <p className="text-gray-500">{order.date}</p>
                      </div>
                      </Link>
                    ))}
                  </div>

                  {/* See More Link positioned at the bottom of the section */}
                  <div className="mt-6 text-center w-full">
                    <Link to="/customer/shop" className="text-blue-600 font-semibold hover:underline">
                      See More
                    </Link>
                  </div>
                </div>
              </section>






            </section>
          )}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

