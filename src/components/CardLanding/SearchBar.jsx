import searchIcon from "../../assets/images/search-normal-dim.svg";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-start rounded-full bg-[#121316]">
      <img src={searchIcon} alt="search" className="w-6 h-6 ml-4 mr-3" />
      <input
        type="text"
        placeholder="Search"
        id="search"
        className="w-80 h-12 py-3  bg-[#121316] text-lg placeholder-lg placeholder-gray-500 rounded-full focus:outline-none focus:ring-0 focus:font-semibold"
      />
    </div>
  );
};

export default SearchBar;
