import { Link } from "react-router-dom";
import verifyImage from "../../assets/images/verify.png";
import ownerPhoto from "../../assets/images/girl1.png";
import likeIcon from "../../assets/images/heart.svg";
import likeIconFull from "../../assets/images/heart-fill.svg";
import deleteIcon from "../../assets/images/trash.svg";
import reportIcon from "../../assets/images/warning-2.svg";
import Sidebar from "./Sidebar";
import axios from "axios";
import { baseUrl } from "../../utils/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import TrendingTopics from "./TrendingTopics";
import MightLike from "./MightLike";
import SearchBar from "./SearchBar";

const CardLanding = () => {
  const [tweets, setTweets] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [newTweetContent, setNewTweetContent] = useState("");
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editedTweetContent, setEditedTweetContent] = useState("");
  const [userLikedTweets, setUserLikedTweets] = useState([]);

  const handleEdit = (tweetId, currentContent) => {
    setEditingTweetId(tweetId);
    setEditedTweetContent(currentContent);
  };

  const handleFeelingClick = (feeling) => {
    setSelectedFeeling(feeling);
  };

  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl + "/tweets?_expand=user&_sort=createdAt&_order=desc"
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTweetContent.trim()) {
      // Display an alert for empty tweet
      alert("Please enter a tweet.");
      return;
    }

    if (!selectedFeeling) {
      // Display an alert for missing feeling
      alert("Please select a feeling first.");
      return;
    }

    try {
      await axios.post(baseUrl + "/tweets", {
        tweet: newTweetContent,
        feeling: selectedFeeling,
        userId: user.id,
        createdAt: new Date(),
        liked: 0,
      });
      getTweets();
      setNewTweetContent("");
      setSelectedFeeling(null);
    } catch (error) {
      console.log("Error posting tweet:", error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const handleEditSubmit = async (tweetId) => {
    if (!editedTweetContent.trim()) {
      // Display an alert for empty tweet
      alert("Please enter a non-empty tweet.");
      return;
    }
    try {
      await axios.patch(`${baseUrl}/tweets/${tweetId}`, {
        tweet: editedTweetContent,
      });
      // Update the tweet in the state with the edited content
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId ? { ...tweet, tweet: editedTweetContent } : tweet
        )
      );
      setEditingTweetId(null); // Exit edit mode
    } catch (error) {
      console.error("Error editing tweet:", error);
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      await axios.delete(`${baseUrl}/tweets/${tweetId}`);

      setTweets((prevTweets) =>
        prevTweets.filter((tweet) => tweet.id !== tweetId)
      );
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const tweetIndex = tweets.findIndex((tweet) => tweet.id === tweetId);
      const isTweetLiked = userLikedTweets.includes(tweetId);

      if (isTweetLiked) {
        // If already liked, unlike the tweet
        await axios.patch(`${baseUrl}/tweets/${tweetId}`, {
          liked: tweets[tweetIndex].liked - 1,
        });
        setUserLikedTweets(userLikedTweets.filter((id) => id !== tweetId));
      } else {
        // If not liked, like the tweet
        await axios.patch(`${baseUrl}/tweets/${tweetId}`, {
          liked: tweets[tweetIndex].liked + 1,
        });
        setUserLikedTweets([...userLikedTweets, tweetId]);
      }

      // Update the like count in the tweet object
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId
            ? {
                ...tweet,
                liked: isTweetLiked ? tweet.liked - 1 : tweet.liked + 1,
              }
            : tweet
        )
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <section className="px-12 min-w-min flex justify-between">
      {/* Sidebar */}
      <Sidebar />

      {/* Feeds */}

      <div className="h-full border-l border-r border-gray-400">
        <div className="flex justify-center gap-32 pt-5 border-b border-gray-400">
          <Link
            to="#"
            className="px-2.5 pb-3.5 text-lg font-bold border-b-4 border-blue-500"
          >
            For You
          </Link>
          <Link
            to="#"
            className="px-2.5 pb-3.5 text-lg font-bold text-gray-500"
          >
            Following
          </Link>
        </div>

        <div className="bg-primary pt-5 pb-4 px-6 border-b border-gray-400">
          <form id="twittForm" onSubmit={handleSubmit}>
            <div className="flex items-start justify-start">
              <img
                src={ownerPhoto}
                id="ownerPhoto"
                className="object-cover w-12 h-12 rounded-full mr-3"
              />

              <div className="relative flex-grow">
                <textarea
                  value={newTweetContent}
                  onChange={(e) => setNewTweetContent(e.target.value)}
                  maxLength={150}
                  placeholder="What's happening?"
                  id="twittContent"
                  className="w-full h-24 py-3 pl-3 pr-10 bg-black text-base placeholder-lg focus:outline-none focus:ring-0 focus:font-semibold resize-none overflow-hidden rounded-lg"
                ></textarea>
                <p className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {newTweetContent.length}/150
                </p>
              </div>
            </div>
            <div className="w-90 flex justify-between items-center ml-14 pt-4">
              <div className="flex justify-center items-center gap-2">
                <div
                  className="cursor-pointer border flex justify-center items-center rounded-full px-2 py-2 border-gray-400 gap-2"
                  onClick={() => handleFeelingClick("Happy")}
                  style={{
                    borderColor: selectedFeeling === "Happy" ? "#3B82F6" : "",
                  }}
                >
                  <p>🤩</p>
                  <p className="text-sm font-semibold">Happy</p>
                </div>
                <div
                  className="cursor-pointer flex justify-center items-center rounded-full px-2 py-2 border border-gray-400 gap-2"
                  onClick={() => handleFeelingClick("Sad")}
                  style={{
                    borderColor: selectedFeeling === "Sad" ? "#3B82F6" : "",
                  }}
                >
                  <p>😥</p>
                  <p className="text-sm font-semibold">Sad</p>
                </div>
                <div
                  className="cursor-pointer flex justify-center items-center rounded-full px-2 py-2 border border-gray-400 gap-2"
                  onClick={() => handleFeelingClick("Shocked")}
                  style={{
                    borderColor: selectedFeeling === "Shocked" ? "#3B82F6" : "",
                  }}
                >
                  <p>🤯</p>
                  <p className="text-sm font-semibold">Shocked</p>
                </div>
              </div>

              <button type="submit">
                <span className="bg-blue-500 hover:bg-blue-600  cursor-pointer font-bold px-10 py-4 rounded-full ml-4 ">
                  Post
                </span>
              </button>
            </div>
          </form>
        </div>

        <div id="twittsWrapper">
          {tweets.map((tweet) => (
            <div key={tweet.id} className=" p-4 border-b border-gray-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <Link
                    to={
                      user.id === tweet.user.id
                        ? "/profile"
                        : `/profile/${tweet.user.id}`
                    }
                  >
                    <img
                      src={ownerPhoto}
                      alt="ownerPhoto"
                      className="object-cover w-12 h-12 rounded-full"
                    />
                  </Link>
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

              {editingTweetId === tweet.id ? (
                <>
                  <textarea
                    value={editedTweetContent}
                    onChange={(e) => setEditedTweetContent(e.target.value)}
                    maxLength={150}
                    placeholder="Edit your tweet..."
                    className="w-full h-24 py-3 pl-3 pr-10 bg-black text-base placeholder-lg focus:outline-none focus:ring-0 focus:font-semibold resize-none overflow-hidden rounded-lg"
                  ></textarea>
                  <button
                    onClick={() => handleEditSubmit(tweet.id)}
                    className="bg-blue-500 hover:bg-blue-600  cursor-pointer font-bold px-4 py-2 rounded-full mt-2 mb-2 text-white"
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
                    onClick={() => handleLike(tweet.id)}
                    type="button"
                    className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                  >
                    <img
                      className="like-icon"
                      src={
                        userLikedTweets.includes(tweet.id)
                          ? likeIconFull
                          : likeIcon
                      }
                      alt="heart"
                    />
                    {tweet.liked === 0 ? (
                      <p className="text-sm font-normal">0 Like</p>
                    ) : (
                      <p className="text-sm font-normal">
                        {tweet.liked} Like{tweet.liked !== 1 ? "s" : ""}
                      </p>
                    )}
                  </button>

                  {tweet.userId === user.id && (
                    <>
                      <button
                        className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                        onClick={() => handleDelete(tweet.id)}
                      >
                        <img src={deleteIcon} alt="delete" />
                        <p className="text-sm font-normal">Delete</p>
                      </button>

                      <button
                        onClick={() => handleEdit(tweet.id, tweet.tweet)}
                        className="cursor-pointer flex justify-start items-center w-24 gap-2.5"
                      >
                        <img src={deleteIcon} alt="edit" />
                        <p className="text-sm font-normal">Edit</p>
                      </button>
                    </>
                  )}

                  {tweet.userId !== user.id && (
                    <button className="flex justify-start items-center w-24 gap-2.5">
                      <img src={reportIcon} alt="report" />
                      <p className="text-sm font-normal text-blue-100">
                        Report
                      </p>
                    </button>
                  )}
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

export default CardLanding;
