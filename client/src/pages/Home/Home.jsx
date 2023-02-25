import { Heading, PostCard } from "components";
import React from "react";
import { useSelector } from "react-redux";
import "./home.scss";
import RightSidebar from "./RightSidebar/RightSidebar";

const Home = () => {
  const { homePosts, auth } = useSelector((state) => state);

  return (
    <div className="home">
      {auth.isAuth && (
        <>
          <div className="home-posts">
            {homePosts.result === 0 ? (
              <Heading>Постов нет</Heading>
            ) : (
              homePosts.posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </div>
          <div className="home-users">
            <RightSidebar />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
