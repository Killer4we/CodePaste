import {react} from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () =>{

    const {id} = useParams();
    const allPastes = useSelector((state)=>state.paste.paste);

    const paste = allPastes.filter((p)=>p._id===id)[0];
    
    // console.log(paste);
    function handleCopy(){
        navigator.clipboard.writeText(paste.content);
        toast.success("Copied Successfully");
    }

    // const baseUrl = window.location.origin;
    const baseUrl ="https://code-paste-five.vercel.app";

    function handleShare(){

        const shareUrl = `${baseUrl}/paste/${paste._id}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied successfully");
        
    }
    
    return (
        <div>
            <div className='mt-3'>
            <input disabled className = 'p-2 rounded-md' type='text' value={paste.title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter the title'/>
            <br/>
            </div>
            <div className='mt-3'>
        </div>
        <div className='mt-3 '>
            <div className="flex flex-col w-[300px]">
    <div className="bg-gray-100 p-1 border-b border-gray-300 flex justify-between items-center">
    <span className="text-blue-950 text-sm font-bold">Options</span>
    <button className="text-xs px-2 py-1" onClick={handleCopy}>copy</button>
    <button className="text-xs px-2 py-1" onClick={handleShare}>share</button>
  </div>
  <textarea
    className="p-2 border border-gray-300 resize-y font-mono text-sm"
    rows={5}
    value={paste.content}
    disabled
  />
</div>

        </div>
        </div>
    )
}

export default ViewPaste;