import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trainImage from '../../data/TrainTable.jpg'; 

toast.configure();

const AssignOrdersToTrains = () => {
  const [orders, setOrders] = useState([
    { id: 'order-1', name: 'Order 1', destination: 'Location A', arrivalTime: '10:00 AM' },
    { id: 'order-2', name: 'Order 2', destination: 'Location B', arrivalTime: '11:00 AM' },
    { id: 'order-3', name: 'Order 3', destination: 'Location C', arrivalTime: '12:00 PM' },
  ]);

  const [trains, setTrains] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState({});
  const [currentTrain, setCurrentTrain] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTrain, setNewTrain] = useState({ id: '', branch: '', date: '' });
  const [activeTab, setActiveTab] = useState('create');

  const trainOptions = [
    { id: 'T001' },
    { id: 'T002' },
    { id: 'T003' },
    { id: 'T004' },
    { id: 'T005' },
    { id: 'T006' }
  ];

  const trainTable = [
    { train_id: 'T001', start: '06:00:00', end: '10:00:00', capacity: 500, end_station: 'Galle' },
    { train_id: 'T002', start: '12:00:00', end: '16:00:00', capacity: 400, end_station: 'Galle' },
    { train_id: 'T003', start: '05:00:00', end: '11:00:00', capacity: 300, end_station: 'Hambanthota' },
    { train_id: 'T004', start: '13:00:00', end: '19:00:00', capacity: 350, end_station: 'Jaffna' },
    { train_id: 'T005', start: '07:00:00', end: '13:00:00', capacity: 450, end_station: 'Colombo' },
    { train_id: 'T006', start: '14:00:00', end: '20:00:00', capacity: 550, end_station: 'Colombo' },
  ];

  const handleCreateTrain = async () => {
    if (!newTrain.id || !newTrain.date) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/trainTrips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          train_id: newTrain.id,
          date: newTrain.date
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create train trip');
      }

      const data = await response.json();
      const trainId = `train-${trains.length + 1}`;
      setTrains([
        ...trains,
        {
          id: trainId,
          name: newTrain.id,
          date: newTrain.date,
          assignedOrders: [],
        },
      ]);

      setNewTrain({ id: '', branch: '', date: '' });
      toast.success('Train trip created successfully!');

    } catch (error) {
      console.error('Error creating train trip:', error);
      toast.error(error.message || 'Failed to create train trip');
    }
  };

  const handleAssignOrder = (trainId, orderId) => {
    if (!trainId) {
      toast.info('Please select a train to assign orders');
      return;
    }
  
    const trainIndex = trains.findIndex((train) => train.id === trainId);
    if (trainIndex === -1) return;
  
    const trainOrders = assignedOrders[trainId] || [];
    if (trainOrders.includes(orderId)) {
      toast.info(`Order ${orderId} has already been assigned to this train`);
      return;
    }
  
    const updatedTrainOrders = [...trainOrders, orderId];
    setAssignedOrders({ ...assignedOrders, [trainId]: updatedTrainOrders });
  
    const updatedTrains = [...trains];
    updatedTrains[trainIndex].assignedOrders = updatedTrainOrders;
    setTrains(updatedTrains);
  
    toast.success(`Order ${orderId} successfully assigned to train ${trainId}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="m-2 md:m-10 mt-24 p-6 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Train Trips Management</h2>

      {/* Tab Navigation */}
      <div className="flex mb-4 justify-center">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'create'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('create')}
        >
          Create Train Trip
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'assign'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('assign')}
        >
          Order Assignment
        </button>
      </div>

{/* Tab Content */}
{activeTab === 'create' && (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-bold mb-4 text-center">Create a New Train Trip</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Train Dropdown */}
      <div className="col-span-1">
        <label className="block mb-2 text-gray-600">Train ID</label>
        <select
          value={newTrain.id}
          onChange={(e) => setNewTrain({ ...newTrain, id: e.target.value })}
          className="w-full p-2 border rounded bg-white"
        >
          <option value="" disabled>
            Select Train
          </option>
          {trainOptions.map((train) => (
            <option
              key={train.id}
              value={train.id}
              className="p-4 h-auto text-left bg-white hover:bg-gray-200"
            >
              {train.id}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="col-span-1">
        <label className="block mb-2 text-gray-600">Date</label>
        <input
          type="date"
          value={newTrain.date}
          min={minDate} // Set minimum selectable date to tomorrow
          onChange={(e) => setNewTrain({ ...newTrain, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>

      {/* Train Image */}
      {/* <div className="flex justify-center mt-4">
        <img
          src={trainImage}
          alt="Selected Train"
          className="w-74 h-40 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={toggleModal}
        />
      </div> */}

<div className="flex justify-center my-10">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Train ID</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Start</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">End</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">Capacity</th>
            <th className="py-3 px-6 border-b border-gray-200 text-center">End Station</th>
          </tr>
        </thead>
        <tbody>
          {trainTable.map((train, index) => (
            <tr
              key={train.train_id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-blue-50 transition-colors duration-200`}
            >
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.train_id}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.start}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.end}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.capacity}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700">
                {train.end_station}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>

            {/* Modal Image */}
            <img
              src={trainImage}
              alt="Train Enlarged"
              className="w-[500px] h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

    {/* Create Button */}
    <div className="flex justify-end mt-6">
      <button
        onClick={handleCreateTrain}
        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded shadow hover:from-green-500 hover:to-green-700"
      >
        Create Train Trip
      </button>
    </div>
  </div>
)}


{activeTab === 'assign' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-blue-800">Assign Orders to Train Trips</h3>
          <p className="text-gray-600 mb-4">
            Select a train trip to assign orders.
          </p>

          <div className="mb-4">
          <select
            value={currentTrain || ""}
            onChange={(e) => setCurrentTrain(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="" disabled>
              Select a train trip
            </option>
            {trains.map((train) => (
              <option key={train.id} value={train.id}>
                {train.name} - {train.date}
              </option>
            ))}
          </select>
          </div>

          <div className="my-4">
            <h4 className="text-xl font-bold mb-2 text-gray-800">Available Orders</h4>
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="flex justify-between items-center mb-2">
                  <span>{order.name} - Destination: {order.destination}</span>
                  <button
                    onClick={() => handleAssignOrder(currentTrain, order.id)}
                    disabled={assignedOrders[currentTrain]?.includes(order.id)}
                    className={`px-4 py-2 rounded ${
                      assignedOrders[currentTrain]?.includes(order.id)
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Assign
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignOrdersToTrains;





























