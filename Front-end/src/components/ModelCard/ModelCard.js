import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./ModelCard.module.css";

const ModelCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setLikes(props.likes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeClickHandler = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const bookmarkClickHandler = () => {
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
