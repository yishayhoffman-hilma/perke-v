import { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import MyLink from "./MyLink";
// import "./App.css";

function UserDirectory() {
  const username = useParams().username;
  const [files, setFiles] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [fileContent, setFileContent] = useState("");
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

  return (
    <>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <button onClick={addNewFile}>add new file</button>
        </div>
        <ul>
          {files.map((file, index) => (
            <MyLink
              key={index}
              file={file}
              index={index}
              deleteFile={deleteFile}
              renameFile={renameFile}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default UserDirectory;
