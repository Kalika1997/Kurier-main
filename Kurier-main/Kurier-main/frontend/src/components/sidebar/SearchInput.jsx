
import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { useSideBarConversation } from "../../store/useSideBarConversation";
import { useGetSideBarConversations } from "../../hooks/useGetSideBarConversations";
import toast from "react-hot-toast";
const SearchInput = () => {

  const [search, setSearch] = useState("");
  // from global zustand state
  const { setSelectedConversation } = useSideBarConversation();
  const { conversations } = useGetSideBarConversations();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const searchedConversation = conversations.find((conversation) => conversation.fullName.toLowerCase().includes(search.toLowerCase()));
    if (searchedConversation) {
      setSelectedConversation(searchedConversation);
      setSearch("");
    } else toast.error("No such user found!");
  }


  return (
    <form className='flex items-center gap-2' onSubmit={handleSearchSubmit}>
      <input type='text' placeholder='Search…' className='input input-bordered input-ghost input-warning rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <button type='submit' className='btn btn-circle bg-yellow-700 text-white'>
        {/* <IoSearchSharp className='w-6 h-6 outline-none' /> */}
        <MdPersonSearch className="w-6 h-6 outline-none"/>
      </button>
    </form>
  );
};
export default SearchInput;