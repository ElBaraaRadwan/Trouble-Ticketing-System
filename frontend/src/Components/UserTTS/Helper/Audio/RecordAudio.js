import * as React from "react";
import AudioRecorder from "./AudioRecorder";

export default function RecordAudio(props) {
  let [recordObject, isRecording, startRecording, stopRecording] =
    AudioRecorder();
  const { getRecorder } = props;
  getRecorder(recordObject);

  return (
    <div className="d-flex flex-column">
      <audio src={recordObject.url} controls />
      <div className="my-2">
        <button
          className="audioRecordeButton"
          onClick={startRecording}
          disabled={isRecording}
        >
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button
          className="audioRecordeButton"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          <i className="fa-solid fa-stop"></i>
        </button>
      </div>
      <p>
        <em>(The record help you to describe your problem)</em>
      </p>
    </div>
  );
}
