// import React, { useState, useEffect } from 'react';
// import './styles.css';
// import SplashScreen from './components/SplashScreen';
// import AuthScreen from './components/AuthScreen';
// import MainContent from './components/MainContent';
// import { getToken, setToken } from './utils'; // Updated import path

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const token = getToken();
//     if (token) setIsAuthenticated(true);
//     setTimeout(() => setShowSplash(false), 3000);
//   }, []);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   if (showSplash) return <SplashScreen />;
//   return isAuthenticated ? (
//     <MainContent onLogout={handleLogout} />
//   ) : (
//     <AuthScreen onLogin={handleLogin} />
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './styles.css';
// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token management functions
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => {
//   if (token) localStorage.setItem('token', token);
//   else localStorage.removeItem('token');
// };

// // Components
// function SplashScreen() {
//   return (
//     <div className="splash-screen">
//       <h1>APKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">
//           <FontAwesomeIcon icon="sign-in-alt" /> Login
//         </button>
//       </form>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created! Please login.');
//       setTimeout(() => {
//         setToken(response.data.token);
//         onLogin(response.data.token);
//       }, 2000);
//     } catch (err) {
//       setError('Signup failed');
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Full Name"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProfilePic(e.target.files[0])}
//         />
//         <button type="submit">
//           <FontAwesomeIcon icon="user-plus" /> Create Account
//         </button>
//       </form>
//     </div>
//   );
// }

// function AuthScreen({ onLogin }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="auth-container">
//       <button onClick={() => setShowLogin(!showLogin)}>
//         <FontAwesomeIcon icon="exchange-alt" />{' '}
//         {showLogin ? 'Switch to Signup' : 'Switch to Login'}
//       </button>
//       {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode }) {
//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
//       <button onClick={() => setIsDarkMode(!isDarkMode)}>
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1>APKA PAL</h1>
//       <ProfileSection onLogout={onLogout} />
//     </nav>
//   );
// }

// function ProfileSection({ onLogout }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = getToken();
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:3000/api/user/profile', {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err.response ? err.response.data : err.message);
//         }
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="profile-section">
//       {user && (
//         <div>
//           <img src={user.profilePic || '/default-avatar.png'} alt="Profile" />
//           <span>{user.name}</span>
//           <button onClick={onLogout}>
//             <FontAwesomeIcon icon="sign-out-alt" /> Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function ContentSelector({ setShowUploadPopup, setSelectedCategory }) {
//   const [contents, setContents] = useState([]);

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content');
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err.response ? err.response.data : err.message);
//       }
//     };
//     fetchContents();
//   }, []);

//   const handleUploadClick = (type) => {
//     setSelectedCategory(type);
//     setShowUploadPopup(true);
//   };

//   return (
//     <div className="content-selector">
//       <div className="plus-symbol" onClick={() => handleUploadClick('')}>
//         <FontAwesomeIcon icon="plus" />
//       </div>
//       <div className="content-options">
//         <button onClick={() => handleUploadClick('poem')}>
//           <FontAwesomeIcon icon="feather" /> Poems
//         </button>
//         <button onClick={() => handleUploadClick('blog')}>
//           <FontAwesomeIcon icon="pen" /> Blog
//         </button>
//         <button onClick={() => handleUploadClick('story')}>
//           <FontAwesomeIcon icon="book" /> Story
//         </button>
//         <button onClick={() => handleUploadClick('shayari')}>
//           <FontAwesomeIcon icon="poem" /> Shayari
//         </button>
//       </div>
//       <div className="content-list">
//         {contents
//           .filter((c) => !c.isDraft)
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//           .map((content) => (
//             <div key={content._id} className="content-item">
//               <h3>{content.title}</h3>
//               <p>{content.body.substring(0, 100)}...</p>
//               <span>{new Date(content.createdAt).toLocaleString()}</span>
//               <button>
//                 <FontAwesomeIcon icon="heart" /> {content.likes.length}
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// function ContentUploadPopup({ category, onClose }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('type', category);
//     formData.append('title', title);
//     formData.append('body', body);
//     formData.append('mood', mood);
//     if (image) formData.append('image', image);

//     try {
//       await axios.post('/api/content', formData, {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       onClose();
//     } catch (err) {
//       console.error('Upload error:', err.response ? err.response.data : err.message);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Upload {category || 'Content'}</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title"
//             required
//           />
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Content"
//             required
//           />
//           <select value={mood} onChange={(e) => setMood(e.target.value)}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <button type="submit">
//             <FontAwesomeIcon icon="upload" /> Publish
//           </button>
//           <button type="button" onClick={onClose}>
//             <FontAwesomeIcon icon="save" /> Save Draft
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showSplash, setShowSplash] = useState(true);
//   const [welcomeVisible, setWelcomeVisible] = useState(true);
//   const [user, setUser] = useState(null);
//   const [showUploadPopup, setShowUploadPopup] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       setIsAuthenticated(true);
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/user/profile', {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err.response ? err.response.data : err.message);
//           setIsAuthenticated(false); // Reset if token is invalid
//         }
//       };
//       fetchUser();
//     }
//     setTimeout(() => setShowSplash(false), 3000);
//   }, []);

//   useEffect(() => {
//     if (user && isAuthenticated) {
//       setTimeout(() => setWelcomeVisible(false), 3000);
//     }
//   }, [user, isAuthenticated]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err.response ? err.response.data : err.message);
//         setIsAuthenticated(false);
//       }
//     };
//     fetchUser();
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   if (showSplash) return <SplashScreen />;
//   if (!isAuthenticated) return <AuthScreen onLogin={handleLogin} />;
//   return (
//     <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
//       {welcomeVisible && user && (
//         <div className="welcome-message">Welcome {user.name.split(' ')[0]}!</div>
//       )}
//       <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
//       <div className="main-content">
//         <ContentSelector
//           setShowUploadPopup={setShowUploadPopup}
//           setSelectedCategory={setSelectedCategory}
//         />
//         {showUploadPopup && (
//           <ContentUploadPopup
//             category={selectedCategory}
//             onClose={() => setShowUploadPopup(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token and theme management
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
// const getTheme = () => localStorage.getItem('theme') || 'light';
// const setTheme = (theme) => {
//   localStorage.setItem('theme', theme);
//   document.body.className = theme;
// };

// function SplashScreen({ setShowSplash }) {
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 2500);
//     return () => clearTimeout(timer);
//   }, [setShowSplash]);

//   return (
//     <div className="splash-screen">
//       <h1>APKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <div className="toast error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created, login again');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <div className="toast error">{error}</div>}
//       {success && <div className="toast success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//         {preview && <img src={preview} alt="Preview" className="profile-preview" />}
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
//         </button>
//       </form>
//     </div>
//   );
// }

// function AuthPage({ onLogin }) {
//   const [showLogin, setShowLogin] = useState(true);
//   const navigate = useNavigate();

//   return (
//     <div className="auth-container">
//       <button onClick={() => setShowLogin(!showLogin)} className="switch-btn">
//         <FontAwesomeIcon icon="exchange-alt" /> {showLogin ? 'Switch to Signup' : 'Switch to Login'}
//       </button>
//       {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode, user }) {
//   const navigate = useNavigate();

//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
//       <button onClick={() => setIsDarkMode(!isDarkMode)} className="mode-btn">
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1 className="navbar-title">APKA PAL</h1>
//       {user && (
//         <div className="profile-section" onClick={() => navigate('/profile')}>
//           <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" style={{ position: 'absolute', top: '10px', right: '20px' }} />
//         </div>
//       )}
//     </nav>
//   );
// }

// function ContentSelector({ setSelectedCategory, user }) {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => setShowWelcome(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem('selectedCategory', category);
//     navigate(`/${category}`);
//   };

//   return (
//     <div className="content-selector">
//       {showWelcome && (
//         <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
//           Welcome {user?.name.split(' ')[0]}!
//         </div>
//       )}
//       {!showWelcome && (
//         <div className="plus-container center">
//           <div onClick={() => handleSelect('poem')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Poem</span>
//           </div>
//           <div onClick={() => handleSelect('shayari')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Shayari</span>
//           </div>
//           <div onClick={() => handleSelect('blog')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Blog</span>
//           </div>
//           <div onClick={() => handleSelect('story')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Story</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ContentFeed({ category }) {
//   const [contents, setContents] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err);
//       }
//     };
//     fetchContents();
//   }, [category]);

//   const handleLike = async (contentId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//   };

//   return (
//     <div className="content-feed">
//       {contents.map((content) => (
//         <div key={content._id} className="content-item">
//           <h3>{content.title || 'Untitled'} by {content.user.name}</h3>
//           <p>{content.body.substring(0, 100)}...</p>
//           {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//           <span>{new Date(content.createdAt).toLocaleString()}</span>
//           <button onClick={() => handleLike(content._id)}>
//             <FontAwesomeIcon icon="heart" /> {content.likes.length}
//           </button>
//         </div>
//       ))}
//       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
//         <FontAwesomeIcon icon="plus" />
//       </button>
//       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} />}
//     </div>
//   );
// }

// function UploadContainer({ category, onClose }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', false);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate(`/${category}`);
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content uploaded!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Upload failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate('/profile');
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft saved!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Save draft error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Save failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-overlay">
//       <div className="upload-container-large" style={{ backdropFilter: 'blur(10px)' }}>
//         <h2>Upload {category}</h2>
//         <form>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" disabled={loading} />
//           <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Content" required disabled={loading}></textarea>
//           <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           {(category === 'blog' || category === 'story') && (
//             <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
//           )}
//           <div className="button-group">
//             <button type="button" onClick={handleSubmit} disabled={loading}>
//               <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
//             </button>
//             <button type="button" onClick={handleSaveDraft} disabled={loading}>
//               <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ProfilePage({ selectedCategory, setSelectedCategory }) {
//   const [user, setUser] = useState(null);
//   const [uploadedContents, setUploadedContents] = useState([]);
//   const [draftContents, setDraftContents] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/profile', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err);
//         navigate('/login');
//       }
//     };

