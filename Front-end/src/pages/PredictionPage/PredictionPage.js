import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import classes from "./PredictionPage.module.css";
import axios from "axios";
import Loader from "../../hoc/Loader/Loader";
import { useSelector } from "react-redux";

const PredictionPage = (props) => {
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const inputRef = useRef();
  const videoRef = useRef();

  const { screen } = useSelector((state) => state);

  useEffect(() => {
    axios
      .get(`/models/${id}`)
      .then((res) => {
        if (res.data.success) {
          setModel(res.data.data);
          setShowLoader(false);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [selectedVideo]);

  const videoSelectHandler = (e) => {
    setSelectedVideo(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      videoRef.current.setAttribute("src", event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const predictClickHandler = () => {
    const modelArch = model.arch;
    const videoFormData = new FormData();
    videoFormData.append("video", selectedVideo);
    videoFormData.append("arch", modelArch);
    axios
      .post(`/models/predict/${model.id}`, videoFormData)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.msg);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.PredictionPage}>
      <Navbar />
      {showLoader ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <h1 className={classes.header}>Predict the sentiment using {model.name} model</h1>
          <div className={classes.dash}></div>
          <div className={[classes.body, selectedVideo ? classes.clearPadding : null].join(" ")}>
            {showVideo ? (
              <div className={classes.videoContainer}>
                <video ref={videoRef} src="" controls></video>
              </div>
            ) : null}
            <div className={classes.videoUploaderInput}>
              <p>
                {screen !== "Mobile" ? <i className="fas fa-cloud-upload-alt"></i> : null} {!selectedVideo ? "Upload video" : "Upload another video"}
              </p>
              <input className={selectedVideo ? classes.marginInput : null} ref={inputRef} accept="video/mp4" type="file" onChange={videoSelectHandler} />
            </div>
            {showVideo ? (
              <div className={classes.predictBtnContainer}>
                <button className={classes.predictBtn} onClick={predictClickHandler}>
                  Predict
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
