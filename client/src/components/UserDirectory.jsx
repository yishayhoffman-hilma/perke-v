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
      setFiles((prevFile) => {
        return [...prevFile].filter((value) => {
          return value !== file;
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function renameFile(file, newFileName) {
    console.log(newFileName);
    console.log(username);
    console.log({ method: "PUT", body: { fileName: newFileName } });

    const response = await fetch(
      `http://localhost:3000/users/${username}/${file}`,
      {
        method: "PUT",
        body: JSON.stringify({ fileName: newFileName }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsondata = await response.text();
    console.log(jsondata);
    try {
      setFiles((prevFile) => {
        return [...prevFile, newFileName].filter((value) => {
          return value !== file;
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div>
        <ul>
          {files.map((file, index) => (
            <li key={index} style={{ textAlign: "left" }}>
              <Link to={file}>{file}</Link>
              <button
                onClick={() => {
                  deleteFile(file);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  const newFileName = prompt(
                    "enter the new name for your file"
                  );
                  renameFile(file, newFileName);
                }}
              >
                rename
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default UserDirectory;
