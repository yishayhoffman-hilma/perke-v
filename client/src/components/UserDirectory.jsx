import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import "./App.css";

function UserDirectory() {
  const username = useParams().username;
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/users/${username}`);
      try {
        setFiles(await response.json());
        console.log(files);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   padding: "6px 10px",
          //   borderBottom: "1px solid #ddd",
          // }}
          >
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>
              {file}
            </span>
            {/* <Link
              to={`${file.id}`}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {file}
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserDirectory;
