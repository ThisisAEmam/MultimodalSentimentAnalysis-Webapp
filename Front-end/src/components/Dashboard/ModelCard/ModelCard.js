import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ModelCard.module.css";
import { setBookmarkedModels } from "../../../features/bookmarkedModelsSlice";
import { setLikedModels } from "../../../features/likedModelsSlice";
import { setRefreshPage } from "../../../features/refreshPageSlice";
import axios from "axios";

const ModelCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { likedModels, bookmarkedModels, loggedin } = useSelector((state) => state);
  const likeDispatch = useDispatch();
  const bookmarkDispatch = useDispatch();
  const refreshDispatch = useDispatch();

  const config = {
    headers: {
      authorization: loggedin.token,
    },
  };

  useEffect(() => {
    axios
      .get(`/models/likes/${props.id}`, config)
      .then((res) => {
        if (res.data.success) {
          setLikes(res.data.data);
        } else {
          console.log("Unsuccessful");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);

  useEffect(() => {
    axios
      .get("/models/bookmarksId", config)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.includes(props.id)) {
            setBookmarked(true);
          } else {
            setBookmarked(false);
          }
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarked, bookmarkedModels]);

  useEffect(() => {
    axios
      .get("/models/likesId", config)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.includes(props.id)) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked, likedModels]);

  const likeClickHandler = () => {
    if (!liked) {
      axios
        .post("/models/like", { modelId: props.id }, config)
        .then((res) => {
          if (res.data.success) {
            setLiked(true);
            likeDispatch(setLikedModels(likedModels + 1));
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/models/unlike", { modelId: props.id }, config)
        .then((res) => {
          if (res.data.success) {
            setLiked(false);
            likeDispatch(setLikedModels(likedModels - 1));
            refreshDispatch(setRefreshPage(true));
            refreshDispatch(setRefreshPage(false));
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const bookmarkClickHandler = () => {
    if (!bookmarked) {
      axios
        .post("/models/bookmark", { modelId: props.id }, config)
        .then((res) => {
          if (res.data.success) {
            bookmarkDispatch(setBookmarkedModels(bookmarkedModels + 1));
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("/models/unbookmark", { modelId: props.id }, config)
        .then((res) => {
          if (res.data.success) {
            bookmarkDispatch(setBookmarkedModels(bookmarkedModels - 1));
            refreshDispatch(setRefreshPage(true));
            refreshDispatch(setRefreshPage(false));
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={classes.ModelCard}>
      <img src={props.hasImage ? props.model.image : `/${props.index}.jpg`} alt="model_image" />
      <div className={classes.container}>
        <div className={classes.names}>
          <h3 className={classes.name}>{props.name}</h3>
          <p className={classes.user}>
            Created by{" "}
            <span>
              <Link to={`/dashboard/users/${props.user}`}>{props.user}</Link>
            </span>
          </p>
        </div>
        <div className={classes.icons}>
          <div className={classes.likes}>
            <i className={[`fa${liked ? "" : "r"} fa-heart`, liked ? classes.liked : null].join(" ")} onClick={likeClickHandler}></i>
            <div className={classes.likesCount}>
              <div className={classes.triangle}></div>
              <span className={classes.count}>{likes}</span> people liked this model!
            </div>
          </div>
          <i className={[`fa${bookmarked ? "" : "r"} fa-bookmark`, bookmarked ? classes.bookmarked : null].join(" ")} onClick={bookmarkClickHandler}></i>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
