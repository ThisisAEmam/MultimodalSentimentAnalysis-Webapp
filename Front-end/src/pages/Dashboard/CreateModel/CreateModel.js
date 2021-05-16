import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import classes from "./CreateModel.module.css";
import { useSpring, animated, config } from "react-spring";
import { Link, useHistory } from "react-router-dom";
import Notification from "../../../components/Dashboard/Notification/Notification";

const CreateModel = (props) => {
  const [modelArchs, setModelArchs] = useState([]);
  const [selectedArch, setSelectedArch] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedImage, setSelectedImage] = useState(false);
  const [refreshCats, setRefreshCats] = useState(true);
  const [modelCats, setModelCats] = useState([]);
  const [paperLinkHref, setPaperLinkHref] = useState("");
  const [addACategory, setAddACategory] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDriveLink, setEmptyDriveLink] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const { loggedin } = useSelector((state) => state);

  const newCategoryRef = useRef();
  const imagePreviewRef = useRef();
  const history = useHistory();

  const axiosConfig = {
    headers: {
      Authorization: loggedin.token,
    },
  };

  useEffect(() => {
    axios
      .get("/models/arch", axiosConfig)
      .then((res) => {
        if (res.data.success) {
          setModelArchs(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refreshCats) {
      axios
        .get("/models/category", axiosConfig)
        .then((res) => {
          if (res.data.success) {
            setModelCats(res.data.data);
            setRefreshCats(false);
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCats]);

  useEffect(() => {
    if (modelArchs.length > 0) {
      setSelectedArch(modelArchs[0].id);
      setPaperLinkHref(modelArchs[0].paper);
    }

    if (modelCats.length > 0) {
      setSelectedCategory(modelCats[0].id);
    }
  }, [modelArchs, modelCats]);

  const addCategorySpring = useSpring({
    from: {
      opacity: 0,
      display: "none",
    },
    to: {
      opacity: addACategory ? 1 : 0,
      display: addACategory ? "grid" : "none",
    },
    config: config.default,
  });

  const archSelectHandler = (e) => {
    const selected = modelArchs.find((item) => item.alias === e.target.value);
    setSelectedArch(selected.id);
    setPaperLinkHref(selected.paper);
  };

  const categorySelectHandler = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  const addCategoryHandler = () => {
    const text = newCategoryRef.current.value.trim();
    const modelCategories = [];
    modelCats.map((item) => modelCategories.push(item.category.toLowerCase()));
    if (!modelCategories.includes(text.toLowerCase())) {
      axios
        .post("/models/category", { category: text }, config)
        .then((res) => {
          if (res.data.success) {
            setRefreshCats(true);
            newCategoryRef.current.value = "";
            setAddACategory(false);
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (name !== "" && emptyName) {
      setEmptyName(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (driveLink !== "" && emptyDriveLink) {
      setEmptyDriveLink(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveLink]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 4000);
    }
  }, [notification]);

  const uploadImageHandler = (e) => {
    setSelectedImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreviewRef.current.setAttribute("src", event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitClickHandler = () => {
    if (name === "" || driveLink === "") {
      if (name === "") setEmptyName(true);
      if (driveLink === "") setEmptyDriveLink(true);
      setNotification(true);
      setNotificationMsg("Please fill the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    const imageConfig = {
      headers: {
        Authorization: loggedin.token,
        "Content-Type": "multipart/form-data",
      },
    };
    const data = {
      name: name,
      driveLink: driveLink,
      catId: selectedCategory,
      archId: selectedArch,
    };
    if (description !== "") {
      data.description = description;
    }

    axios
      .post("/models/create", data, axiosConfig)
      .then((res) => {
        if (res.data.success) {
          if (selectedImage) {
            axios
              .post(`/models/image/${res.data.id}`, formData, imageConfig)
              .then((res) => {
                if (res.data.success) {
                  setNotificationMsg(`Model created successfully! You will be redirected to My Models page after 3 seconds.`);
                  setNotification(true);
                  setTimeout(() => {
                    history.push("/dashboard/my_models");
                  }, 3500);
                } else {
                  setNotificationMsg(res.data.msg);
                  setNotification(true);
                }
              })
              .catch((err) => console.log(err));
          } else {
            setNotificationMsg(`Model created successfully! You will be redirected to My Models page after 3 seconds.`);
            setNotification(true);
            setTimeout(() => {
              history.push("/dashboard/my_models");
            }, 3000);
          }
        } else {
          setNotificationMsg(res.data.msg);
          setNotification(true);
          console.log(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.CreateModel}>
      <PageTitle>Create a model</PageTitle>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.formGroup}>
            <label htmlFor="name">
              Model Name<span className={classes.starIcon}>*</span>
            </label>
            <input type="text" className={emptyName ? classes.empty : null} name="name" placeholder="Name" onChange={(e) => setName(e.target.value.trim())} />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Model Description</label>
            <textarea type="text" name="description" rows={6} placeholder="Description" onChange={(e) => setDescription(e.target.value.trim())} />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="archeticture">
              Model Archeticture<span className={classes.starIcon}>*</span>
            </label>
            <select className={classes.modelSelect} onChange={archSelectHandler}>
              {modelArchs.map((arch, index) => (
                <option key={index} value={arch.alias}>
                  {arch.alias} - {arch.name}
                </option>
              ))}
            </select>
            <a href={paperLinkHref} target="blank" className={classes.paperLink}>
              Need to know more about this archeticture? click here to view the paper.
            </a>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="category">
              Model Category<span className={classes.starIcon}>*</span>
            </label>
            <select className={classes.modelSelect} onChange={categorySelectHandler}>
              {modelCats.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            <div className={classes.addCategorytextContainer}>
              <p className={classes.addCategorytext} onClick={() => setAddACategory(!addACategory)}>
                {!addACategory ? "+ Add a new category" : "Cancel"}
              </p>
            </div>
            <animated.div style={addCategorySpring} className={classes.addCategoryDiv}>
              <input ref={newCategoryRef} type="text" placeholder="New Category" />
              <button className={classes.addCategoryBtn} onClick={addCategoryHandler}>
                Add
              </button>
            </animated.div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="dataset">
              <i className="fab fa-google-drive"></i> Dataset Link (Google Drive)<span className={classes.starIcon}>*</span>
            </label>
            <input
              type="text"
              className={emptyDriveLink ? classes.empty : null}
              name="dataset"
              placeholder="Dataset link"
              onChange={(e) => setDriveLink(e.target.value.trim())}
            />
            <Link to="/dashboard/getting_started" className={classes.paperLink}>
              Don't know how to upload the dataset? click here to learn how to prepare and upload it.
            </Link>
          </div>
        </div>
        <div className={classes.rightSide}>
          <div className={[classes.formGroup, classes.imageUploader].join(" ")}>
            <label htmlFor="image">Model Image</label>
            <div className={classes.imageUploaderInput}>
              <p>
                <i className="fas fa-cloud-upload-alt"></i> Upload image
              </p>
              <input type="file" name="image" accept="image/*" multiple={false} placeholder="Name" onChange={uploadImageHandler} />
            </div>
            <div className={classes.imagePreview}>
              {selectedImage ? <p>Selected image:</p> : <p className={classes.noSelectedImage}>No selected Image</p>}
              {selectedImage ? (
                <div>
                  <img ref={imagePreviewRef} src="" alt="" />
                  <p className={classes.removeSelectedImage} onClick={() => setSelectedImage(false)}>
                    <i className="fa fa-trash-alt"></i> remove
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.submitBtnContainer}>
        <button className={classes.submitBtn} onClick={submitClickHandler}>
          Create model
        </button>
      </div>
      {notification ? <Notification>{notificationMsg}</Notification> : null}
    </div>
  );
};

export default CreateModel;
