import { FollowBtn, Heading } from "components";
import UserCard from "components/Cards/UserCard/UserCard";
import Spinner from "components/Spinner/Spinner";
import { useSelector } from "react-redux";
import "./right-sidebar.scss";

const RightSidebar = () => {
  const { auth, suggestion } = useSelector((state) => state);

  return (
    <div className="right-sidebar">
      <div className="right_card">
        <UserCard user={auth.user}>
          <span className="right_card_followers fs_14">
            {auth.user?.followers.length} followers
          </span>
        </UserCard>
      </div>

      <div className="right_card">
        {suggestion.loading ? (
          <Spinner />
        ) : (
          <>
            <Heading type="medium">Популярное</Heading>
            {suggestion.users?.map((user) => (
              <UserCard user={user} key={user._id}>
                <FollowBtn user={user} size="small" />
              </UserCard>
            ))}
            {suggestion.users?.length === 0 && (
              <Heading type="medium">Еще никого нет</Heading>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
