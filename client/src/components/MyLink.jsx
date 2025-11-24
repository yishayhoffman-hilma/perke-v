import { Link } from "react-router-dom";

export default function MyLink(props) {
  return (
    <li key={props.index} style={{ textAlign: "left" }}>
      <Link to={props.file}>{props.file}</Link>
      <button
        onClick={() => {
          props.deleteFile(props.file);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          const newFileName = prompt("enter the new name for your file");
          props.renameFile(props.file, newFileName);
        }}
      >
        rename
      </button>
    </li>
  );
}
