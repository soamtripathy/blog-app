import ReactQuill from "react-quill";
import { useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const Editor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  useEffect(() => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();
      // Perform additional operations on the quillInstance if needed
    }
  }, []);
  return (
    <div>
      {" "}
      <ReactQuill
      ref = {quillRef}
        value={value}
        onChange={onChange}
        modules={{ toolbar: toolbarOptions }}
        theme="snow"
      />
    </div>
  );
};

export default Editor;
