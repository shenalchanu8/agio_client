import React from 'react';
import {BrowserRouter, Routes, Route,Link,Router} from 'react-router-dom';

import Main_register from './pages/Main_register';

import Login from './pages/TraLogin';
import Register from './pages/TraRegister';

import { Toaster } from 'react-hot-toast';
import TraHome from './pages/TraHome';


import Home from './pages/Home';

import LeaveHRsup from './pages/leaveHRsup';
import Main_login from './pages/Main_login';

import AnnHRsup from './pages/AnnHRsup';
import AnnDisplay from './pages/AnnDisplay';
import AnnUpdate from './pages/AnnUpdate';
import AnnEmpDisplay from './pages/AnnEmpDisplay';
import AnnCalHead from './pages/AnnCalHead';




import TraDriverRegister from './pages/TraDriverRegister';
import TraVehicleRegister from './pages/TraVehicleRegister';
import meddash from './pages/meddash';

import LeaveEmp from './pages/leaveEmp';
import LeaveEmpform from './pages/leaveEmpform';
import Main_Notifications from './pages/Main_Notifications';
import LeaveHrsupdisplay from './pages/leaveHrsupdisplay'
import LeaveUpdate from './pages/leaveUpdate';




import Inquiry from './pages/inquiry';

import InsClaimSubmit from './pages/InsClaimSubmit';
import InsEmployee from './pages/InsEmployee';


import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import MyInquiries from './pages/MyInquiries';







function App() {
  const{loading} = useSelector(state => state.alerts);
  const [date, setDate] = React.useState(new Date().getDate());


  return (
    <div >
      <BrowserRouter>
      {loading && (<div className = "spinner-parent">
      <div class="spinner-border" role="status">
  
</div>
      </div>)}
      <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          <Route path='/Main_Register' element={<ProtectedRoute><Main_register /></ProtectedRoute>} />
          <Route path='/Main_Login' element={<PublicRoute><Main_login /></PublicRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={< Register/>} />
          <Route path='/meddash' element={<ProtectedRoute><meddash/></ProtectedRoute>} />
          <Route path='/LeaveEmp' element={<ProtectedRoute><LeaveEmp /></ProtectedRoute>} />
          <Route path='/LeaveEmpform' element={<ProtectedRoute><LeaveEmpform /></ProtectedRoute>} />
          <Route path='/LeaveHrsupdisplay' element={<ProtectedRoute><LeaveHrsupdisplay /></ProtectedRoute>} />
          <Route path='/Main_Notifications' element={<ProtectedRoute><Main_Notifications /></ProtectedRoute>} />
          <Route path='/LeaveUpdate/:id' element={<ProtectedRoute><LeaveUpdate/></ProtectedRoute>} />


          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/AnnHRsup' element={<ProtectedRoute><AnnHRsup/></ProtectedRoute>} />
          <Route path='/AnnDisplay' element={<ProtectedRoute><AnnDisplay/></ProtectedRoute>} />
          <Route path='/AnnUpdate/:id' element={<ProtectedRoute><AnnUpdate/></ProtectedRoute>} />
          <Route path='/AnnEmpDisplay' element={<ProtectedRoute><AnnEmpDisplay/></ProtectedRoute>} />
          <Route path="/AnnCalHead"element={<ProtectedRoute><AnnCalHead date={date}/></ProtectedRoute>} />
          
          <Route path='/LeaveHRsup' element={< LeaveHRsup/>} />


          <Route path='/home' element={< TraHome/>} />
          <Route path='/dregister' element={<TraDriverRegister />} />
          <Route path='/vregister' element={< TraVehicleRegister/>} />

          
      
          
        



          <Route exact path="/MyInquiries" element={<MyInquiries />} />

          <Route path='/inquiry' element ={<ProtectedRoute><Inquiry/></ProtectedRoute>} />
          

          <Route path='/insClaimSubmit' element={<InsClaimSubmit/>}/>
          <Route path='/insEmployee' element={<InsEmployee/>}/>

        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;