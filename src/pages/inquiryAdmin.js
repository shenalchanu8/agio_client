import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import Layout from '../components/Layout';

const { TextArea } = Input;

function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('/api/employee/all-inquiries');
        setInquiries(response.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id) => {
    setConfirmVisible(true);
    setSelectedId(id);
  };

  const confirmStatusUpdate = async () => {
    try {
      const updatedInquiries = inquiries.map((inquiry) => {
        if (inquiry._id === selectedId) {
          inquiry.status = 'Done';
          axios
            .put(`/api/employee/inquiry/${selectedId}/update-status`, {
              status: 'Done',
            })
            .then((response) => {
              setInquiries((prevInquiries) =>
                prevInquiries.map((prevInquiry) =>
                  prevInquiry._id === selectedId
                    ? { ...prevInquiry, status: 'Done' }
                    : prevInquiry
                )
              );
              message.success('Status updated successfully');
            })
            .catch((error) => {
              console.error('Error updating status:', error);
              message.error('Failed to update status');
            });
        }
        return inquiry;
      });
      setConfirmVisible(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleReply = async (id) => {
    setVisible(true);
    const selected = inquiries.find((inquiry) => inquiry._id === id);
    setSelectedInquiry(selected);
  };

  const onFinishReply = async (values) => {
    try {
      const reply = values.reply;
      const updatedInquiries = inquiries.map((inquiry) => {
        if (inquiry._id === selectedInquiry._id) {
          inquiry.status = 'Done';
          inquiry.reply = reply;
          axios
            .put(`/api/employee/inquiry/${selectedInquiry._id}/reply`, {
              reply,
            })
            .then((response) => {
              setInquiries((prevInquiries) =>
                prevInquiries.map((prevInquiry) =>
                  prevInquiry._id === selectedInquiry._id
                    ? { ...prevInquiry, reply, status: 'Done' }
                    : prevInquiry
                )
              );
              message.success('Reply sent successfully');
            })
            .catch((error) => {
              console.error('Error sending reply:', error);
              message.error('Failed to send reply');
            });
        }
        return inquiry;
      });
      setInquiries(updatedInquiries);
      setVisible(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      message.error('Failed to send reply');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowMore = (text) => {
    Modal.info({
      title: 'Inquiry Details',
      content: (
        <div>
          <p>{text}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },
    {
      title: 'Inquiry Date',
      dataIndex: 'inquirydate',
      key: 'inquirydate',
      width: 100,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
    },
    {
      title: 'Inquiry',
      dataIndex: 'describe',
      key: 'describe',
      className: 'inquiry-column',
      render: (text) => (
        <>
          {text.length > 10 ? (
            <span>
              {text.substr(0, 10)}...
              <Button type="link" onClick={() => handleShowMore(text)}>
                Show More
              </Button>
            </span>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: 'Reply',
      dataIndex: 'reply',
      key: 'reply',
      width: 200,
      render: (text) => (
        <>
          {text && text.length > 10 ? (
            <span>
              {text.substr(0, 10)}...
              <Button type="link" onClick={() => handleShowMore(text)}>
                Show More
              </Button>
            </span>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleStatusUpdate(record._id)}
            danger={record.status === 'Done'}
          >
            {record.status === 'Pending' ? 'Pending' : 'Done'}
          </Button>
          <Button onClick={() => handleReply(record._id)}>Reply</Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ width: '1600px' }}>
        <h1>All Inquiries</h1>
        <Input
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Table dataSource={filteredInquiries} columns={columns} />

        <Modal
          title="Write Reply"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={onFinishReply} layout="vertical">
            <Form.Item
              label="Reply"
              name="reply"
              rules={[
                { required: true, message: 'Please input your reply!' },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Reply
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Confirm Update"
          visible={confirmVisible}
          onOk={confirmStatusUpdate}
          onCancel={() => setConfirmVisible(false)}
        >
          Are you sure you want to mark this inquiry as Done?
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminInquiries;