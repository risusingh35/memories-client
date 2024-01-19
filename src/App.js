import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [memories, setMemories] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5050/api/memories')
      .then(response => setMemories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('image', image);

    axios.post('http://localhost:5050/api/memories', formData)
      .then(response => setMemories([...memories, response.data]))
      .catch(error => console.error(error));

    // Clear form fields
    setName('');
    setDate('');
    setImage(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Create Memory Page</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image:</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
        </div>

        <button type="submit" className="btn btn-primary d-block mx-auto">Save Memory</button>
      </form>

      <div className="mt-4">
        <h2 className="text-center">Memory List</h2>
        <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-6 g-4">
          {memories.map(memory => (
            <div key={memory._id} className="col">
              <div className="card text-center">
                <img src={`http://localhost:5050/${memory.imagePath}`} alt="Memory" className="card-img-top mx-auto mt-3" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <p className="card-text">Name: {memory.name}</p>
                  <p className="card-text">Date: {new Date(memory.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
