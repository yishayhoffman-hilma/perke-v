import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import "../App.css";
import MyLink from "./MyLink";

function UserDirectory() {
  const username = useParams().username;
  const [files, setFiles] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [fileContent, setFileContent] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/users/${username}`);
      try {
        const jsonData = await response.json();
        setFiles(jsonData);
        // console.log(files);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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

  async function addNewFile() {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      method: "POST",
      body: JSON.stringify({ fileName: fileTitle, content: fileContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await response.text();
    console.log(jsondata);
    try {
      setFiles((prevFile) => {
        return [...prevFile, fileTitle];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function CopyFile(fileName) {
    const newName = `${fileName}.copy`;

    const getResponse = await fetch(
      `http://localhost:3000/users/${username}/${fileName}`
    );
    const data = await getResponse.text();

    const response = await fetch(`http://localhost:3000/users/${username}`, {
      method: "POST",
      body: JSON.stringify({ fileName: newName, content: data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await response.text();
    console.log(jsondata);
    try {
      setFiles((prevFile) => {
        return [...prevFile, newName];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <div className="container">
        <div className="input-section">
          <label htmlFor="title"></label>
          <input
            name="title"
            id="title"
            type="text"
            value={fileTitle}
            onChange={(e) => {
              setFileTitle(e.target.value);
            }}
          />

          <label htmlFor="content"></label>
          <textarea
            id="content"
            name="content"
            value={fileContent}
            onChange={(e) => {
              setFileContent(e.target.value);
            }}
          />

          <button className="add-btn" onClick={addNewFile}>
            add new file
          </button>
        </div>

        <ul className="file-list">
          {files.map((file, index) => (
<<<<<<< HEAD
            <li key={index} className="file-item">
              <Link to={file} className="file-name">
                {file}
              </Link>

              <div className="action-buttons">
                <button onClick={() => deleteFile(file)}>delete</button>
                <button onClick={() => CopyFile(file)}>copy</button>
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
              </div>
            </li>
=======
            <MyLink
              key={index}
              file={file}
              index={index}
              deleteFile={deleteFile}
              renameFile={renameFile}
            />
>>>>>>> 589392774f160f7b6da892d7c5ec5b0fb2b4172e
          ))}
        </ul>
      </div>
    </>
  );
}
export default UserDirectory;