//     const fetchUserContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setUploadedContents(contents.filter(c => !c.isDraft));
//         setDraftContents(contents.filter(c => c.isDraft));
//       } catch (err) {
//         console.error('Fetch user contents error:', err);
//       }
//     };

//     fetchUser();
//     fetchUserContents();
//   }, [navigate]);

//   const handleDelete = async (id, isDraft) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/content/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
//       else setUploadedContents(uploadedContents.filter(c => c._id !== id));
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content deleted!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Delete error:', err.response?.data);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = err.response?.data?.message || 'Delete failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleEdit = (draft) => {
//     setEditDraft(draft);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     if (!editDraft) return;
//     const formData = new FormData();
//     formData.append('title', editDraft.title);
//     formData.append('body', editDraft.body);
//     formData.append('mood', editDraft.mood);
//     formData.append('isDraft', true);

//     try {
//       await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditDraft(null);
//       const fetchUserContents = async () => {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setDraftContents(contents.filter(c => c.isDraft));
//       };
//       fetchUserContents();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft updated!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Edit error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Edit failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     navigate('/login');
//   };

//   return (
//     <div className="profile-page">
//       {user ? (
//         <div className="profile-screen">
//           <div className="profile-header">
//             <h1>Profile</h1>
//             <button onClick={handleLogout} className="logout-btn" style={{ position: 'absolute', top: '10px', right: '20px' }}>
//               <FontAwesomeIcon icon="sign-out-alt" /> Logout
//             </button>
//           </div>
//           <div className="profile-details">
//             <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             <p>Joined: {new Date(user.createdAt).toLocaleString()}</p>
//           </div>
//           <div className="content-sections">
//             <h3>Uploaded Contents</h3>
//             <select onChange={handleCategoryChange} value={selectedCategory || ''}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {uploadedContents.length > 0 ? (
//               uploadedContents
//                 .filter(content => !selectedCategory || content.type === selectedCategory)
//                 .map((content) => (
//                   <div key={content._id} className="content-item">
//                     <h4>{content.title || 'Untitled'}</h4>
//                     <p>{content.body.substring(0, 100)}...</p>
//                     {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                     <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
//                   </div>
//                 ))
//             ) : (
//               <p>No uploaded contents yet.</p>
//             )}
//             <h3>Saved Drafts</h3>
//             <select onChange={handleCategoryChange} value={selectedCategory || ''}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {draftContents.length > 0 ? (
//               draftContents
//                 .filter(content => !selectedCategory || content.type === selectedCategory)
//                 .map((content) => (
//                   <div key={content._id} className="content-item">
//                     <h4>{content.title || 'Untitled'}</h4>
//                     <p>{content.body.substring(0, 100)}...</p>
//                     {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                     <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
//                     <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
//                   </div>
//                 ))
//             ) : (
//               <p>No saved drafts yet.</p>
//             )}
//             {editDraft && (
//               <div className="upload-overlay">
//                 <div className="upload-container-large" style={{ backdropFilter: 'blur(10px)' }}>
//                   <h2>Edit Draft</h2>
//                   <form onSubmit={handleSaveEdit}>
//                     <input
//                       type="text"
//                       value={editDraft.title || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
//                       placeholder="Title (optional)"
//                     />
//                     <textarea
//                       value={editDraft.body || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
//                       placeholder="Content"
//                       required
//                     />
//                     <select
//                       value={editDraft.mood || 'happy'}
//                       onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
//                     >
//                       <option value="happy">Happy</option>
//                       <option value="sad">Sad</option>
//                       <option value="love">Love</option>
//                       <option value="anxious">Anxious</option>
//                       <option value="calm">Calm</option>
//                       <option value="thoughtful">Thoughtful</option>
//                     </select>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={() => setEditDraft(null)}>Cancel</button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
//   const [showSplash, setShowSplash] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//   const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');

//   useEffect(() => {
//     setTheme(isDarkMode ? 'dark' : 'light');
//     if (isAuthenticated) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/user/profile', {
//             headers: { Authorization: `Bearer ${getToken()}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err);
//           setIsAuthenticated(false);
//           setToken(null);
//           setUser(null);
//           setShowSplash(false);
//         }
//       };
//       fetchUser();
//     } else {
//       setShowSplash(false);
//     }
//   }, [isAuthenticated, isDarkMode]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     setShowSplash(false);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
//       {!isAuthenticated && !showSplash && <AuthPage onLogin={handleLogin} />}
//       {isAuthenticated && (
//         <>
//           <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} />
//           <Routes>
//             <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
//             <Route path="/:category" element={<ContentFeed category={selectedCategory || 'poem'} />} />
//             <Route path="/profile" element={<ProfilePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
//             <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
//           </Routes>
//           <div className="toast success"></div>
//           <div className="toast error"></div>
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;
//////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token and theme management
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
// const getTheme = () => localStorage.getItem('theme') || 'light';
// const setTheme = (theme) => {
//   localStorage.setItem('theme', theme);
//   document.body.className = theme;
// };

// function SplashScreen({ setShowSplash }) {
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 3000); // Extended to 3 seconds
//     return () => clearTimeout(timer);
//   }, [setShowSplash]);

//   return (
//     <div className="splash-screen">
//       <h1>APKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid ID or Password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <div className="toast error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p className="signup-link">
//         New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
//       </p>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created, login again');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <div className="toast error">{error}</div>}
//       {success && <div className="toast success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//         {preview && <img src={preview} alt="Preview" className="profile-preview" />}
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
//         </button>
//       </form>
//     </div>
//   );
// }

