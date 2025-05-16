import {react, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {WhatsappShareButton,WhatsappIcon} from 'react-share';

const Pastes = () =>{

    const [searchTerm,setSearchTerm] = useState('');
    const pastes = useSelector((state)=>state.paste.paste);
    // console.log(pastes);

    const dispatch = useDispatch();
    
    const filteredData = pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    function handleDelete(pasteId){
        dispatch(removeFromPaste(pasteId));
    }
    const baseUrl = window.location.origin;
    
    return (
        <div>
            <div  className='mt-3'>
            <input type='search' value={searchTerm} className='p-2 rounded-xl' placeholder='Enter the title' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
            </div>
            <div className='mt-3 flex flex-col gap-5'>
                {
                    filteredData.length === 0 && <div>
                        <h3>No paste available right now</h3>
                    </div>
                }
                {
                    filteredData.length > 0 && filteredData.map((paste)=>{
                        const shareUrl = `${baseUrl}/paste/${paste._id}`;
                        return (
                            <div className='border' key={paste._id}>
                                <div>Title: {paste.title}</div>
                                <div>Content: {paste.content}</div>
                                <div className='flex flex-row gap-4 place-content-evenly'>
                                    <Link className='ml-2 text-white' to = {`/?pasteId=${paste?._id}`}><button>Edit</button></Link>
                                    <Link className='text-white' to={`/paste/${paste._id}`}><button>View</button></Link>
                                    <Link className='text-white'><button onClick={()=>{
                                        navigator.clipboard.writeText(paste.content);
                                        toast.success("Copied Successfully");
                                        }}
                                        >Copy</button></Link>
                                    <Link className='text-white'><button onClick={() => {handleDelete(paste._id)}}>Delete</button></Link>
                                       <button className = 'mr-2' onClick={()=>{
                                        navigator.clipboard.writeText(shareUrl);
                                        toast.success("Link copied successfully");
                                       }}> <WhatsappIcon  size={24} round /></button>
                                </div>
                                <div>
                                    {new Date(paste.createdAt).toLocaleString()}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pastes;