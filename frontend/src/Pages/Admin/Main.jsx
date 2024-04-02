import React from 'react';
import Header from '../../Components/Admin/Header';
import SideBar from '../../Components/Admin/SideBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <div className='grid grid-cols-5 h-[100vh]'>
                <SideBar />
                <div className='col-span-4'>
                    <Header />
                    <div className='p-2'>

                    <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