// function AuthPage({ onLogin }) {
//   return (
//     <div className="auth-container">
//       {onLogin && <Login onLogin={onLogin} />}
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode, user }) {
//   const navigate = useNavigate();

//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
//       <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1 className="navbar-title">APKA PAL</h1>
//       {user && (
//         <div className="profile-section" onClick={() => navigate('/profile')}>
//           <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//         </div>
//       )}
//     </nav>
//   );
// }

// function ContentSelector({ setSelectedCategory, user }) {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
//       const timer = setTimeout(() => {
//         setShowWelcome(false);
//         localStorage.setItem('welcomeShown', 'true');
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowWelcome(false);
//     }
//   }, [location.pathname]);

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem('selectedCategory', category);
//     navigate(`/${category}`);
//   };

//   return (
//     <div className="content-selector">
//       {showWelcome && (
//         <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
//           Welcome {user?.name.split(' ')[0]}!
//         </div>
//       )}
//       {!showWelcome && (
//         <div className="plus-container">
//           <div className="plus-card" onClick={() => handleSelect('poem')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Poem</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('shayari')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Shayari</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('blog')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Blog</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('story')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Story</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ContentFeed({ category }) {
//   const [contents, setContents] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err);
//       }
//     };
//     fetchContents();
//   }, [category]);

//   const handleLike = async (contentId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//   };

//   return (
//     <div className="content-feed">
//       {contents.map((content) => (
//         <div key={content._id} className="content-item">
//           <h3>{content.title || 'Untitled'} by {content.user.name}</h3>
//           <p>{content.body.substring(0, 100)}...</p>
//           {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//           <span>{new Date(content.createdAt).toLocaleString()}</span>
//           <button onClick={() => handleLike(content._id)}>
//             <FontAwesomeIcon icon="heart" /> {content.likes.length}
//           </button>
//         </div>
//       ))}
//       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
//         <FontAwesomeIcon icon="plus" />
//       </button>
//       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} />}
//     </div>
//   );
// }

// function UploadContainer({ category, onClose }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', false);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate(`/${category}`);
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content uploaded!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Upload failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate('/profile');
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft saved!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Save draft error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Save failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-overlay">
//       <div className="upload-container-large" style={{ backdropFilter: 'blur(10px)' }}>
//         <h2>Upload {category}</h2>
//         <form>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" disabled={loading} />
//           <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Content" required disabled={loading}></textarea>
//           <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           {(category === 'blog' || category === 'story') && (
//             <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
//           )}
//           <div className="button-group">
//             <button type="button" onClick={handleSubmit} disabled={loading}>
//               <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
//             </button>
//             <button type="button" onClick={handleSaveDraft} disabled={loading}>
//               <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ProfilePage({ setIsAuthenticated, selectedCategory }) {
//   const [user, setUser] = useState(null);
//   const [uploadedContents, setUploadedContents] = useState([]);
//   const [draftContents, setDraftContents] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const [uploadedFilter, setUploadedFilter] = useState('');
//   const [draftFilter, setDraftFilter] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/profile', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err);
//         navigate('/login');
//       }
//     };

//     const fetchUserContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setUploadedContents(contents.filter(c => !c.isDraft));
//         setDraftContents(contents.filter(c => c.isDraft));
//       } catch (err) {
//         console.error('Fetch user contents error:', err);
//       }
//     };

//     fetchUser();
//     fetchUserContents();
//   }, [navigate]);

//   const handleDelete = async (id, isDraft) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/content/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
//       else setUploadedContents(uploadedContents.filter(c => c._id !== id));
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content deleted!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Delete error:', err.response?.data);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = err.response?.data?.message || 'Delete failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleEdit = (draft) => {
//     setEditDraft(draft);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     if (!editDraft) return;
//     const formData = new FormData();
//     formData.append('title', editDraft.title);
//     formData.append('body', editDraft.body);
//     formData.append('mood', editDraft.mood);
//     formData.append('isDraft', true);

//     try {
//       await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditDraft(null);
//       const fetchUserContents = async () => {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setDraftContents(contents.filter(c => c.isDraft));
//       };
//       fetchUserContents();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft updated!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Edit error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Edit failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     navigate('/login');
//   };

//   return (
//     <div className="profile-page">
//       {user ? (
//         <div className="profile-screen">
//           <div className="profile-header">
//             <h1>Profile</h1>
//             <button onClick={handleLogout} className="logout-btn">
//               <FontAwesomeIcon icon="sign-out-alt" /> Logout
//             </button>
//           </div>
//           <div className="profile-details">
//             <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             <p>Joined: {new Date(user.createdAt).toLocaleString()}</p>
//           </div>
//           <div className="content-sections">
//             <h3>Uploaded Contents</h3>
//             <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {uploadedContents.length > 0 ? (
//               uploadedContents
//                 .filter(content => !uploadedFilter || content.type === uploadedFilter)
//                 .map((content) => (
//                   <div key={content._id} className="content-item">
//                     <h4>{content.title || 'Untitled'}</h4>
//                     <p>{content.body.substring(0, 100)}...</p>
//                     {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                     <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
//                   </div>
//                 ))
//             ) : (
//               <p>No uploaded contents yet.</p>
//             )}
//             <h3>Saved Drafts</h3>
//             <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {draftContents.length > 0 ? (
//               draftContents
//                 .filter(content => !draftFilter || content.type === draftFilter)
//                 .map((content) => (
//                   <div key={content._id} className="content-item">
//                     <h4>{content.title || 'Untitled'}</h4>
//                     <p>{content.body.substring(0, 100)}...</p>
//                     {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                     <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
//                     <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
//                   </div>
//                 ))
//             ) : (
//               <p>No saved drafts yet.</p>
//             )}
//             {editDraft && (
//               <div className="upload-overlay">
//                 <div className="upload-container-large" style={{ backdropFilter: 'blur(10px)' }}>
//                   <h2>Edit Draft</h2>
//                   <form onSubmit={handleSaveEdit}>
//                     <input
//                       type="text"
//                       value={editDraft.title || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
//                       placeholder="Title (optional)"
//                     />
//                     <textarea
//                       value={editDraft.body || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
//                       placeholder="Content"
//                       required
//                     />
//                     <select
//                       value={editDraft.mood || 'happy'}
//                       onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
//                     >
//                       <option value="happy">Happy</option>
//                       <option value="sad">Sad</option>
//                       <option value="love">Love</option>
//                       <option value="anxious">Anxious</option>
//                       <option value="calm">Calm</option>
//                       <option value="thoughtful">Thoughtful</option>
//                     </select>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={() => setEditDraft(null)}>Cancel</button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
//   const [showSplash, setShowSplash] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//   const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');

//   useEffect(() => {
//     setTheme(isDarkMode ? 'dark' : 'light');
//     if (isAuthenticated) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/user/profile', {
//             headers: { Authorization: `Bearer ${getToken()}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err);
//           setIsAuthenticated(false);
//           setToken(null);
//           setUser(null);
//           setShowSplash(false);
//         }
//       };
//       fetchUser();
//     } else {
//       setShowSplash(false);
//     }
//   }, [isAuthenticated, isDarkMode]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     setShowSplash(false);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
//       {!isAuthenticated && !showSplash && <AuthPage onLogin={handleLogin} />}
//       {isAuthenticated && (
//         <>
//           <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} />
//           <Routes>
//             <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
//             <Route path="/:category" element={<ContentFeed category={selectedCategory || 'poem'} />} />
//             <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
//             <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
//           </Routes>
//           <div className="toast success"></div>
//           <div className="toast error"></div>
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;

/////////////////////////////////////////////////
///////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token and theme management
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
// const getTheme = () => localStorage.getItem('theme') || 'light';
// const setTheme = (theme) => {
//   localStorage.setItem('theme', theme);
//   document.body.className = theme;
// };

// function SplashScreen({ setShowSplash }) {
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 3000);
//     return () => clearTimeout(timer);
//   }, [setShowSplash]);

//   return (
//     <div className="splash-screen">
//       <h1>APKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid ID or Password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <div className="toast error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p className="signup-link">
//         New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
//       </p>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created, redirecting to login...');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <div className="toast error">{error}</div>}
//       {success && <div className="toast success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//         {preview && <img src={preview} alt="Preview" className="profile-preview" />}
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
//         </button>
//       </form>
//       <p className="back-link">
//         <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
//       </p>
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode, user }) {
//   const navigate = useNavigate();

//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
//       <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1 className="navbar-title">APKA PAL</h1>
//       {user && (
//         <div className="profile-section" onClick={() => navigate('/profile')}>
//           <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//         </div>
//       )}
//     </nav>
//   );
// }

// function ContentSelector({ setSelectedCategory, user }) {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
//       const timer = setTimeout(() => {
//         setShowWelcome(false);
//         localStorage.setItem('welcomeShown', 'true');
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowWelcome(false);
//     }
//   }, [location.pathname]);

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem('selectedCategory', category);
//     navigate(`/${category}`);
//   };

//   return (
//     <div className={`content-selector ${getTheme()}`}>
//       {showWelcome && (
//         <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
//           Welcome {user?.name.split(' ')[0]}!
//         </div>
//       )}
//       {!showWelcome && (
//         <div className="plus-container">
//           <div className="plus-card" onClick={() => handleSelect('poem')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Poem</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('shayari')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Shayari</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('blog')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Blog</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('story')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Story</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ContentFeed({ category }) {
//   const [contents, setContents] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const [expandedContent, setExpandedContent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err);
//         navigate('/login'); // Redirect to login on error
//       }
//     };
//     fetchContents();
//   }, [category, navigate]);

//   const handleLike = async (contentId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   // Count words in content
//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`content-feed ${getTheme()}`}>
//       {contents.length > 0 ? (
//         contents.map((content) => {
//           const wordCount = countWords(content.body);
//           const shouldShowFull = wordCount <= 60;
//           const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//           return (
//             <div key={content._id} className={`content-item ${getTheme()}`}>
//               <h3>{content.user.name}</h3>
//               {content.title && <h4>{content.title}</h4>}
//               <p>{displayContent}</p>
//               {!shouldShowFull && wordCount > 60 && (
//                 <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                   {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                 </button>
//               )}
//               {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//               <div className="content-footer">
//                 <span>{new Date(content.createdAt).toLocaleString()}</span>
//                 <button onClick={() => handleLike(content._id)}>
//                   <FontAwesomeIcon icon="heart" /> {content.likes.length}
//                 </button>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No contents available.</p>
//       )}
//       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
//         <FontAwesomeIcon icon="plus" />
//       </button>
//       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} />}
//     </div>
//   );
// }

// function UploadContainer({ category, onClose }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', false);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate(`/${category}`);
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content uploaded!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Upload failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate('/profile');
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft saved!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Save draft error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Save failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-overlay">
//       <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//         <button className="close-btn" onClick={onClose}>
//           <FontAwesomeIcon icon="times" />
//         </button>
//         <h2>Upload {category}</h2>
//         <form>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title (optional)"
//             disabled={loading}
//           />
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Content"
//             required
//             disabled={loading}
//             style={{ overflowY: 'auto', maxHeight: '300px' }}
//           />
//           <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           {(category === 'blog' || category === 'story') && (
//             <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
//           )}
//           <div className="button-group">
//             <button type="button" onClick={handleSubmit} disabled={loading}>
//               <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
//             </button>
//             <button type="button" onClick={handleSaveDraft} disabled={loading}>
//               <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ProfilePage({ setIsAuthenticated, selectedCategory }) {
//   const [user, setUser] = useState(null);
//   const [uploadedContents, setUploadedContents] = useState([]);
//   const [draftContents, setDraftContents] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const [uploadedFilter, setUploadedFilter] = useState('');
//   const [draftFilter, setDraftFilter] = useState('');
//   const [expandedContent, setExpandedContent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/user/profile', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err);
//         navigate('/login');
//       }
//     };

//     const fetchUserContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setUploadedContents(contents.filter(c => !c.isDraft));
//         setDraftContents(contents.filter(c => c.isDraft));
//       } catch (err) {
//         console.error('Fetch user contents error:', err);
//       }
//     };

//     fetchUser();
//     fetchUserContents();
//   }, [navigate]);

//   const handleDelete = async (id, isDraft) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/content/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
//       else setUploadedContents(uploadedContents.filter(c => c._id !== id));
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content deleted!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Delete error:', err.response?.data);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = err.response?.data?.message || 'Delete failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleEdit = (draft) => {
//     setEditDraft(draft);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     if (!editDraft) return;
//     const formData = new FormData();
//     formData.append('title', editDraft.title);
//     formData.append('body', editDraft.body);
//     formData.append('mood', editDraft.mood);
//     formData.append('isDraft', true);

//     try {
//       await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditDraft(null);
//       const fetchUserContents = async () => {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         const contents = response.data;
//         setDraftContents(contents.filter(c => c.isDraft));
//       };
//       fetchUserContents();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft updated!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Edit error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Edit failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     navigate('/login');
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   // Count words in content
//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`profile-page ${getTheme()}`}>
//       {user ? (
//         <div className={`profile-screen ${getTheme()}`}>
//           <div className="profile-header">
//             <h1>Profile</h1>
//             <button onClick={handleLogout} className="logout-btn">
//               <FontAwesomeIcon icon="sign-out-alt" /> Logout
//             </button>
//           </div>
//           <div className="profile-details">
//             <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//           </div>
//           <div className="content-sections">
//             <h3>Uploaded Contents</h3>
//             <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {uploadedContents.length > 0 ? (
//               uploadedContents
//                 .filter(content => !uploadedFilter || content.type === uploadedFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <h3>{content.user.name}</h3>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
//                       </div>
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No uploaded contents yet.</p>
//             )}
//             <h3>Saved Drafts</h3>
//             <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {draftContents.length > 0 ? (
//               draftContents
//                 .filter(content => !draftFilter || content.type === draftFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <h3>{content.user.name}</h3>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && <img src={`http://localhost:3000${content.image}`} alt="Content" className="content-image" />}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
//                         <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
//                       </div>
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No saved drafts yet.</p>
//             )}
//             {editDraft && (
//               <div className="upload-overlay">
//                 <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//                   <button className="close-btn" onClick={() => setEditDraft(null)}>
//                     <FontAwesomeIcon icon="times" />
//                   </button>
//                   <h2>Edit Draft</h2>
//                   <form onSubmit={handleSaveEdit}>
//                     <input
//                       type="text"
//                       value={editDraft.title || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
//                       placeholder="Title (optional)"
//                     />
//                     <textarea
//                       value={editDraft.body || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
//                       placeholder="Content"
//                       required
//                       style={{ overflowY: 'auto', maxHeight: '300px' }}
//                     />
//                     <select
//                       value={editDraft.mood || 'happy'}
//                       onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
//                     >
//                       <option value="happy">Happy</option>
//                       <option value="sad">Sad</option>
//                       <option value="love">Love</option>
//                       <option value="anxious">Anxious</option>
//                       <option value="calm">Calm</option>
//                       <option value="thoughtful">Thoughtful</option>
//                     </select>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={() => setEditDraft(null)}>Cancel</button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
//   const [showSplash, setShowSplash] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//   const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'poem'); // Default to 'poem'

//   useEffect(() => {
//     setTheme(isDarkMode ? 'dark' : 'light');
//     if (isAuthenticated) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/user/profile', {
//             headers: { Authorization: `Bearer ${getToken()}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err);
//           setIsAuthenticated(false);
//           setToken(null);
//           setUser(null);
//         }
//       };
//       fetchUser();
//     }
//   }, [isAuthenticated, isDarkMode]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     setShowSplash(false);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
//       {!showSplash && (
//         <>
//           {!isAuthenticated ? (
//             <div className="auth-container">
//               <Routes>
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//                 <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Default to login for root */}
//                 <Route path="*" element={<Login onLogin={handleLogin} />} /> {/* Catch-all for unauthenticated */}
//               </Routes>
//             </div>
//           ) : (
//             <>
//               <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} />
//               <Routes>
//                 <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
//                 <Route path="/:category" element={<ContentFeed category={selectedCategory} />} />
//                 <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//               </Routes>
//               <div className="toast success"></div>
//               <div className="toast error"></div>
//             </>
//           )}
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;

//////////////////////////
// perfect without plus 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token and theme management
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
// const getTheme = () => localStorage.getItem('theme') || 'light';
// const setTheme = (theme) => {
//   localStorage.setItem('theme', theme);
//   document.body.className = theme;
// };

// function SplashScreen({ setShowSplash }) {
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 3000);
//     return () => clearTimeout(timer);
//   }, [setShowSplash]);

//   return (
//     <div className="splash-screen">
//       <h1>APKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid ID or Password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <div className="toast error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p className="signup-link">
//         New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
//       </p>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created, redirecting to login...');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <div className="toast error">{error}</div>}
//       {success && <div className="toast success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//         {preview && <img src={preview} alt="Preview" className="profile-preview" />}
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
//         </button>
//       </form>
//       <p className="back-link">
//         <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
//       </p>
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode, user }) {
//   const navigate = useNavigate();

//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
//       <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1 className="navbar-title">APKA PAL</h1>
//       {user && (
//         <div className="profile-section" onClick={() => navigate('/profile')}>
//           <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//         </div>
//       )}
//     </nav>
//   );
// }

// function ContentSelector({ setSelectedCategory, user }) {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
//       const timer = setTimeout(() => {
//         setShowWelcome(false);
//         localStorage.setItem('welcomeShown', 'true');
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowWelcome(false);
//     }
//   }, [location.pathname]);

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem('selectedCategory', category);
//     navigate(`/${category}`);
//   };

//   return (
//     <div className={`content-selector ${getTheme()}`}>
//       {showWelcome && (
//         <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
//           Welcome {user?.name.split(' ')[0]}!
//         </div>
//       )}
//       {!showWelcome && (
//         <div className="plus-container">
//           <div className="plus-card" onClick={() => handleSelect('poem')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Poem</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('shayari')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Shayari</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('blog')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Blog</span>
//           </div>
//           <div className="plus-card" onClick={() => handleSelect('story')}>
//             <FontAwesomeIcon icon="plus" className="plus-icon" />
//             <span>Story</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ContentFeed({ category }) {
//   const [contents, setContents] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const [expandedContent, setExpandedContent] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err);
//         navigate('/login');
//       }
//     };
//     fetchContents();
//   }, [category, navigate]);

//   const handleLike = async (contentId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   const refreshContent = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Refresh contents error:', err);
//       navigate('/login');
//     }
//   };

//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`content-feed ${getTheme()}`}>
//       {contents.length > 0 ? (
//         contents.map((content) => {
//           const wordCount = countWords(content.body);
//           const shouldShowFull = wordCount <= 60;
//           const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//           return (
//             <div key={content._id} className={`content-item ${getTheme()}`}>
//               <div className="content-header">
//                 {/* Removed profile image, keeping only username */}
//                 <h3>{content.user?.name || 'Unknown'}</h3>
//               </div>
//               {content.title && <h4>{content.title}</h4>}
//               <p>{displayContent}</p>
//               {!shouldShowFull && wordCount > 60 && (
//                 <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                   {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                 </button>
//               )}
//               {content.image && (
//                 <img
//                   src={`http://localhost:3000${content.image}`}
//                   alt="Content"
//                   className="content-image"
//                   onClick={() => setShowImageModal(content._id)}
//                 />
//               )}
//               <div className="content-footer">
//                 <span>{new Date(content.createdAt).toLocaleString()}</span>
//                 <button onClick={() => handleLike(content._id)}>
//                   <FontAwesomeIcon icon="heart" /> {content.likes.length}
//                 </button>
//               </div>
//               {showImageModal === content._id && content.image && (
//                 <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
//                   <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                     <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
//                       <FontAwesomeIcon icon="times" />
//                     </button>
//                     <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })
//       ) : (
//         <p>No contents available.</p>
//       )}
//       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
//         <FontAwesomeIcon icon="plus" />
//       </button>
//       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} onUploadSuccess={refreshContent} />}
//     </div>
//   );
// }

// function UploadContainer({ category, onClose, onUploadSuccess }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', false);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate(`/${category}`);
//       if (onUploadSuccess) onUploadSuccess();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content uploaded!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Upload failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate('/profile');
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft saved!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Save draft error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Save failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-overlay">
//       <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//         <button className="close-btn" onClick={onClose}>
//           <FontAwesomeIcon icon="times" />
//         </button>
//         <h2>Upload {category}</h2>
//         <form>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title (optional)"
//             disabled={loading}
//           />
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Content"
//             required
//             disabled={loading}
//             style={{ overflowY: 'auto', maxHeight: '300px' }}
//           />
//           <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           {(category === 'blog' || category === 'story') && (
//             <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
//           )}
//           <div className="button-group">
//             <button type="button" onClick={handleSubmit} disabled={loading}>
//               <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
//             </button>
//             <button type="button" onClick={handleSaveDraft} disabled={loading}>
//               <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ProfilePage({ setIsAuthenticated, selectedCategory }) {
//   const [user, setUser] = useState(null);
//   const [uploadedContents, setUploadedContents] = useState([]);
//   const [draftContents, setDraftContents] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const [uploadedFilter, setUploadedFilter] = useState('');
//   const [draftFilter, setDraftFilter] = useState('');
//   const [expandedContent, setExpandedContent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err);
//         navigate('/login');
//       }
//     };

//     const fetchUserContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUploadedContents(response.data.filter(c => !c.isDraft));
//         setDraftContents(response.data.filter(c => c.isDraft));
//       } catch (err) {
//         console.error('Fetch user contents error:', err);
//       }
//     };

//     fetchUser();
//     fetchUserContents();
//   }, [navigate]);

//   const handleDelete = async (id, isDraft) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/content/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
//       else setUploadedContents(uploadedContents.filter(c => c._id !== id));
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content deleted!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Delete error:', err.response?.data);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = err.response?.data?.message || 'Delete failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleEdit = (draft) => {
//     setEditDraft(draft);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     if (!editDraft) return;
//     const formData = new FormData();
//     formData.append('title', editDraft.title);
//     formData.append('body', editDraft.body);
//     formData.append('mood', editDraft.mood);
//     formData.append('isDraft', true);

//     try {
//       await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditDraft(null);
//       const fetchUserContents = async () => {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setDraftContents(response.data.filter(c => c.isDraft));
//       };
//       fetchUserContents();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft updated!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Edit error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Edit failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     navigate('/login');
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`profile-page ${getTheme()}`}>
//       {user ? (
//         <div className={`profile-screen ${getTheme()}`}>
//           <div className="profile-header">
//             <h1>Profile</h1>
//             <button onClick={handleLogout} className="logout-btn">
//               <FontAwesomeIcon icon="sign-out-alt" /> Logout
//             </button>
//           </div>
//           <div className="profile-details">
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             {user.profilePic && <img src={`http://localhost:3000${user.profilePic}`} alt="Profile" className="profile-img" />}
//           </div>
//           <div className="content-sections">
//             <h3>Uploaded Contents</h3>
//             <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {uploadedContents.length > 0 ? (
//               uploadedContents
//                 .filter(content => !uploadedFilter || content.type === uploadedFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <div className="content-header">
//                         {/* Removed username from content header */}
//                       </div>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && (
//                         <img
//                           src={`http://localhost:3000${content.image}`}
//                           alt="Content"
//                           className="content-image"
//                           onClick={() => setExpandedContent(content._id)}
//                         />
//                       )}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
//                       </div>
//                       {expandedContent === content._id && content.image && (
//                         <div className="image-modal-overlay" onClick={() => setExpandedContent(null)}>
//                           <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                             <button className="close-modal-btn" onClick={() => setExpandedContent(null)}>
//                               <FontAwesomeIcon icon="times" />
//                             </button>
//                             <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No uploaded contents yet.</p>
//             )}
//             <h3>Saved Drafts</h3>
//             <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {draftContents.length > 0 ? (
//               draftContents
//                 .filter(content => !draftFilter || content.type === draftFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <div className="content-header">
//                         {/* Removed username from content header */}
//                       </div>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && (
//                         <img
//                           src={`http://localhost:3000${content.image}`}
//                           alt="Content"
//                           className="content-image"
//                           onClick={() => setExpandedContent(content._id)}
//                         />
//                       )}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
//                         <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
//                       </div>
//                       {expandedContent === content._id && content.image && (
//                         <div className="image-modal-overlay" onClick={() => setExpandedContent(null)}>
//                           <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                             <button className="close-modal-btn" onClick={() => setExpandedContent(null)}>
//                               <FontAwesomeIcon icon="times" />
//                             </button>
//                             <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No saved drafts yet.</p>
//             )}
//             {editDraft && (
//               <div className="upload-overlay">
//                 <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//                   <button className="close-btn" onClick={() => setEditDraft(null)}>
//                     <FontAwesomeIcon icon="times" />
//                   </button>
//                   <h2>Edit Draft</h2>
//                   <form onSubmit={handleSaveEdit}>
//                     <input
//                       type="text"
//                       value={editDraft.title || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
//                       placeholder="Title (optional)"
//                     />
//                     <textarea
//                       value={editDraft.body || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
//                       placeholder="Content"
//                       required
//                       style={{ overflowY: 'auto', maxHeight: '300px' }}
//                     />
//                     <select
//                       value={editDraft.mood || 'happy'}
//                       onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
//                     >
//                       <option value="happy">Happy</option>
//                       <option value="sad">Sad</option>
//                       <option value="love">Love</option>
//                       <option value="anxious">Anxious</option>
//                       <option value="calm">Calm</option>
//                       <option value="thoughtful">Thoughtful</option>
//                     </select>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={() => setEditDraft(null)}>Cancel</button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
//   const [showSplash, setShowSplash] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//   const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'poem');

//   useEffect(() => {
//     setTheme(isDarkMode ? 'dark' : 'light');
//     if (isAuthenticated) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/auth/profile', {
//             headers: { Authorization: `Bearer ${getToken()}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err);
//           setIsAuthenticated(false);
//           setToken(null);
//           setUser(null);
//         }
//       };
//       fetchUser();
//     }
//   }, [isAuthenticated, isDarkMode]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     setShowSplash(false);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
//       {!showSplash && (
//         <>
//           {!isAuthenticated ? (
//             <div className="auth-container">
//               <Routes>
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//                 <Route path="/" element={<Login onLogin={handleLogin} />} />
//                 <Route path="*" element={<Login onLogin={handleLogin} />} />
//               </Routes>
//             </div>
//           ) : (
//             <>
//               <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} />
//               <Routes>
//                 <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
//                 <Route path="/:category" element={<ContentFeed category={selectedCategory} />} />
//                 <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//               </Routes>
//               <div className="toast success"></div>
//               <div className="toast error"></div>
//             </>
//           )}
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import './index.css';

// // FontAwesome setup
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// library.add(fas);

// // Inline token and theme management
// const getToken = () => localStorage.getItem('token');
// const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
// const getTheme = () => localStorage.getItem('theme') || 'light';
// const setTheme = (theme) => {
//   localStorage.setItem('theme', theme);
//   document.body.className = theme;
// };

// function SplashScreen({ setShowSplash }) {
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 3000);
//     return () => clearTimeout(timer);
//   }, [setShowSplash]);

