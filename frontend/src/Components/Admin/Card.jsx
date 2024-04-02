import React from 'react';

const Card = (prod) => {
    return (
        <div className=' p-7 min-h-[100vh] bg-[#d4fcfc]'>
            {prod.children}
        </div>
    );
}

export default Card;
