import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    setImages(filesArray);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('description', description);

    for (const image of images) {
      formData.append('images', image);
    }

    try {
      const response = await fetch('https://desertbags.onrender.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Form submitted successfully');
        // Optionally reset the form after successful submission
        setName('');
        setMobile('');
        setDescription('');
        setImages([]);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error!', error.message);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="file" name="image" onChange={handleFileChange} multiple/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;