import ownerPhoto2 from "../../assets/images/girl2.png";
import ownerPhoto3 from "../../assets/images/girl3.png";
import verifyImage from "../../assets/images/verify.png";
const MightLike = () => {
  return (
    <div className="flex flex-col p-3.5 rounded-2xl bg-[#121316]">
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-lg">You might like</h2>
        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              src={ownerPhoto2}
              alt="ownerphoto2"
              className="w-12 h-12 rounded-full"
            />
            <div className="pl-2">
              <div className="flex items-start">
                <p className="text-base font-bold mr-1">Shayna</p>

                <img
                  src={verifyImage}
                  alt="verify"
                  className="w-5 rounded-full"
                />
              </div>

              <p className="text-sm text-blue-200">@shayna</p>
            </div>
          </div>

          <button type="button">
            <span
              href="#"
              className="bg-white cursor-pointer px-4 py-2 rounded-full text-black font-bold"
            >
              Follow
            </span>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              src={ownerPhoto2}
              alt="ownerphoto2"
              className="w-12 h-12 rounded-full"
            />
            <div className="pl-2">
              <div className="flex items-start">
                <p className="text-base font-bold mr-1">Baso</p>

                <img
                  src={verifyImage}
                  alt="verify"
                  className="w-5 rounded-full"
                />
              </div>

              <p className="text-sm text-blue-200">@basoaja</p>
            </div>
          </div>

          <button type="button">
            <span
              href="#"
              className="bg-white cursor-pointer px-4 py-2 rounded-full text-black font-bold"
            >
              Follow
            </span>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              src={ownerPhoto3}
              alt="ownerphoto2"
              className="w-12 h-12 rounded-full"
            />
            <div className="pl-2">
              <div className="flex items-start">
                <p className="text-base font-bold mr-1">basoooo</p>

                <img
                  src={verifyImage}
                  alt="verify"
                  className="w-5 rounded-full"
                />
              </div>

              <p className="text-sm text-blue-200">@</p>
            </div>
          </div>

          <button type="button">
            <span
              href="#"
              className="bg-white cursor-pointer px-4 py-2 rounded-full text-black font-bold"
            >
              Follow
            </span>
          </button>
        </div>

        <button className="text-base font-medium text-blue-500 pl-2 flex items-start">
          Show more
        </button>
      </div>
    </div>
  );
};

export default MightLike;
