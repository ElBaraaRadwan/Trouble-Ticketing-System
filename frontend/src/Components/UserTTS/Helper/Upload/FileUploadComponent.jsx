import React  from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

const FileUploadComponent = (props) => {
    const {func , funcStatus} = props;
  const fileParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const onFileChange = ({ meta, file }, status) => {
    funcStatus(status)
  };
  // const onSubmit = (files, allFiles) => {
  //   allFiles.forEach((f) => f.remove());
  // };
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => {
            func(f.fileObject)
            return f.fileObject;
        }));
      });
    });
  };
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? "Upload Again" : "Select Files";
    return (
      <label className="btn btn-outline-info mt-3">
        {textMsg} <i className="fa-solid fa-link"></i>
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };
  return (
    <Dropzone
      onChangeStatus={onFileChange}
      InputComponent={selectFileInput}
      getUploadParams={fileParams}
      getFilesFromEvent={getFilesFromEvent}
      accept="image/*"
      maxFiles={5}
      maxSizeBytes={6250000}
      inputContent="Drop A File"
      styles={{
        border: "none",
        overflow: "auto",
        backgroundColor : 'red'
      }}
      
    />
  );
};
export default FileUploadComponent;
