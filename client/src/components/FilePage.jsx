import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
// import "./App.css";

function FilePage() {
  const username = useParams().username;
  const fileName = useParams().filename;
  const [file, setFile] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/users/${username}/${fileName}`
      );
      try {
        setFile(await response.text());
        console.log(file);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, fileName]);

  console.log("in file page");

  return (
    <>
      <div>
        <p>{file}</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </button>
      </div>
    </>
  );
}
export default FilePage;
