import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
// import "./App.css";

function UserDirectory() {
  const username = useParams().username;
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/users/${username}`);
      try {
        setFiles(await response.json());
        // console.log(files);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  async function deleteFile(file) {
    const response = await fetch(
      `http://localhost:3000/users/${username}/${file}`,
      { method: "DELETE" }
    );
    try {
      const jsondata = await response.text();
      console.log(jsondata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <Link to={file}>{file}</Link>
              <button
                onClick={() => {
                  deleteFile(file);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default UserDirectory;
