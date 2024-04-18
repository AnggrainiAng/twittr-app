import { Link } from "react-router-dom";

const TrendingTopics = () => {
  return (
    <div className="flex flex-col rounded-2xl bg-[#121316] ">
      <div className="flex flex-col py-3.5">
        <h2 className="font-bold text-lg pb-2 px-3.5">Indonesia trends</h2>

        <Link
          to="#"
          className="flex justify-between items-center hover:bg-gray-800"
        >
          <div className="flex px-3.5 py-2">
            <div>
              <p className="text-gray-500 text-sm ">1 • Trending</p>
              <p className="text-base font-bold">Jepang</p>
              <p className="text-gray-500 text-sm">14K posts</p>
            </div>
          </div>
        </Link>

        <Link
          to="#"
          className="flex justify-between items-center hover:bg-gray-800"
        >
          <div className="flex px-3.5 py-2">
            <div>
              <p className="text-gray-500  text-sm">2 • Trending</p>
              <p className="text-base font-bold">Anime</p>
              <p className="text-gray-500  text-sm">14K posts</p>
            </div>
          </div>
        </Link>

        <Link
          to="#"
          className="flex justify-between items-center hover:bg-gray-800"
        >
          <div className="flex px-3.5 py-2">
            <div>
              <p className="text-gray-500  text-sm">3 • Trending</p>
              <p className="text-base font-bold">Mentawai</p>
              <p className="text-gray-500 text-sm">14K posts</p>
            </div>
          </div>
        </Link>

        <Link
          href="#"
          className="flex justify-between items-center hover:bg-gray-800"
        >
          <div className="flex px-3.5 py-2">
            <div>
              <p className="text-gray-500  text-sm">4 • Trending</p>
              <p className="text-base font-bold">ONE OK ROCK</p>
              <p className="text-gray-500  text-sm">14K posts</p>
            </div>
          </div>
        </Link>

        <Link
          to="#"
          className="flex justify-between items-center hover:bg-gray-800"
        >
          <div className="flex px-3.5 py-2">
            <div>
              <p className="text-gray-500  text-sm">5 • Trending</p>
              <p className="text-base font-bold">macet</p>
              <p className="text-gray-500  text-sm">14K posts</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrendingTopics;