//   return (
//     <div className="splash-screen">
//       <h1>AAPKA PAL</h1>
//     </div>
//   );
// }

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setToken(response.data.token);
//       onLogin(response.data.token);
//       navigate('/');
//     } catch (err) {
//       setError('Invalid ID or Password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <div className="toast error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       <p className="signup-link">
//         New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
//       </p>
//     </div>
//   );
// }

// function Signup({ onLogin }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     if (profilePic) formData.append('profilePic', profilePic);

//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess('Account created, redirecting to login...');
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Signup</h2>
//       {error && <div className="toast error">{error}</div>}
//       {success && <div className="toast success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//         {preview && <img src={preview} alt="Preview" className="profile-preview" />}
//         <button type="submit" disabled={loading}>
//           <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
//         </button>
//       </form>
//       <p className="back-link">
//         <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
//       </p>
//     </div>
//   );
// }

// function Navbar({ onLogout, isDarkMode, setIsDarkMode, user }) {
//   const navigate = useNavigate();

//   return (
//     <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
//       <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
//         <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
//       </button>
//       <h1 className="navbar-title">AAPKA PAL</h1>
//       {user && (
//         <div className="profile-section" onClick={() => navigate('/profile')}>
//           <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
//         </div>
//       )}
//     </nav>
//   );
// }

