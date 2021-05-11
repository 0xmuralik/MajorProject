import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import react,{Component} from 'react';
import './SearchBar.css';
import UseFiltersToggle from './UseFiltersToggle';


class SearchBar extends Component {


    render(){
        return(
//             <div class="input-group">
//   <div class="form-outline">
//     <input id="search-focus" type="search" id="form1" class="form-control" />
//     <label class="form-label" for="form1">Search</label>
//   </div>
//   <button type="button" class="btn btn-primary">
//     <i class="fas fa-search"></i>
//   </button>
// </div>

                <Col>
            <div class="input-group">
                <form onSubmit={this.submitHandler}>
                    <input  type="search" placeholder="Search" class="form-control search-style" id="form1"/>
                </form>
            </div>
            </Col>
            
        )
    }
}
export default SearchBar;