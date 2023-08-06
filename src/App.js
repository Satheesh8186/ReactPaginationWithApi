import { useEffect, useState } from "react";
import ApiHook from "./ApiHook";

import "./styles.css";
const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" }
];
export default function App() {
  const [offSet, setOffSet] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPage] = useState(0);
  const { data = [], loading, error } = ApiHook(
    "https://jsonplaceholder.typicode.com/posts"
  );

  useEffect(() => {
    setOffSet(0);
    setTotalPage(Math.ceil((data.length || 0) / limit));
  }, [data, limit]);

  const onButtonClick = (event) => {
    if (event === "next") {
      setOffSet((prevOffset) => {
        return Math.min(prevOffset + limit, (totalPages - 1) * limit);
      });
    } else {
      setOffSet((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };
  console.log(offSet);
  const pagedData = data.slice(offSet, offSet + limit);
  const handleChange = (event) => {
    console.log("Data type of event.target.value:", typeof event.target.value);
    setLimit(parseInt(event.target.value));
  };
  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>title</th>
                <th>body</th>
              </tr>
            </thead>

            <tbody>
              {pagedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td> {item.title}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => onButtonClick("prev")} disabled={offSet === 0}>
            prev
          </button>
          <button
            onClick={() => onButtonClick("next")}
            disabled={offSet >= (totalPages - 1) * limit}
          >
            next
          </button>
          <select options={options} value={limit} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
