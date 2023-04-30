import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

// routing 
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

// utility
import Footer from './components/utility/Footer'
import NavBar from './components/utility/NavBar'
//Components
import Home from './components/home/Home';
import CreateForm from './components/Editing/CreateForm';
import SnackBar from './components/utility/Snackbar';
import Login from './components/utility/Login';
import FormListing from './components/Editing/FormListing';
import EditForm from './components/Editing/EditForm';
import Form from './components/Editing/Form';



function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#355070',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {/* <NavBar /> */}
      <SnackBar/>
      <Login/>
      <Router />
      {/* <Footer  /> */}
    </BrowserRouter>
    </ThemeProvider>
  );
}

function Router() {
  const history = useNavigate();


  return (<Routes>
    <Route exact path='/' element={<Home history={history} />} ></Route>
    <Route exact path='/listing' element={<FormListing history={history} />}></Route>
    <Route exact path='/create' element={<CreateForm history={history} />}></Route>
    <Route exact path='/editForm/:uuid' element={<EditForm history={history} />}></Route>
    <Route exact path='/editForm/:uuid' element={<EditForm history={history} />}></Route>
    <Route exact path='/openForm/:uuid' element={<Form history={history} />}></Route>
  </Routes>)

}

export default App;

