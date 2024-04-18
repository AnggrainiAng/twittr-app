import { Link, useNavigate } from "react-router-dom";
import homeImage from "../../assets/images/home-hashtag.svg";
import searchImage from "../../assets/images/search-normal.svg";
import notifImage from "../../assets/images/notification.svg";
import messageImage from "../../assets/images/sms.svg";
import noteImage from "../../assets/images/note-add.svg";
import crownLightImage from "../../assets/images/crown-light.svg";
import profileImage from "../../assets/images/profile-circle.svg";
import outImage from "../../assets/images/group.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const handleLogout = () => {
    localStorage.removeItem("twitter_app");
    dispatch(logoutAction());
    navigate("/login");
  };
  return (
    <div>
      <Link to="/">
        <h2 className="font-bold text-4xl py-8">twittr.</h2>
      </Link>
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex items-center gap-4">
          <img src={homeImage} alt="" className="w-7 h-7" />
          <p className="text-2xl font-bold ">Home</p>
        </Link>

        <Link to="#" className="flex items-center gap-4">
          <img src={searchImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Explore</p>
        </Link>

        <Link to="#" className="flex items-center gap-4">
          <img src={notifImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Notifications</p>
        </Link>

        <Link to="#" className="flex items-center gap-4">
          <img src={messageImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Messages</p>
        </Link>

        <Link to="#" className="flex items-center gap-4">
          <img src={noteImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Bookmarks</p>
        </Link>

        <Link to="#" className="flex items-center gap-4">
          <img src={crownLightImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Communities</p>
        </Link>

        <Link to={`/profile/${userId}`} className="flex items-center gap-4">
          <img src={profileImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Profile</p>
        </Link>

        <button onClick={handleLogout} className="flex items-center gap-4">
          <img src={outImage} alt="" className="w-7 h-7" />
          <p className="text-2xl ">Sign Out</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
