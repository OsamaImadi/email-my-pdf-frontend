import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const FormUpload = (props) => {
  const [emailText, setEmailText] = useState('');
  const [email, setEmail] = useState('');
  const [board, setBoard] = useState('');
  const [boardName, setBoardName] = useState('Select Board');
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('Choose File');

  const handleEmailTextChange = (evt) => {
    setEmailText(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSelect = (evt) => {
    if(evt == '3709724223') setBoardName('Bugs')
    if(evt == '3709724222') setBoardName('Epics')
    if(evt == '3709724217') setBoardName('Retrospectives')
    if(evt == '3709724214') setBoardName('Tasks')
    setBoard(evt);
  };//https://monday.com/developers/v2/try-it-yourself

  const handlePhotoSelect = (evt) => {
    setFile(evt.target.files[0]);
    setFilename(evt.target.files[0].name);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('text', emailText);
    formData.append('image', file);
    formData.append('board', board);
    axios({
        method: "post",
        url: "http://146.190.41.135/send-file",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
    .then((res) => {
        toast.success(res?.data?.message);
    })
    .catch((err) => {
        console.log(err)
        toast.error(err?.response?.data?.message)
    });
  };

  return (
    <>
    <div>
      <h2>Email My Pdf</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={handleEmailChange} value={email} name={email}/>
        <br/>
        <Form.Label>Email text</Form.Label>
        <Form.Control type="text" placeholder="Enter email text"  onChange={handleEmailTextChange} value={emailText} name={emailText}/>
        <br/>
        <DropdownButton
          title={boardName}
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="3709724223">Bugs</Dropdown.Item>
          <Dropdown.Item eventKey="3709724222">Epics</Dropdown.Item>
          <Dropdown.Item eventKey="3709724217">Retrospectives</Dropdown.Item>
          <Dropdown.Item eventKey="3709724214">Tasks</Dropdown.Item>
        </DropdownButton>
    <br/>
        <Form.Control type="file" onChange={handlePhotoSelect} />
      </Form.Group>
        <div class="col text-center">
            <Button variant="primary" type="submit" className='mb-6' >
                Submit
            </Button>
        </div>
      </Form>
      <Toaster/>
    </div>
    </>
  );
};

export default FormUpload;