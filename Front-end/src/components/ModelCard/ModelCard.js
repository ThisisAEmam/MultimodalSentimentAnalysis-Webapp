import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./ModelCard.module.css";
import { setBookmarkedModels } from "../../features/bookmarkedModelsSlice";
import { setLikedModels } from "../../features/likedModelsSlice";

const ModelCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { likedModels, bookmarkedModels } = useSelector((state) => state);
  const likeDispatch = useDispatch(setLikedModels);
  const bookmarkDispatch = useDispatch(setBookmarkedModels);

  useEffect(() => {
    setLikes(props.likes);
    const ifLiked = likedModels.findIndex((el) => el.id === props.id);
    if (ifLiked !== -1) {
      setLiked(true);
    }
    const ifBookmarked = bookmarkedModels.findIndex((el) => el.id === props.id);
    if (ifBookmarked !== -1) {
      setBookmarked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.likes, likedModels, bookmarkedModels]);

  const likeClickHandler = () => {
    if (!liked) {
      likeDispatch(setLikedModels([...likedModels, props.model]));
    } else {
      const thisModelIndex = likedModels.findIndex((el) => el.id === props.id);
      const temp = [...likedModels];
      temp.splice(thisModelIndex, 1);
      likeDispatch(setLikedModels([...temp]));
    }

    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const bookmarkClickHandler = () => {
    if (!bookmarked) {
      bookmarkDispatch(setBookmarkedModels([...bookmarkedModels, props.model]));
    } else {
      const thisModelIndex = bookmarkedModels.findIndex((el) => el.id === props.id);
      const temp = [...bookmarkedModels];
      temp.splice(thisModelIndex, 1);
      bookmarkDispatch(setBookmarkedModels([...temp]));
    }

    setBookmarked(!bookmarked);
  };

  return (
    <div className={classes.ModelCard}>
      <img src={`/${props.index}.jpg`} alt="brain" />
      <div className={classes.container}>
        <div className={classes.names}>
          <h3 className={classes.name}>{props.name}</h3>
          <p className={classes.user}>
            Created by{" "}
            <span>
              <Link to={`/dashboard/models/users/${props.user}`}>{props.user}</Link>
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
