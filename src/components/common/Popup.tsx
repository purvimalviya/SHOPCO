import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hidePopup } from '../../store/ui-slice';

interface PopupProps{
    text : string;
    linkText : string;
}


const Popup : React.FC<PopupProps> = ({text , linkText}) => {
    const dispatch = useDispatch();
    
    const hide = ()=>{
        dispatch(hidePopup());
    }

    return (
    <div className='flex flex-row bg-black text-white text-center items-center py-1 gap-2 cs:items-end'>
        <div className='flex-1 flex flex-row gap-2 justify-center flex-wrap text-sm font-thin cs'>
            {/* <p className=''> */}
                <div>{text}</div>
                <Link to="/Signup" className='cursor-pointer font-medium underline-offset-4 underline decoration-white cs:pb-2'>{linkText}</Link>
            {/* </p> */}
        </div>
        <div onClick={hide} className='cursor-pointer flex-none mr-11 text-2xl sm:mr-4'>
            x
        </div>
    </div>
  )
}

export default Popup;


// JSX.Element type
// import React from 'react';

// interface PopupProps {
//   text: string;
//   linkText: string;
// }

// const Popup = ({ text, linkText }: PopupProps): JSX.Element => {
//   return (
//     <div className="popup-container">
//       <p>{text}</p>
//       <a href="/signup" className="link-text">{linkText}</a>
//     </div>
//   );
// };

// export default Popup;
