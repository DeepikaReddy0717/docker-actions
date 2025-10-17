import React from "react";

export default function DestinationForm({ destination, setDestination, addDestination, updateDestination, editMode, resetForm }) {
  const handleChange = (e) => {
    setDestination({ ...destination, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-block">
      <h3>{editMode ? "Edit Destination" : "Add Destination"}</h3>
      <div className="form-grid">
        <input type="text" name="name" placeholder="Name" value={destination.name} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={destination.location} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={destination.description} onChange={handleChange} />
        <select name="category" value={destination.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
          <option value="Historical">Historical</option>
        </select>
        <select name="priority" value={destination.priority} onChange={handleChange}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="btn-group">
        {!editMode ? (
          <button className="btn-blue" onClick={addDestination}>Add Destination</button>
        ) : (
          <>
            <button className="btn-green" onClick={updateDestination}>Update Destination</button>
            <button className="btn-gray" onClick={resetForm}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
