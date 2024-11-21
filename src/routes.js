import { Routes, Route } from 'react-router-dom'
import Home from './components/home/home'
import SignIn from './components/login/sign-in'
import SignUp from './components/login/sign-up'
import NavFunc from './components/nav'
import FindByCategory from './components/findByCategory'
import FindByParameters from './components/findByParameters'
import FindByWriter from './components/findByWriter'
import FindNewBooks from './components/findNewBooks'
import RouteToBook from './components/RouteToBook'



export default () => {
    return (
        <>
            <NavFunc />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='/findByCategory' element={<FindByCategory />} />
                <Route path='/findByParameters' element={<FindByParameters />} />
                <Route path='/findByWriter' element={<FindByWriter />} />
                <Route path='/findNewBooks' element={<FindNewBooks />} />
                <Route path='/routeToBook/:Id/:name' element={<RouteToBook />} />
            </Routes>
        </>
    )
}