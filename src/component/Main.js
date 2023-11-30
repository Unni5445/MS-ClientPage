import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ columnName: '', columnValue: '' });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:3001/getData');
            setData(result.data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddData = async () => {
        try {
        await axios.post('http://localhost:3001/addData', formData);
        // Refresh data after adding
        const result = await axios.get('http://localhost:3001/getData');
        setData(result.data);
        } catch (error) {
        console.error(error);
        }
    };

  return (
    <main>
        <h1>Data from MS Access</h1>
        <h2>Add Data</h2>
        <form>
          <label>
            Employee Value:
            <input type="text" name="columnValue" onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleAddData}>
            Add Data
          </button>
        </form>
        <hr/>
        <table border='2px'> 
          <tr> 
            <th> EMP ID</th>
            <th> EMP Name</th>
          </tr>
          <tr> 
            <td> 
              {data.map(item=>(
                <p>
                  {item.id}
                </p>
              ))}
            </td>
            <td> 
              {data.map(item=>(
                <p>
                  {item.columnName}
                </p>
              ))}
            </td>
          </tr>
        </table>
      </main>
  )
}

export default Main