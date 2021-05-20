import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ResearchCard from "../researchcards/ResearchCard";
import Col from "react-bootstrap/Col";
import react, { Component } from "react";
import "./SearchBar.css";
import UseFiltersToggle from "./UseFiltersToggle";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FilterDropDowns from "./FilterDropDowns";
import { options } from "../../Utils/DropDownOprions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
    this.dropDownOptions = options;
  }
  fetchSearchResults = (
    Domains,
    ResearchTypes,
    StatusSelected,
    Authors,
    query
  ) => {
    const searchUrl = `http://localhost:5000/posts/${query}/${Domains}/${ResearchTypes}/${StatusSelected}/${Authors}`;
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, { cancelToken: this.cancel.token })
      .then((res) => {
        const resultNotFoundMsg = !res.data ? "no More" : "";
        this.setState({
          results: res.data,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch data",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(
        ["Blockchain"],
        ["KMIT"],
        "Completed",
        "Authors",
        query
      );
    });
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-cont">
          {results.map((result) => {
            return (
              <a>
                <ListGroup horizontal={true} className="my-2" key={result._id}>
                  <ResearchCard details={result} />
                </ListGroup>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { query } = this.state;
    this.filterDropDownsComponent = this.dropDownOptions.map((result) => (
      <FilterDropDowns details={result} />
    ));

    return (
      //             <div class="input-group">
      //   <div class="form-outline">
      //     <input id="search-focus" type="search" id="form1" class="form-control" />
      //     <label class="form-label" for="form1">Search</label>
      //   </div>
      //   <button type="button" class="btn btn-primary">
      //     <i class="fas fa-search"></i>
      //   </button>
      // </div>

      <div class="col-sm-12">
        <div class="row input-group">
          <div class="col-sm-3">
            <form onSubmit={this.submitHandler}>
              <input
                type="search"
                name="query"
                value={query}
                placeholder="Search"
                class="form-control search-style"
                id="form1"
                onChange={this.handleOnInputChange}
              />
            </form>
          </div>
          <div class="col-sm-9">
            <div>
              <Navbar style={{ background: "white" }} expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Container>
                  <div class="row">
                    <Navbar.Collapse id="basic-navbar-nav">
                      <UseFiltersToggle />
                      <Nav className="mr-auto">
                        {this.filterDropDownsComponent}
                      </Nav>
                    </Navbar.Collapse>
                  </div>
                </Container>
              </Navbar>
            </div>
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default SearchBar;
