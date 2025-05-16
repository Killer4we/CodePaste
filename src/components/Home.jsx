import  {react, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () =>{
    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');
    const dispatch = useDispatch();
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const allPastes = useSelector((state)=>state.paste.paste);
    function handleClick(){
        const paste = {
            title:title,
            content:value,
            _id:pasteId|| Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }


        if(pasteId){
            dispatch(updateToPaste(paste));
        }
        else{
            dispatch(addToPaste(paste));
        }
        
        setTitle('');
        setValue('');
        setSearchParams({});
        
    }


    useEffect(()=>{
        if(pasteId){
            const paste = allPastes.find((p)=>p._id === pasteId); 
            setTitle(paste.title);
            setValue(paste.content);
        }
    },[pasteId])
    
    
    
    return (
        <div>
            <div className='mt-3'>
            <input className = 'p-2 rounded-md' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter the title'/>
            <br/>
            </div>
            <div className='mt-3'>
        <button onClick={handleClick}>
            {
                pasteId ? "Update My Paste" : "Create New Paste"
            }
        </button>
        </div>
        <div className='mt-3 '>
            <textarea className='p-2 rounded' placeholder='Enter your content' value={value} onChange={(e)=>{setValue(e.target.value)}}></textarea>
        </div>
        </div>
    )
}

export default Home;