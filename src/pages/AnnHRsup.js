import React, { useEffect } from 'react';
import axios from 'axios';
import { Form ,  Input,Select, DatePicker,message } from 'antd'

import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function AnnHRsup() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const [announcementType, setAnnouncementType] = useState('');

  const{Option} = Select;

  const getData = async () => {
    try {
        const response = await axios.post('/api/employee/get-employee-info-by-id', {} , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};
useEffect(() => {
  getData();
}, []);


  const onFinish = async(values) =>{
    console.log('Recieved values of form', values);

    try {
      const response = await axios.post('/api/employee/AnnHRsup',{...values , userid : user?.userid,},
      {headers:{
        Authorization :`Bearer ${localStorage.getItem("token")}`,
       },

        });
      if(response.data.success){
          toast.success(response.data.message);
          navigate('/AnnDisplay');

         
          
      }else{
          toast.error(response.data.message);

      }
      
  } catch (error) {
      toast.error("Something went wrong");
  }

  };
  const handleTypeChange = (value) => {
    setAnnouncementType(value);
  };

  const uploadProps = {
    beforeUpload: file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
      }
      // Return false to stop auto uploading because we'll be handling submission separately
      return isJpgOrPng ? false : Upload.LIST_IGNORE;
      return false;
    },
    multiple: true, // If you want to allow multiple file uploads
  };
  

  



  return <Layout>
  <div className="annform">
  <div className="AnnHRSup_form box p-3">
    <h3 className='title'>Create an Announcement</h3>
    <Form layout='vertical' onFinish={onFinish}>
      <div className="form-row">
      <div className="item">
          <Form.Item label='Announcement Title' name='anntitle'>
            <Input placeholder='Announcement Title' />
          </Form.Item>
        </div>
        
      </div>
      
      <div className="form-row">
      <div className="item">
          <Form.Item label="Upload Date" name="uploaddate">
            <DatePicker className="date" />
          </Form.Item>
        </div>
        <div className="item">
        <Form.Item name="Type" label="Type">
                  <Select
                    className="Type"
                    placeholder="Select announcement type"
                    onChange={handleTypeChange}
                  >
                    <Option value="General">General</Option>
                    <Option value="Specific">Specific</Option>
                  </Select>
                </Form.Item>

        </div>
      </div>
      
      {announcementType === 'Specific' && (
             <div className="form-row">
             <div className="item">
               {/* Add Form.Item for Department */}
               <Form.Item label="Department" name="Department">
                 {/* Use Select component for dropdown */}
                 <Select placeholder="Select department">
                   {/* Add Option components for each department */}
                   <Option value="HR">HR</Option>
                   <Option value="Finance">Finance</Option>
                   <Option value="Marketing">Marketing</Option>
                   {/* Add more options as needed */}
                 </Select>
               </Form.Item>
             </div>
           </div>
            )}

      <div className="form-row">
        <div className="item">
          <Form.Item label="Expire Date" name="expiredate">
            <DatePicker className="date" />
          </Form.Item>
        </div>
        <div className="itemUpload">
        <Form.Item label='Upload Media' name='files'>
  <Upload {...uploadProps} listType="picture">
    <Button icon={<UploadOutlined />}>Select File</Button>
  </Upload>
</Form.Item>

{/* <Form.Item label="Attachment">
  <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
</Form.Item> */}

            </div>
      </div>
      <div className="item">
        <Form.Item name="Description" label="Description">
          <Input.TextArea className='Description' />
        </Form.Item>
      </div>
      <div className="Button-cons">
        <Button className='primary-button my-2' htmlType='submit'>Submit</Button>
      </div>
    </Form>
  </div>
</div>
</Layout>
} 

export default AnnHRsup