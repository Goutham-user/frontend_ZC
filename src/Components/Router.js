import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import DetailPage from './detail';
import Header from './Header';

function Router() {
    return (
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/detail" component={DetailPage} />
        </BrowserRouter>
    )
}

export default Router;