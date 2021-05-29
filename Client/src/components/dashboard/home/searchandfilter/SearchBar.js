import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ResearchCard from "../researchcards/ResearchCard";
import Col from "react-bootstrap/Col";
import React, { Component } from "react";
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
      DomainFilterValues: [],
      OrgainzationFilterValues: [],
      StatusFilterValues: [],
      DomainsInDB: new Map(),
      results: {},
      filteredResults:[],
      loading: false,
      message: "",
      printthis: "",
      DomainOptions: [
        { label: "Blockchain", value: 1 },
        { label: "Artificial intelligence", value: 2 },
        { label: "Augmented Reality", value: 3 },
        { label: "Internet Of Things", value: 4 },
        { label: "Cyber Security", value: 5 },
        { label: "Quantum Computing", value: 6 },
        { label: "Robotics", value: 7 },
        { label: "Virtual Reality", value: 8 },
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
  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get("http://localhost:5000/posts").then((response) => {
      this.setState({ results: response.data });
      this.setState({filteredResults:this.state.results});
      console.log(response.data);
    });
  }

  fetchSearchResults = (
    Domains,
    ResearchTypes,
    StatusSelected,
    Authors,
    query
  ) => {
    const searchUrl =
      query == ""
        ? `http://localhost:5000/posts`
        : `http://localhost:5000/posts/${query}/Domains/ResearchTypes/StatusSelected/Authors`;
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("profile")).data.token
          }`,
        },
      })
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
    console.log(this.state.DomainFilterValues);
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(
        this.state.DomainFilterValues,
        this.state.OrgainzationFilterValues,
        this.state.StatusFilterValues,
        "Authors",
        query
      );
    });
  };

  DomainFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.DomainFilterValues = arr;
  };
  OrgainzationFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.OrgainzationFilterValues = arr;
  };
  StatusFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.StatusFilterValues = arr;
  };

  find_in_object(my_object, my_criteria) {
    return my_object.filter(function (obj) {
      return Object.keys(my_criteria).every(function (c) {
        return obj[c] == my_criteria[c];
      });
    });
  }

  renderSearchResults = () => {
    axios.get("http://localhost:5000/domains").then((res) => {
      res.data.map((ival) => {
        this.state.DomainsInDB.set(ival.name, ival._id);
      });
    });

    const { results } = this.state;
    console.log(results);


    this.state.DomainFilterValues.map((ival) => {
      console.log(ival);
      var temp_results = [];
      temp_results = this.find_in_object(results, {
        domain: this.state.DomainsInDB.get(ival),
      });
      console.log(temp_results);
      this.setState({filteredResults: this.state.filteredResults.concat(temp_results)});
    });
    console.log(this.state.filteredResults);
    this.state.OrgainzationFilterValues.map((ival) => {
      console.log(ival);
      var temp_results = [];
      temp_results = this.find_in_object(this.state.filteredResults, { organization: ival });
      console.log(temp_results);
      this.setState({filteredResults : temp_results.length ? temp_results : this.statefilteredResults});
    });
    console.log(this.state.filteredResults);
    this.state.StatusFilterValues.map((ival) => {
      //console.log(ival);
      var temp_results = [];
      temp_results = this.find_in_object(this.state.filteredResults, { status: ival });
      this.setState({filteredResults : temp_results.length ? temp_results : this.statefilteredResults});
    });

    console.log("this is ");
    console.log(this.state.filteredResults);

    if (Object.keys(this.state.filteredResults).length && results.length) {
      return (
        <div>
          {this.state.filteredResults.map((result) => {
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
    } else {
      return <div>Not Found</div>;
    }
  };

  render() {
    const { query } = this.state;
    const { myval } = this.state;
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
              onChange={this.DomainFilter}
              options={this.state.DomainOptions}
            />
          </div>
          <div class="col-sm-3">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Organization"
              onChange={this.OrgainzationFilter}
              options={this.state.OrgainzationOptions}
            />
          </div>
          <div class="col-sm-3">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Status"
              onChange={this.StatusFilter}
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
