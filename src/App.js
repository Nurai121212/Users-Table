import axios from "axios";
import { useEffect, useState } from "react";
import './App.sass';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState("phone");

  const columns = ["name", "email", ["phone", "website", "username"]];

  const handleChange = (e) => {
    setSelect(e.target.value)
  };

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setItems(res.data)
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        setLoading(false)
      })
  }, []);

  return (
    <div className="app-container">
      {loading ? <h1>Загрузка...</h1> : items.length ? 
        <table className="users-table">
          <thead>
            <tr>{columns.map((item, i) => {
                return(
                  <th key={i}>
                    {!Array.isArray(item) ? item : 
                      <select value={select} onChange={handleChange}>
                        {item.map((item, i) => {
                          return(
                            <option value={item} key={i}>{item}</option>
                          )
                        })}
                      </select>}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return(
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item[select]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>  :  <h1>Данные не загрузились.</h1>}
    </div>
  );
}

export default App;