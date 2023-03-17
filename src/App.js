import React, {useState} from "react";
import './App.css';
import Data from './data.json';
import {v1 as uuidv1} from "uuid";
import axios from "axios";

function App() {

  // State
  const [data, setData] = useState(Data);

  // Temp State
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [updateId, setUpdateId] = useState() 

  // Add post
  const addPost = () => {
    if (title && content)   {
      let newPostData = {
        "id": uuidv1(),
        "title": title,
        "content": content
      }
      let newPost = [...data, newPostData]
      setData(newPost);
      setTitle();
      setContent(); 

      saveData(newPost);
    }
  }

  // delete post
  const deletePost = (id) => {
    setData(prevData => prevData.filter(post => post.id !== id));

    saveData(deletePost);
  }

  //populate post
  const populatePost = (id, title, content) => {
    // console.log(id)
    // console.log(title)
    // console.log(content)
    setUpdateId(id);
    setUpdateTitle(title);
    setUpdateContent(content);
  }


  // Update post
  const updatePost = () => {
    let editPost = {
      "id": updateId,
      "title": updateTitle,
      "content": updateContent
    } 
    let editedPost = [...data].filter(updatePost => updatePost.id !== updateId) 
    let addingEditedPost = [...editedPost, editPost]
    setData(addingEditedPost);
    setUpdateId();
    setUpdateTitle();
    setUpdateContent();

    saveData(addingEditedPost);
  }

  //Backend: Function to write to json data file
  // This function will receive all updated state / posts after you add, edit, delete post.
  const saveData = (posts) => {
  // api url // end point from node server / express server
  // This is the request
  const url = 'http://localhost:5000/endpoint-write'

  axios.post(url, posts)
  .then(response => { 
    // console.log(response);
  });
  }

  // downloading data.json file
  const downloadData = (saveData) => {
    const fileData = JSON.stringify(saveData);

    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    //create link
    const link = document.createElement('a');

    //point link to file to be downloaded
    link.download = 'appData.json';
    link.href = url;

    //trigger download
    link.click();
  }


  return (
    <div className="App">

      <div>
        <h4>ADD new post</h4>
        <input 
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          value={title || ''}
          // ref={titleRef}
        />
        <br/>
        <textarea 
          placeholder="Content"
          onChange={e => setContent(e.target.value)}
          value={content || ''}
          // ref={contentRef}
        ></textarea>
        <br />
        <button onClick={addPost}>Add Post</button>
      </div>
      {updateTitle || updateContent 
      ? (
          <div>
            <h4>Update post</h4>
            <input 
              placeholder="Update Title"
              onChange={e => setUpdateTitle(e.target.value)}
              value={updateTitle || ''}
            />
            <br/>
            <textarea 
              placeholder="Update Content"
              onChange={e => setUpdateContent(e.target.value)}
              value={updateContent || ''}
            ></textarea>
            <br />
            <button onClick={updatePost}>Update Post</button>
          </div>
        )
      : null}
      


      {/* display data from data.json file */}
      <div className="posts">
        { data ? data.map(post => {
          return <div 
                  key={post.id}
                  className="post">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <button onClick={() => populatePost(post.id, post.title, post.content)}>Edit</button>
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
        }) : null }
      </div> 
        <button onClick={(e) => downloadData(data)}>Download Data</button>
    </div>
  );
}

export default App;
