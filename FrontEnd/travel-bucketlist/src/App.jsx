import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./components/config.js";
import DestinationForm from "./components/DestinationForm";
import DestinationList from "./components/DestinationList";

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    category: "",
    priority: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedDestination, setFetchedDestination] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/destinations`;

  useEffect(() => {
    fetchAllDestinations();
  }, []);

  const fetchAllDestinations = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setDestinations(res.data || []);
    } catch (err) {
      setMessage("Failed to fetch destinations.");
      console.error(err);
    }
  };

  const validateForm = () => {
    if (!destination.name || !destination.location) {
      setMessage("Please fill out Name and Location.");
      return false;
    }
    return true;
  };

  const addDestination = async () => {
    if (!validateForm()) return;
    try {
      const res = await axios.post(`${baseUrl}/add`, destination);
      if (res.data) {
        setDestinations(prev => [...prev, res.data]);
      } else {
        await fetchAllDestinations();
      }
      setMessage("Destination added successfully.");
      resetForm();
    } catch (err) {
      setMessage("Error adding destination.");
      console.error(err);
    }
  };

  const updateDestination = async () => {
    if (!validateForm()) return;
    try {
      const res = await axios.put(`${baseUrl}/update`, destination);
      if (res.data) {
        setDestinations(prev => prev.map(d => (d.id === res.data.id ? res.data : d)));
      } else {
        await fetchAllDestinations();
      }
      setMessage("Destination updated successfully.");
      resetForm();
    } catch (err) {
      setMessage("Error updating destination.");
      console.error(err);
    }
  };

  const deleteDestination = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setDestinations(prev => prev.filter(d => String(d.id) !== String(id)));
      setMessage("Destination deleted successfully.");
    } catch (err) {
      setMessage("Error deleting destination.");
      console.error(err);
    }
  };

  const getDestinationById = async () => {
    if (!idToFetch) {
      setMessage("Enter an ID to fetch.");
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedDestination(res.data);
      setMessage("");
    } catch (err) {
      setFetchedDestination(null);
      setMessage("Destination not found.");
      console.error(err);
    }
  };

  const handleEdit = (dest) => {
    setDestination(dest);
    setEditMode(true);
    setMessage("");
  };

  const resetForm = () => {
    setDestination({
      id: "",
      name: "",
      location: "",
      description: "",
      category: "",
      priority: ""
    });
    setEditMode(false);
  };

  return (
    <div className="travel-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes("error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <h2>Travel Bucket List Manager</h2>

      {/* ===== Left Panel ===== */}
      <div className="left-panel">
        <DestinationForm
          destination={destination}
          setDestination={setDestination}
          addDestination={addDestination}
          updateDestination={updateDestination}
          editMode={editMode}
          resetForm={resetForm}
        />

        <div className="fetch-by-id">
          <h3>Get Destination By ID</h3>
          <input
            type="text"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            placeholder="Enter ID"
          />
          <button className="btn-blue" onClick={getDestinationById}>Fetch</button>

          {fetchedDestination && (
            <div className="fetched">
              <h4>Result:</h4>
              <table>
                <tbody>
                  <tr><td>ID</td><td>{fetchedDestination.id}</td></tr>
                  <tr><td>Name</td><td>{fetchedDestination.name}</td></tr>
                  <tr><td>Location</td><td>{fetchedDestination.location}</td></tr>
                  <tr><td>Description</td><td>{fetchedDestination.description}</td></tr>
                  <tr><td>Category</td><td>{fetchedDestination.category}</td></tr>
                  <tr><td>Priority</td><td>{fetchedDestination.priority}</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className="right-panel">
        <DestinationList
          destinations={destinations}
          handleEdit={handleEdit}
          deleteDestination={deleteDestination}
        />
      </div>
    </div>
  );
}
