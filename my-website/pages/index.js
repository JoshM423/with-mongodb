import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Import CSS module

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name.match(/^[A-Za-z\s.-]+$/) || parseInt(age) <= 0 || parseInt(age) > 150) {
      alert('Please provide a valid name (only alphabets, spaces, periods, hyphens) and age (1-150)');
      return;
    }

    try {
      const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });
      if (response.ok) {
        alert('Data submitted successfully!');
        setName('');
        setAge('');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              // Limit text length to 50 characters
              if (e.target.value.length <= 50 && /^[A-Za-z\s.-]*$/.test(e.target.value)) {
                setName(e.target.value);
              }
            }}
            required // This makes the input field required
            style={{ margin: '5px', padding: '10px', borderRadius: '5px', fontSize: '16px' }}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required // This makes the input field required
            min="1" // Minimum value allowed (1)
            max="150" // Maximum value allowed (150)
            style={{ margin: '5px', padding: '10px', borderRadius: '5px', fontSize: '16px' }}
          />
        </label>
        <button type="submit" style={{ margin: '5px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}
