import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ResearchCard from "../researchcards/ResearchCard";
import Col from "react-bootstrap/Col";
import react, { Component } from "react";
import "./SearchBar.css";
import UseFiltersToggle from "./UseFiltersToggle";
import axios from "axios";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import FilterDropDowns from "./FilterDropDowns";
import { options } from "../../Utils/DropDownOprions";
import { Children } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      DomainsToSend: [],
      results: {},
      loading: false,
      message: "",
      DomainOptions: [
        { label: "Blockchain", value: 1 },
        { label: "AI/ML", value: 2 },
        { label: "AUgmented Reality", value: 2 },
      ],
      OrgainzationOptions: [
        { label: "Lab", value: 1 },
        { label: "Private", value: 2 },
      ],
      StatusOptions: [
        { label: "Pending", value: 1 },
        { label: "Completed", value: 2 },
      ],
    };

    this.cancel = "";
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
  SendDomains = (event) => {
    console.log("This is the real life");
    console.log(event.target.value);
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
    //   this.filterDropDownsComponent = this.dropDownOptions.map((result) => (
    //     <FilterDropDowns details={result} />
    //));

    return (
      <div class="col-sm-12">
        <div class="row input-group">
          <div class="col-sm-3">
            <input
              type="search"
              name="query"
              value={query}
              placeholder="Search"
              class="form-control search-style"
              id="form1"
              onChange={this.handleOnInputChange}
            />
          </div>
          <div class="col-sm-3">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Domain"
              onPress={() => {
                this.SendDomains();
              }}
              options={this.state.DomainOptions}
            />
          </div>
          <div class="col-sm-3">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Organization"
              options={this.state.OrgainzationOptions}
            />
          </div>
          <div class="col-sm-3">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Status"
              options={this.state.StatusOptions}
            />
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default SearchBar;
