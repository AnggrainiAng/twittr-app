import { Link } from "react-router-dom";
import MightLike from "../CardLanding/MightLike";
import SearchBar from "../CardLanding/SearchBar";
import Sidebar from "../CardLanding/Sidebar";
import TrendingTopics from "../CardLanding/TrendingTopics";
import backgroundImg from "../../assets/images/cover.png";
import ownerPhoto from "../../assets/images/girl3.png";
import verifyImage from "../../assets/images/verify.png";
import briefcaseIcon from "../../assets/images/briefcase.svg";
import locationIcon from "../../assets/images/location.svg";
import likeIcon from "../../assets/images/heart.svg";
import deleteIcon from "../../assets/images/trash.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utils/config";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const CardProfile = () => {
  const user = useSelector((state) => state.user);
  const [tweets, setTweets] = useState([]);
  const [editTweetId, setEditTweetId] = useState(null);
  const [editedTweetContent, setEditedTweetContent] = useState("");

  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl +
          `/tweets?userId=${user.id}&_expand=user&_sort=createdAt&_order=desc`
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const handleEdit = (tweetId, initialContent) => {
    setEditTweetId(tweetId);
    setEditedTweetContent(initialContent);
  };

  const handleEditSubmit = async (tweetId) => {
    try {
      await axios.patch(`${baseUrl}/tweets/${tweetId}`, {
        tweet: editedTweetContent,
      });
      setEditTweetId(null);
      getTweets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await axios.delete(`${baseUrl}/tweets/${tweetId}`);
      getTweets();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="px-12 min-w-min flex justify-between">
      {/* Sidebar */}
      <div className="min-w-[230px]">
        <Sidebar />
        <button className="w-[200px] py-8">
          <span className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-base font-bold py-3 px-4 rounded-full block">
            New Tweet
          </span>
        </button>
      </div>

      {/* Feeds */}
      <div className="h-full border border-gray-400 w-full">
        <div className="relative border-b border-gray-400">
          <div
            className="bg-cover bg-center w-full h-[200px]"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          ></div>

          <div className="absolute pl-5 top-[140px]">
            <img
              src={ownerPhoto}
              id="ownerPhoto"
              alt=""
              className="object-cover w-[120px] h-[120px] rounded-full border-4 border-black"
            />
          </div>

          <div className="px-5">
            <div className="flex flex-col justify-start gap-3.5 pt-[70px]">
              <div className="flex justify-between items-center">
                <div>
                  <h3 id="userProfileName" className="text-2xl font-bold">
                    {user.fullname}
                    <img
                      src={verifyImage}
                      alt=""
                      className="inline w-6 h-6 rounded-full"
                    />
                  </h3>
                  <p id="userProfileUsername" className="text-sm text-gray-500">
                    @{user.username}
                  </p>
                </div>
              </div>

              <p className="leading-[26px] text-sm">i love coding</p>

              <div className="flex gap-5">
                <div className="flex gap-1.5">
                  <img
                    src={briefcaseIcon}
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <p className="text-base text-gray-500">Full-Stack Engineer</p>
                </div>

                <div className="flex gap-1.5">
                  <img
                    src={locationIcon}
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <p className="text-base text-gray-500">Indonesia</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div>
                  <span className="font-bold text-base mr-1">12</span>
                  <span className="text-base text-gray-500">Following</span>
                </div>

                <div>
                  <span className="font-bold text-base mr-1">18,309</span>
                  <span className="text-base text-gray-500">Followers</span>
                </div>
              </div>

              <div className="flex justify-between px-2">
                <Link
                  to="#"
                  className="px-2.5 pb-3.5 text-base font-bold border-b-4 border-blue-500"
                >
                  Posts
                </Link>
                <Link to="#" className="px-2.5 pb-3.5 text-base text-gray-500">
                  Replies
                </Link>
                <Link to="#" className="px-2.5 pb-3.5 text-base text-gray-500">
                  Highlights
                </Link>
                <Link to="#" className="px-2.5 pb-3.5 text-base text-gray-500">
                  Media
                </Link>

                <Link to="#" className="px-2.5 pb-3.5 text-base text-gray-500">
                  Likes
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="twittsWrapper">
          {tweets.map((tweet) => (
            <div key={tweet.id} className=" p-4 border-b border-gray-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <img
                    src={ownerPhoto}
                    alt="ownerPhoto"
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div className="pl-2">
                    <div className="flex  gap-1">
                      <p className="text-base font-bold">
                        {tweet.user.fullname}
                      </p>
                      <img
                        src={verifyImage}
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      @{tweet.user.username} •{" "}
                      {formatDistanceToNow(new Date(tweet.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center rounded-full px-3 py-1.5 border border-gray-400 gap-2">
                  <p className="text-sm font-semibold">
                    {" "}
                    {tweet.feeling === "Happy" && "🤩"}{" "}
                    {tweet.feeling === "Sad" && "😥"}{" "}
                    {tweet.feeling === "Shocked" && "🤯"} {tweet.feeling}
                  </p>
                </div>
              </div>
              {editTweetId === tweet.id ? (
                <>
                  <div className="relative">
                    <textarea
                      value={editedTweetContent}
                      onChange={(e) => setEditedTweetContent(e.target.value)}
                      maxLength={150}
                      placeholder="Edit your tweet..."
                      className="w-full h-24 py-3 pl-3 pr-10 bg-black text-base placeholder-lg focus:outline-none focus:ring-0 focus:font-semibold resize-none overflow-hidden rounded-lg"
                    ></textarea>
                    <p className="absolute bottom-2 text-xs pl-3 text-gray-500">
                      {editedTweetContent.length}/150
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditSubmit(tweet.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-sm cursor-pointer font-bold px-4 py-2 rounded-full mt-2 mb-2 text-white"
                  >
                    Save
                  </button>
                </>
              ) : (
                <p className="pl-14 py-2.5 leading-7 text-base ">
                  {tweet.tweet}
                </p>
              )}

              <div className="flex justify-between items-center pl-14 w-96">
                <div className="flex justify-center items-center gap-3">
                  <button
                    type="button"
                    className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                  >
                    <img className="like-icon" src={likeIcon} alt="heart" />

                    <p className="text-sm font-normal"> {tweet.liked} Likes</p>
                  </button>

                  {editTweetId !== tweet.id && (
                    <button
                      onClick={() => handleEdit(tweet.id, tweet.tweet)}
                      className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                    >
                      <img src={deleteIcon} alt="edit" />
                      <p className="text-sm font-normal">Edit</p>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(tweet.id)}
                    className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                  >
                    <img src={deleteIcon} alt="delete" />
                    <p className="text-sm font-normal">Delete</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse */}
      <div className="w-80">
        <div className="pl-8 flex flex-col gap-8 py-8">
          {/* Search Bar */}
          <SearchBar />

          {/* You Might Like */}
          <MightLike />

          {/* Trending Topics */}
          <TrendingTopics />
        </div>
      </div>
    </section>
  );
};

export default CardProfile;