// function ContentSelector({ setSelectedCategory, user }) {
//   const [showWelcome, setShowWelcome] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
//       const timer = setTimeout(() => {
//         setShowWelcome(false);
//         localStorage.setItem('welcomeShown', 'true');
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowWelcome(false);
//     }
//   }, [location.pathname]);

//   const handleSelect = (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem('selectedCategory', category);
//     navigate(`/${category}`);
//   };

//   const categories = [
//     { name: 'Poem', icon: 'feather', color: '#00C4B4' },
//     { name: 'Shayari', icon: 'pen', color: '#FF6B6B' },
//     { name: 'Blog', icon: 'book', color: '#4ECDC4' },
//     { name: 'Story', icon: 'scroll', color: '#45B7D1' },
//   ];

//   return (
//     <div className={`content-selector ${getTheme()}`}>
//       {showWelcome && (
//         <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
//           Welcome {user?.name.split(' ')[0]}!
//         </div>
//       )}
//       {!showWelcome && (
//         <div className="advanced-content-container">
//           <h2 className="category-title">
//             {Array.from("Explore Your Creativity").map((char, index) => (
//               <span key={index}>{char}</span>
//             ))}
//           </h2>
//           <div className="category-carousel">
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="category-card"
//                 onClick={() => handleSelect(category.name.toLowerCase())}
//                 style={{ backgroundColor: category.color, animationDelay: `${index * 0.1}s` }}
//               >
//                 <FontAwesomeIcon icon={category.icon} className="category-icon" />
//                 <span className="category-name">{category.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // function ContentFeed({ category }) {
// //   const [contents, setContents] = useState([]);
// //   const [showUpload, setShowUpload] = useState(false);
// //   const [expandedContent, setExpandedContent] = useState(null);
// //   const [showImageModal, setShowImageModal] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchContents = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
// //           headers: { Authorization: `Bearer ${getToken()}` },
// //         });
// //         setContents(response.data);
// //       } catch (err) {
// //         console.error('Fetch contents error:', err);
// //         navigate('/login');
// //       }
// //     };
// //     fetchContents();
// //   }, [category, navigate]);

// //   const handleLike = async (contentId) => {
// //     try {
// //       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
// //         headers: { Authorization: `Bearer ${getToken()}` },
// //       });
// //       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
// //         headers: { Authorization: `Bearer ${getToken()}` },
// //       });
// //       setContents(response.data);
// //     } catch (err) {
// //       console.error('Like error:', err);
// //     }
// //   };

// //   const toggleExpand = (contentId) => {
// //     setExpandedContent(expandedContent === contentId ? null : contentId);
// //   };

// //   const refreshContent = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
// //         headers: { Authorization: `Bearer ${getToken()}` },
// //       });
// //       setContents(response.data);
// //     } catch (err) {
// //       console.error('Refresh contents error:', err);
// //       navigate('/login');
// //     }
// //   };

// //   const countWords = (text) => text.trim().split(/\s+/).length;

// //   return (
// //     <div className={`content-feed ${getTheme()}`}>
// //       {contents.length > 0 ? (
// //         contents.map((content) => {
// //           const wordCount = countWords(content.body);
// //           const shouldShowFull = wordCount <= 60;
// //           const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

// //           return (
// //             <div key={content._id} className={`content-item ${getTheme()}`}>
// //               <div className="content-header">
// //                 <h3>{content.user?.name || 'Unknown'}</h3>
// //               </div>
// //               {content.title && <h4>{content.title}</h4>}
// //               <p>{displayContent}</p>
// //               {!shouldShowFull && wordCount > 60 && (
// //                 <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
// //                   {expandedContent === content._id ? 'Show Less' : 'Read More'}
// //                 </button>
// //               )}
// //               {content.image && (
// //                 <img
// //                   src={`http://localhost:3000${content.image}`}
// //                   alt="Content"
// //                   className="content-image"
// //                   onClick={() => setShowImageModal(content._id)}
// //                 />
// //               )}
// //               <div className="content-footer">
// //                 <span>{new Date(content.createdAt).toLocaleString()}</span>
// //                 <button onClick={() => handleLike(content._id)}>
// //                   <FontAwesomeIcon icon="heart" /> {content.likes.length}
// //                 </button>
// //               </div>
// //               {showImageModal === content._id && content.image && (
// //                 <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
// //                   <div className="image-modal" onClick={(e) => e.stopPropagation()}>
// //                     <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
// //                       <FontAwesomeIcon icon="times" />
// //                     </button>
// //                     <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })
// //       ) : (
// //         <p>No contents available.</p>
// //       )}
// //       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
// //         <FontAwesomeIcon icon="plus" />
// //       </button>
// //       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} onUploadSuccess={refreshContent} />}
// //     </div>
// //   );
// // }

