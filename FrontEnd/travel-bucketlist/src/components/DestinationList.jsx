import React from "react";

export default function DestinationList({ destinations, handleEdit, deleteDestination }) {
  if (!destinations || destinations.length === 0) {
    return <p>No destinations found. Add one above.</p>;
  }

  // Filter out 'id' from headers
  const headers = Object.keys(destinations[0]).filter(key => key !== "id");

  return (
    <div className="table-section">
      <h3>All Destinations</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th> {/* Row number */}
              {headers.map((h) => <th key={h}>{h}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest, index) => (
              <tr key={dest.id}>
                <td>{index + 1}</td> {/* Display consecutive row number */}
                {headers.map((key) => <td key={key + dest.id}>{String(dest[key] ?? "")}</td>)}
                <td>
                  <div className="action-buttons">
                    <button className="btn-green" onClick={() => handleEdit(dest)}>Edit</button>
                    <button className="btn-red" onClick={() => deleteDestination(dest.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
