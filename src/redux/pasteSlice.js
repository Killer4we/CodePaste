import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';



const initialState = {
  paste:localStorage.getItem("paste")?JSON.parse(localStorage.getItem("paste")):[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste : (state,action) =>{
      const paste = action.payload;
      state.paste.push(paste);
      localStorage.setItem("paste",JSON.stringify(state.paste));
      toast("Paste Created Successfully");
    },
    reset : (state,action) =>{
      state.paste = [];
      localStorage.removeItem('paste');
    },
    updateToPaste : (state,action) =>{
        const paste = action.payload;
        const index = state.paste.findIndex((item)=>item._id===paste._id);
        if(index>=0){
          state.paste[index]=paste;
          localStorage.setItem('paste',JSON.stringify(state.paste));
          toast.success("Paste updated");
        }
    },
    removeFromPaste : (state,action) =>{
      const pasteId = action.payload;
      const index = state.paste.findIndex((item)=>item._id===pasteId);
      if(index>=0){
        state.paste.splice(index,1);
        localStorage.setItem('paste',JSON.stringify(state.paste));

        toast.success("Paste deleted");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, reset, updateToPaste, removeFromPaste} = pasteSlice.actions

export default pasteSlice.reducer