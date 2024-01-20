import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import {format} from 'date-fns'
import Layout from './Layout'


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Hello World",
      datetime: "June 01, 2023 12:00:00",
      body: "Hello World!lipson unra snadkjsdkaskdna sdasj djaskadsc;lmadlmcl;asdmc;lmasdl;lndaslkncklanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds!"
  },
    {
      id: 2,
      title: "bye World",
      datetime: "January 01, 2023 12:00:00",
      body: "Hello World!lipson unra snadkjsdkaskdna sdasj djasklndciosdvansn  mznlkdsnakl dnsl aslkncklanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds!"
  },
    {
      id: 3,
      title: "fuck the World",
      datetime: "August 01, 2023 12:00:00",
      body: "Hello World!lipson unra snadkjsdkaskdna sdasj djasklndasncasdlnckasndcknasd adk ndklsclkncklanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds!"
  }, 
    {
      id: 4,
      title: "Destroy World",
      datetime: "April 01, 2023 12:00:00",
      body: "Hello World!lipson unra snadkjsdkaskdna sdasj djasklndaslnkcasdkjlncklnadsklcnads  dvgge wava kncklanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds!lipson unra snadkjsdkaskdna sdasj djasklndaslkncklanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds"
  }, 
    {
      id: 5,
      title: "Save the World",
      datetime: "December 01, 2023 12:00:00",
      body: "Hello World!lipson unra snadkjsdkaskdna sdasj djasklndaslknckvnlewknklrwnekvlnrklnvklre w er w erv r v ewrvlanslkcnadsklcn a asdcadscasdc asdcas  cdsacdscaadscds!"
  }
])  
  const [search, setSearch] = useState('')
  const[searchResults, setSearchResults] = useState([])
  const[postTitle, setPostTitle] = useState('');
  const[postBody, setPostBody] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const filteredResults = posts.filter((post) => 
     ((post.body).toLowerCase()).includes(search.toLowerCase()) 
       || 
     ((post.title).toLowerCase()).includes(search.toLowerCase()));
     
     setSearchResults(filteredResults.reverse()) 
    }, [posts, search])

    
    const handleSubmit = (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const newPost = {id, title: postTitle, datetime, body: postBody};
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
      
    }
    const handleDelete= (id) => {
     const postList = posts.filter(post => post.id !== id);
     setPosts(postList)
     navigate('/');
    }
    
    return (
    <> 
    <Routes> 
      <Route path="/" element={<Layout 
      search={search} 
      setSearch={setSearch}
      />} >
       
       <Route index element={<Home posts={searchResults} />} />
      
      <Route path="post"> // nested route for creating new posts
      
      <Route index element={<NewPost 
      handleSubmit={handleSubmit}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}
      /> }/>
      
      
      <Route path="/post/:id" element={<PostPage
       posts={posts} 
       handleDelete={handleDelete}
       />}/>
      
      </Route> // nested route for creating new posts
         
       <Route path="about" element={<About />}/>
      <Route path="*" component={<Missing />}/>
     </Route>
  </Routes>
             
      
    </>
  )
}

export default App
