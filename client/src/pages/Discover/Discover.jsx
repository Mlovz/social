import { Heading, ThumbCard } from "components";
import Spinner from "components/Spinner/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoverPosts } from "redux/actions/discoverAction";
import "./discover.scss";

const Discover = () => {
  const dispatch = useDispatch();
  const { auth, discover } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token && !discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [auth.token, dispatch, discover.firstLoad]);

  return (
    <div className="discover">
      {discover.loading ? (
        <Spinner />
      ) : (
        <div className="discover_box">
          {discover.posts?.map((post) => (
            <ThumbCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {discover.result === 0 && <Heading type="center">No Posts</Heading>}
    </div>
  );
};

export default Discover;
