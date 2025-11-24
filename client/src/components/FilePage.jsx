import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../App.css";

function FilePage() {
  const username = useParams().username;
  const fileName = useParams().filename;
  const [file, setFile] = useState("");
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/users/${location.pathname}`
      );
      try {
        setFile(await response.text());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username, fileName, location]);

  try {
    if (JSON.parse(file)) {
      setFile(JSON.parse(file));
      file.map((myFile, index) => {
        return <MyLink file={myFile} index={index} key={index} />;
      });
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <div className="containerFile">
        <p>{file.files}</p>
        <button
          className="add-btn"
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