// function ContentFeed({ category }) {
//   const [contents, setContents] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const [expandedContent, setExpandedContent] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(null); // State to control image modal
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setContents(response.data);
//       } catch (err) {
//         console.error('Fetch contents error:', err);
//         navigate('/login');
//       }
//     };
//     fetchContents();
//   }, [category, navigate]);

//   const handleLike = async (contentId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   const refreshContent = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       setContents(response.data);
//     } catch (err) {
//       console.error('Refresh contents error:', err);
//       navigate('/login');
//     }
//   };

//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`content-feed ${getTheme()}`}>
//       {contents.length > 0 ? (
//         contents.map((content) => {
//           const wordCount = countWords(content.body);
//           const shouldShowFull = wordCount <= 60;
//           const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//           return (
//             <div key={content._id} className={`content-item ${getTheme()}`}>
//               <div className="content-header">
//                 <h3>{content.user?.name || 'Unknown'}</h3>
//               </div>
//               {content.title && <h4>{content.title}</h4>}
//               <p>{displayContent}</p>
//               {!shouldShowFull && wordCount > 60 && (
//                 <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                   {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                 </button>
//               )}
//               {content.image && (
//                 <img
//                   src={`http://localhost:3000${content.image}`}
//                   alt="Content"
//                   className="content-image"
//                   onClick={() => setShowImageModal(content._id)} // Open modal on click
//                 />
//               )}
//               <div className="content-footer">
//                 <span>{new Date(content.createdAt).toLocaleString()}</span>
//                 <button onClick={() => handleLike(content._id)}>
//                   <FontAwesomeIcon icon="heart" /> {content.likes.length}
//                 </button>
//               </div>
//               {showImageModal === content._id && content.image && (
//                 <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
//                   <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                     <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
//                       <FontAwesomeIcon icon="times" />
//                     </button>
//                     <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })
//       ) : (
//         <p>No contents available.</p>
//       )}
//       <button className="bottom-plus" onClick={() => setShowUpload(true)}>
//         <FontAwesomeIcon icon="plus" />
//       </button>
//       {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} onUploadSuccess={refreshContent} />}
//     </div>
//   );
// }

// function UploadContainer({ category, onClose, onUploadSuccess }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [mood, setMood] = useState('happy');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', false);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate(`/${category}`);
//       if (onUploadSuccess) onUploadSuccess();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content uploaded!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Upload failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveDraft = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('type', category);
//     if (title) formData.append('title', title);
//     formData.append('body', body);
//     if (mood !== 'happy') formData.append('mood', mood);
//     if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
//     formData.append('isDraft', true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/content', formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setTitle('');
//       setBody('');
//       setMood('happy');
//       setImage(null);
//       onClose();
//       navigate('/profile');
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft saved!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Save draft error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Save failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-overlay">
//       <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//         <button className="close-btn" onClick={onClose}>
//           <FontAwesomeIcon icon="times" />
//         </button>
//         <h2>Upload {category}</h2>
//         <form>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title (optional)"
//             disabled={loading}
//           />
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="Content"
//             required
//             disabled={loading}
//             style={{ overflowY: 'auto', maxHeight: '300px' }}
//           />
//           <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="love">Love</option>
//             <option value="anxious">Anxious</option>
//             <option value="calm">Calm</option>
//             <option value="thoughtful">Thoughtful</option>
//           </select>
//           {(category === 'blog' || category === 'story') && (
//             <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
//           )}
//           <div className="button-group">
//             <button type="button" onClick={handleSubmit} disabled={loading}>
//               <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
//             </button>
//             <button type="button" onClick={handleSaveDraft} disabled={loading}>
//               <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ProfilePage({ setIsAuthenticated, selectedCategory }) {
//   const [user, setUser] = useState(null);
//   const [uploadedContents, setUploadedContents] = useState([]);
//   const [draftContents, setDraftContents] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const [uploadedFilter, setUploadedFilter] = useState('');
//   const [draftFilter, setDraftFilter] = useState('');
//   const [expandedContent, setExpandedContent] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Fetch user error:', err);
//         navigate('/login');
//       }
//     };

//     const fetchUserContents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setUploadedContents(response.data.filter(c => !c.isDraft));
//         setDraftContents(response.data.filter(c => c.isDraft));
//       } catch (err) {
//         console.error('Fetch user contents error:', err);
//       }
//     };

//     fetchUser();
//     fetchUserContents();
//   }, [navigate]);

//   const handleDelete = async (id, isDraft) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/content/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
//       else setUploadedContents(uploadedContents.filter(c => c._id !== id));
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Content deleted!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Delete error:', err.response?.data);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = err.response?.data?.message || 'Delete failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleEdit = (draft) => {
//     setEditDraft(draft);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     if (!editDraft) return;
//     const formData = new FormData();
//     formData.append('title', editDraft.title);
//     formData.append('body', editDraft.body);
//     formData.append('mood', editDraft.mood);
//     formData.append('isDraft', true);

//     try {
//       await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
//         headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
//       });
//       setEditDraft(null);
//       const fetchUserContents = async () => {
//         const response = await axios.get('http://localhost:3000/api/content/user', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setDraftContents(response.data.filter(c => c.isDraft));
//       };
//       fetchUserContents();
//       const toastSuccess = document.querySelector('.toast.success');
//       if (toastSuccess) {
//         toastSuccess.textContent = 'Draft updated!';
//         toastSuccess.classList.add('show');
//         setTimeout(() => toastSuccess.classList.remove('show'), 3000);
//       }
//     } catch (err) {
//       console.error('Edit error:', err);
//       const toastError = document.querySelector('.toast.error');
//       if (toastError) {
//         toastError.textContent = 'Edit failed';
//         toastError.classList.add('show');
//         setTimeout(() => toastError.classList.remove('show'), 3000);
//       }
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     navigate('/login');
//   };

//   const toggleExpand = (contentId) => {
//     setExpandedContent(expandedContent === contentId ? null : contentId);
//   };

//   const countWords = (text) => text.trim().split(/\s+/).length;

//   return (
//     <div className={`profile-page ${getTheme()}`}>
//       {user ? (
//         <div className={`profile-screen ${getTheme()}`}>
//           <div className="profile-header">
//             <h1>Profile</h1>
//             <button onClick={handleLogout} className="logout-btn">
//               <FontAwesomeIcon icon="sign-out-alt" /> Logout
//             </button>
//           </div>
//           <div className="profile-details">
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             {user.profilePic && <img src={`http://localhost:3000${user.profilePic}`} alt="Profile" className="profile-img" />}
//           </div>
//           <div className="content-sections">
//             <h3>Uploaded Contents</h3>
//             <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {uploadedContents.length > 0 ? (
//               uploadedContents
//                 .filter(content => !uploadedFilter || content.type === uploadedFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <div className="content-header">
//                         {/* Removed username from content header */}
//                       </div>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && (
//                         <img
//                           src={`http://localhost:3000${content.image}`}
//                           alt="Content"
//                           className="content-image"
//                           onClick={() => setExpandedContent(content._id)}
//                         />
//                       )}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
//                       </div>
//                       {expandedContent === content._id && content.image && (
//                         <div className="image-modal-overlay" onClick={() => setExpandedContent(null)}>
//                           <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                             <button className="close-modal-btn" onClick={() => setExpandedContent(null)}>
//                               <FontAwesomeIcon icon="times" />
//                             </button>
//                             <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No uploaded contents yet.</p>
//             )}
//             <h3>Saved Drafts</h3>
//             <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
//               <option value="">All Categories</option>
//               <option value="poem">Poem</option>
//               <option value="shayari">Shayari</option>
//               <option value="blog">Blog</option>
//               <option value="story">Story</option>
//             </select>
//             {draftContents.length > 0 ? (
//               draftContents
//                 .filter(content => !draftFilter || content.type === draftFilter)
//                 .map((content) => {
//                   const wordCount = countWords(content.body);
//                   const shouldShowFull = wordCount <= 60;
//                   const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

//                   return (
//                     <div key={content._id} className={`content-item ${getTheme()}`}>
//                       <div className="content-header">
//                         {/* Removed username from content header */}
//                       </div>
//                       {content.title && <h4>{content.title}</h4>}
//                       <p>{displayContent}</p>
//                       {!shouldShowFull && wordCount > 60 && (
//                         <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
//                           {expandedContent === content._id ? 'Show Less' : 'Read More'}
//                         </button>
//                       )}
//                       {content.image && (
//                         <img
//                           src={`http://localhost:3000${content.image}`}
//                           alt="Content"
//                           className="content-image"
//                           onClick={() => setExpandedContent(content._id)}
//                         />
//                       )}
//                       <div className="content-footer">
//                         <span>{new Date(content.createdAt).toLocaleString()}</span>
//                         <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
//                         <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
//                       </div>
//                       {expandedContent === content._id && content.image && (
//                         <div className="image-modal-overlay" onClick={() => setExpandedContent(null)}>
//                           <div className="image-modal" onClick={(e) => e.stopPropagation()}>
//                             <button className="close-modal-btn" onClick={() => setExpandedContent(null)}>
//                               <FontAwesomeIcon icon="times" />
//                             </button>
//                             <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//             ) : (
//               <p>No saved drafts yet.</p>
//             )}
//             {editDraft && (
//               <div className="upload-overlay">
//                 <div className={`upload-container-large ${getTheme()}`} style={{ backdropFilter: 'blur(10px)' }}>
//                   <button className="close-btn" onClick={() => setEditDraft(null)}>
//                     <FontAwesomeIcon icon="times" />
//                   </button>
//                   <h2>Edit Draft</h2>
//                   <form onSubmit={handleSaveEdit}>
//                     <input
//                       type="text"
//                       value={editDraft.title || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
//                       placeholder="Title (optional)"
//                     />
//                     <textarea
//                       value={editDraft.body || ''}
//                       onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
//                       placeholder="Content"
//                       required
//                       style={{ overflowY: 'auto', maxHeight: '300px' }}
//                     />
//                     <select
//                       value={editDraft.mood || 'happy'}
//                       onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
//                     >
//                       <option value="happy">Happy</option>
//                       <option value="sad">Sad</option>
//                       <option value="love">Love</option>
//                       <option value="anxious">Anxious</option>
//                       <option value="calm">Calm</option>
//                       <option value="thoughtful">Thoughtful</option>
//                     </select>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={() => setEditDraft(null)}>Cancel</button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
//   const [showSplash, setShowSplash] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//   const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'poem');

//   useEffect(() => {
//     setTheme(isDarkMode ? 'dark' : 'light');
//     if (isAuthenticated) {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/api/auth/profile', {
//             headers: { Authorization: `Bearer ${getToken()}` },
//           });
//           setUser(response.data.user);
//         } catch (err) {
//           console.error('Fetch user error:', err);
//           setIsAuthenticated(false);
//           setToken(null);
//           setUser(null);
//         }
//       };
//       fetchUser();
//     }
//   }, [isAuthenticated, isDarkMode]);

//   const handleLogin = (token) => {
//     setToken(token);
//     setIsAuthenticated(true);
//     setShowSplash(false);
//   };

//   const handleLogout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('selectedCategory');
//     localStorage.removeItem('welcomeShown');
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       {showSplash && <SplashScreen setShowSplash={setShowSplash} />}
//       {!showSplash && (
//         <>
//           {!isAuthenticated ? (
//             <div className="auth-container">
//               <Routes>
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//                 <Route path="/" element={<Login onLogin={handleLogin} />} />
//                 <Route path="*" element={<Login onLogin={handleLogin} />} />
//               </Routes>
//             </div>
//           ) : (
//             <>
//               <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} />
//               <Routes>
//                 <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
//                 <Route path="/:category" element={<ContentFeed category={selectedCategory} />} />
//                 <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
//                 <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
//               </Routes>
//               <div className="toast success"></div>
//               <div className="toast error"></div>
//             </>
//           )}
//         </>
//       )}
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

// Inline token and theme management
const getToken = () => localStorage.getItem('token');
const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.body.className = theme;
};

