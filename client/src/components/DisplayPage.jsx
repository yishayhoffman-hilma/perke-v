import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import FilePage from "./FilePage";
import UserDirectory from "./UserDirectory";

export default function DisplayPage() {
  const username = useParams().username;
  const fileName = useParams().filename;
  const location = useLocation();
  const [file, setFile] = useState("");
  const flag = Array.isArray(file) ? "dir" : "file";
  //   console.log(location.pathname);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/users${location.pathname}`
      );
      try {
        setFile(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username, fileName, location]);

  if (flag === "") console.log("file has not been selected");

  return flag === "dir" ? (
    <UserDirectory file={file} setFile={setFile} />
  ) : flag === "file" ? (
    <FilePage file={file} />
  ) : (
    <div>big nono</div>
  );
}
