import { Icon } from "components";
import "./like.scss";

const LikeBtn = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <Icon
          type="FavoriteFill"
          className={`like ${isLike ? "liked" : ""}`}
          onClick={handleUnLike}
        />
      ) : (
        <Icon type="Favorite" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeBtn;