function SplashScreen({ setShowSplash }) {
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, [setShowSplash]);

  return (
    <div className="splash-screen">
      <h1>AAPKA PAL</h1>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setToken(response.data.token);
      onLogin(response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <div className="error-alert">{error}</div>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
          <button type="submit" disabled={loading}>
            <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
        </p>
      </div>
    </div>
  );
}

function Signup({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Account created, redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        {error && <div className="toast error">{error}</div>}
        {success && <div className="toast success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
          {preview && <img src={preview} alt="Preview" className="profile-preview" />}
          <button type="submit" disabled={loading}>
            <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
          </button>
        </form>
        <p className="back-link">
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
        </p>
      </div>
    </div>
  );
}

function Navbar({ onLogout, isDarkMode, setIsDarkMode, user, navigate }) {
  return (
    <nav className="navbar">
      <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
        <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
      </button>
      <h1 className="navbar-title">AAPKA PAL</h1>
      {user && (
        <div className="profile-section" onClick={() => navigate('/profile')}>
          <img src={user.profilePic ? `http://localhost:3000${user.profilePic}` : '/default-avatar.png'} alt="Profile" className="profile-img" />
        </div>
      )}
    </nav>
  );
}

function ContentSelector({ setSelectedCategory, user }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        localStorage.setItem('welcomeShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
    navigate(`/${category}`);
  };

  const categories = [
    { name: 'Poem', icon: 'feather', color: '#00C4B4' },
    { name: 'Shayari', icon: 'pen', color: '#FF6B6B' },
    { name: 'Blog', icon: 'book', color: '#4ECDC4' },
    { name: 'Story', icon: 'scroll', color: '#45B7D1' },
  ];

  return (
    <div className={`content-selector ${getTheme()}`}>
      {showWelcome && (
        <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
          Welcome {user?.name.split(' ')[0]}!
        </div>
      )}
      {!showWelcome && (
        <div className="advanced-content-container">
          <h2 className="category-title">
            {Array.from("Explore Your Creativity").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </h2>
          <div className="category-carousel">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => handleSelect(category.name.toLowerCase())}
                style={{ backgroundColor: category.color, animationDelay: `${index * 0.1}s` }}
              >
                <FontAwesomeIcon icon={category.icon} className="category-icon" />
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentFeed({ category }) {
  const [contents, setContents] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [expandedContent, setExpandedContent] = useState(null);
  const [showImageModal, setShowImageModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setContents(response.data);
      } catch (err) {
        console.error('Fetch contents error:', err);
        navigate('/login');
      }
    };
    fetchContents();
  }, [category, navigate]);

  const handleLike = async (contentId) => {
    try {
      await axios.post(`http://localhost:3000/api/content/${contentId}/like`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setContents(response.data.map(content => {
        if (content._id === contentId) {
          const contentItem = document.querySelector(`[data-content-id="${contentId}"]`);
          if (contentItem) {
            contentItem.classList.add('liked');
            setTimeout(() => contentItem.classList.remove('liked'), 1200); // 1.2-second animation
          }
        }
        return content;
      }));
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const toggleExpand = (contentId) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  const refreshContent = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/content?type=${category}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setContents(response.data);
    } catch (err) {
      console.error('Refresh contents error:', err);
      navigate('/login');
    }
  };

  const countWords = (text) => text.trim().split(/\s+/).length;

  return (
    <div className={`content-feed ${getTheme()}`}>
      {contents.length > 0 ? (
        contents.map((content) => {
          const wordCount = countWords(content.body);
          const shouldShowFull = wordCount <= 60;
          const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

          return (
            <div key={content._id} className={`content-item ${getTheme()}`} data-content-id={content._id}>
              <div className="content-header">
                <h3>{content.user?.name || 'Unknown'}</h3>
              </div>
              {content.title && <h4>{content.title}</h4>}
              <p>{displayContent}</p>
              {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
              {!shouldShowFull && wordCount > 60 && (
                <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                  {expandedContent === content._id ? 'Show Less' : 'Read More'}
                </button>
              )}
              {content.image && (
                <img
                  src={`http://localhost:3000${content.image}`}
                  alt="Content"
                  className="content-image"
                  onClick={() => setShowImageModal(content._id)}
                />
              )}
              <div className="content-footer">
                <span>{new Date(content.createdAt).toLocaleString()}</span>
                <button onClick={() => handleLike(content._id)}>
                  <FontAwesomeIcon icon="heart" /> {content.likes.length}
                </button>
              </div>
              {showImageModal === content._id && content.image && (
                <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                  <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                      <FontAwesomeIcon icon="times" />
                    </button>
                    <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No contents available.</p>
      )}
      <button className="bottom-plus" onClick={() => setShowUpload(true)}>
        <FontAwesomeIcon icon="plus" />
      </button>
      {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} onUploadSuccess={refreshContent} />}
    </div>
  );
}

function UploadContainer({ category, onClose, onUploadSuccess }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('happy');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('type', category);
    if (title) formData.append('title', title);
    formData.append('body', body);
    if (mood !== 'happy') formData.append('mood', mood);
    if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
    formData.append('isDraft', false);

    try {
      const response = await axios.post('http://localhost:3000/api/content', formData, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setBody('');
      setMood('happy');
      setImage(null);
      onClose();
      navigate(`/${category}`);
      if (onUploadSuccess) onUploadSuccess();
      const toastSuccess = document.querySelector('.toast.success');
      if (toastSuccess) {
        toastSuccess.textContent = 'Content uploaded!';
        toastSuccess.classList.add('show');
        setTimeout(() => toastSuccess.classList.remove('show'), 3000);
      }
    } catch (err) {
      console.error('Upload error:', err);
      const toastError = document.querySelector('.toast.error');
      if (toastError) {
        toastError.textContent = 'Upload failed';
        toastError.classList.add('show');
        setTimeout(() => toastError.classList.remove('show'), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('type', category);
    if (title) formData.append('title', title);
    formData.append('body', body);
    if (mood !== 'happy') formData.append('mood', mood);
    if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
    formData.append('isDraft', true);

    try {
      const response = await axios.post('http://localhost:3000/api/content', formData, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setBody('');
      setMood('happy');
      setImage(null);
      onClose();
      navigate('/profile');
      const toastSuccess = document.querySelector('.toast.success');
      if (toastSuccess) {
        toastSuccess.textContent = 'Draft saved!';
        toastSuccess.classList.add('show');
        setTimeout(() => toastSuccess.classList.remove('show'), 3000);
      }
    } catch (err) {
      console.error('Save draft error:', err);
      const toastError = document.querySelector('.toast.error');
      if (toastError) {
        toastError.textContent = 'Save failed';
        toastError.classList.add('show');
        setTimeout(() => toastError.classList.remove('show'), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-overlay">
      <div className={`upload-container-large ${getTheme()}`}>
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
        <h2>Upload {category}</h2>
        <form>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            disabled={loading}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Content"
            required
            disabled={loading}
            style={{ overflowY: 'auto', maxHeight: '300px' }}
          />
          <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="love">Love</option>
            <option value="anxious">Anxious</option>
            <option value="calm">Calm</option>
            <option value="thoughtful">Thoughtful</option>
          </select>
          {(category === 'blog' || category === 'story') && (
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
          )}
          <div className="button-group">
            <button type="button" onClick={handleSubmit} disabled={loading}>
              <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
            </button>
            <button type="button" onClick={handleSaveDraft} disabled={loading}>
              <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProfilePage({ setIsAuthenticated, selectedCategory }) {
  const [user, setUser] = useState(null);
  const [uploadedContents, setUploadedContents] = useState([]);
  const [draftContents, setDraftContents] = useState([]);
  const [editDraft, setEditDraft] = useState(null);
  const [uploadedFilter, setUploadedFilter] = useState('');
  const [draftFilter, setDraftFilter] = useState('');
  const [expandedContent, setExpandedContent] = useState(null);
  const [showImageModal, setShowImageModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error('Fetch user error:', err);
        navigate('/login');
      }
    };

    const fetchUserContents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/content/user', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUploadedContents(response.data.filter(c => !c.isDraft));
        setDraftContents(response.data.filter(c => c.isDraft));
      } catch (err) {
        console.error('Fetch user contents error:', err);
      }
    };

    fetchUser();
    fetchUserContents();
  }, [navigate]);

  const handleDelete = async (id, isDraft) => {
    try {
      await axios.delete(`http://localhost:3000/api/content/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
      else setUploadedContents(uploadedContents.filter(c => c._id !== id));
      const toastSuccess = document.querySelector('.toast.success');
      if (toastSuccess) {
        toastSuccess.textContent = 'Content deleted!';
        toastSuccess.classList.add('show');
        setTimeout(() => toastSuccess.classList.remove('show'), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err.response?.data);
      const toastError = document.querySelector('.toast.error');
      if (toastError) {
        toastError.textContent = err.response?.data?.message || 'Delete failed';
        toastError.classList.add('show');
        setTimeout(() => toastError.classList.remove('show'), 3000);
      }
    }
  };

  const handleEdit = (draft) => {
    setEditDraft(draft);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editDraft) return;
    const formData = new FormData();
    formData.append('title', editDraft.title || '');
    formData.append('body', editDraft.body);
    formData.append('mood', editDraft.mood || 'happy');
    formData.append('isDraft', true);

    try {
      await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
      });
      setEditDraft(null);
      const fetchUserContents = async () => {
        const response = await axios.get('http://localhost:3000/api/content/user', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setDraftContents(response.data.filter(c => c.isDraft));
      };
      fetchUserContents();
      const toastSuccess = document.querySelector('.toast.success');
      if (toastSuccess) {
        toastSuccess.textContent = 'Draft updated!';
        toastSuccess.classList.add('show');
        setTimeout(() => toastSuccess.classList.remove('show'), 3000);
      }
    } catch (err) {
      console.error('Edit error:', err);
      const toastError = document.querySelector('.toast.error');
      if (toastError) {
        toastError.textContent = 'Edit failed';
        toastError.classList.add('show');
        setTimeout(() => toastError.classList.remove('show'), 3000);
      }
    }
  };

  const handleUploadEdit = async (e) => {
    e.preventDefault();
    if (!editDraft) return;
    const formData = new FormData();
    formData.append('title', editDraft.title || '');
    formData.append('body', editDraft.body);
    formData.append('mood', editDraft.mood || 'happy');
    formData.append('isDraft', false);
    formData.append('type', editDraft.type);

    try {
      await axios.put(`http://localhost:3000/api/content/${editDraft._id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
      });
      setEditDraft(null);
      const fetchUserContents = async () => {
        const response = await axios.get('http://localhost:3000/api/content/user', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setDraftContents(response.data.filter(c => c.isDraft));
        setUploadedContents(response.data.filter(c => !c.isDraft));
      };
      fetchUserContents();
      navigate(`/${editDraft.type}`);
      const toastSuccess = document.querySelector('.toast.success');
      if (toastSuccess) {
        toastSuccess.textContent = 'Content uploaded!';
        toastSuccess.classList.add('show');
        setTimeout(() => toastSuccess.classList.remove('show'), 3000);
      }
    } catch (err) {
      console.error('Upload error:', err);
      const toastError = document.querySelector('.toast.error');
      if (toastError) {
        toastError.textContent = 'Upload failed';
        toastError.classList.add('show');
        setTimeout(() => toastError.classList.remove('show'), 3000);
      }
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('welcomeShown');
    // Navigation will be handled by the parent component
  };

  const toggleExpand = (contentId) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  const countWords = (text) => text.trim().split(/\s+/).length;

  return (
    <div className={`profile-page ${getTheme()}`}>
      {user ? (
        <div className={`profile-screen ${getTheme()}`}>
          <div className="profile-header">
            <h1>Profile</h1>
            <button onClick={handleLogout} className="logout-btn">
              <FontAwesomeIcon icon="sign-out-alt" /> Logout
            </button>
          </div>
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            {user.profilePic && <img src={`http://localhost:3000${user.profilePic}`} alt="Profile" className="profile-img" />}
          </div>
          <div className="content-sections">
            <h3>Uploaded Contents</h3>
            <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
              <option value="">All Categories</option>
              <option value="poem">Poem</option>
              <option value="shayari">Shayari</option>
              <option value="blog">Blog</option>
              <option value="story">Story</option>
            </select>
            {uploadedContents.length > 0 ? (
              uploadedContents
                .filter(content => !uploadedFilter || content.type === uploadedFilter)
                .map((content) => {
                  const wordCount = countWords(content.body);
                  const shouldShowFull = wordCount <= 60;
                  const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

                  return (
                    <div key={content._id} className={`content-item ${getTheme()}`}>
                      <div className="content-header">
                        <h3>{content.user?.name || 'Unknown'}</h3>
                      </div>
                      {content.title && <h4>{content.title}</h4>}
                      <p>{displayContent}</p>
                      {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
                      {!shouldShowFull && wordCount > 60 && (
                        <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                          {expandedContent === content._id ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      {content.image && (
                        <img
                          src={`http://localhost:3000${content.image}`}
                          alt="Content"
                          className="content-image"
                          onClick={() => setShowImageModal(content._id)}
                        />
                      )}
                      <div className="content-footer">
                        <span>{new Date(content.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
                      </div>
                      {showImageModal === content._id && content.image && (
                        <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                              <FontAwesomeIcon icon="times" />
                            </button>
                            <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <p>No uploaded contents yet.</p>
            )}
            <h3>Saved Drafts</h3>
            <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
              <option value="">All Categories</option>
              <option value="poem">Poem</option>
              <option value="shayari">Shayari</option>
              <option value="blog">Blog</option>
              <option value="story">Story</option>
            </select>
            {draftContents.length > 0 ? (
              draftContents
                .filter(content => !draftFilter || content.type === draftFilter)
                .map((content) => {
                  const wordCount = countWords(content.body);
                  const shouldShowFull = wordCount <= 60;
                  const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';

                  return (
                    <div key={content._id} className={`content-item ${getTheme()}`}>
                      <div className="content-header">
                        <h3>{content.user?.name || 'Unknown'}</h3>
                      </div>
                      {content.title && <h4>{content.title}</h4>}
                      <p>{displayContent}</p>
                      {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
                      {!shouldShowFull && wordCount > 60 && (
                        <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                          {expandedContent === content._id ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      {content.image && (
                        <img
                          src={`http://localhost:3000${content.image}`}
                          alt="Content"
                          className="content-image"
                          onClick={() => setShowImageModal(content._id)}
                        />
                      )}
                      <div className="content-footer">
                        <span>{new Date(content.createdAt).toLocaleString()}</span>
                        <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
                        <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
                      </div>
                      {showImageModal === content._id && content.image && (
                        <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                              <FontAwesomeIcon icon="times" />
                            </button>
                            <img src={`http://localhost:3000${content.image}`} alt="Enlarged Content" className="enlarged-image" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <p>No saved drafts yet.</p>
            )}
            {editDraft && (
              <div className="upload-overlay">
                <div className={`upload-container-large ${getTheme()}`}>
                  <button className="close-btn" onClick={() => setEditDraft(null)}>
                    <FontAwesomeIcon icon="times" />
                  </button>
                  <h2>Edit Draft</h2>
                  <form>
                    <input
                      type="text"
                      value={editDraft.title || ''}
                      onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                      placeholder="Title (optional)"
                    />
                    <textarea
                      value={editDraft.body || ''}
                      onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
                      placeholder="Content"
                      required
                      style={{ overflowY: 'auto', maxHeight: '300px' }}
                    />
                    <select
                      value={editDraft.mood || 'happy'}
                      onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
                    >
                      <option value="happy">Happy</option>
                      <option value="sad">Sad</option>
                      <option value="love">Love</option>
                      <option value="anxious">Anxious</option>
                      <option value="calm">Calm</option>
                      <option value="thoughtful">Thoughtful</option>
                    </select>
                    <div className="button-group">
                      <button type="button" onClick={handleSaveEdit}>
                        <FontAwesomeIcon icon="save" /> Save
                      </button>
                      <button type="button" onClick={handleUploadEdit}>
                        <FontAwesomeIcon icon="upload" /> Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, showSplash, setShowSplash, user, setUser, isDarkMode, setIsDarkMode, selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${getToken()}` },
          });
          setUser(response.data.user);
        } catch (err) {
          console.error('Fetch user error:', err);
          setIsAuthenticated(false);
          setToken(null);
          setUser(null);
          navigate('/login');
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, isDarkMode, navigate]);

  const handleLogin = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    setShowSplash(false);
  };

  const handleLogout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('welcomeShown');
    navigate('/login');
  };

  if (showSplash) return <SplashScreen setShowSplash={setShowSplash} />;

  return (
    <>
      {!isAuthenticated ? (
        <div className="auth-container">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </div>
      ) : (
        <>
          <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} navigate={navigate} />
          <Routes>
            <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
            <Route path="/:category" element={<ContentFeed category={selectedCategory} />} />
            <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          </Routes>
          <div className="toast success"></div>
          <div className="toast error"></div>
        </>
      )}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'poem');

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        showSplash={showSplash}
        setShowSplash={setShowSplash}
        user={user}
        setUser={setUser}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Router>
  );
}

export default App;