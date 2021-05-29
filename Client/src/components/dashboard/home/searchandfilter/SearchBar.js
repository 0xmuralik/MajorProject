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
      myevent: [],
      all_authors: [],
      coAuthors: [],
      query: "",
      DomainFilterValues: [],
      OrgainzationFilterValues: [],
      StatusFilterValues: [],
      AuthorsFilteredValues: [],
      DomainsInDB: new Map(),
      results: {},
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
      AuthorOptions: [],
    };

    this.cancel = "";
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get("http://localhost:5000/posts").then((response) => {
      this.setState({ results: response.data });
    });
    axios.get("http://localhost:5000/users/", {}).then((resp) => {
      console.log(resp);
      this.setState({ all_authors: resp.data });
      console.log(this.state.all_authors);

      this.state.all_authors.map((ival, idx) => {
        var newObj = { label: ival.name, value: ival._id };
        this.state.AuthorOptions.push(newObj);
        console.log(this.state.AuthorOptions);
      });
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
    console.log(event);
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
  DomainFilterBefore = (event) => {
    this.DomainFilter(event);
    const tin = document.querySelector("#form1");
    console.log(tin.value);
    var e = {
      target: { value: tin.value },
    };
    this.handleOnInputChange(e);
  };
  DomainFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.DomainFilterValues = arr;
  };
  OrganizationFilterBefore = (event) => {
    this.OrgainzationFilter(event);
    const tin = document.querySelector("#form1");
    console.log(tin.value);
    var e = {
      target: { value: tin.value },
    };
    this.handleOnInputChange(e);
  };
  OrgainzationFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.OrgainzationFilterValues = arr;
  };

  StatusFilterBefore = (event) => {
    this.StatusFilter(event);
    const tin = document.querySelector("#form1");
    console.log(tin.value);
    var e = {
      target: { value: tin.value },
    };
    this.handleOnInputChange(e);
  };
  StatusFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      arr.push(ival.label);
    });
    this.state.StatusFilterValues = arr;
    console.log(this.state.StatusFilterValues);
  };
  AuthorsFilterBefore = (event) => {
    this.AuthorsFilter(event);
    const tin = document.querySelector("#form1");
    console.log(tin.value);
    var e = {
      target: { value: tin.value },
    };
    this.handleOnInputChange(e);
  };
  AuthorsFilter = (event) => {
    const arr = [];
    event.map((ival, idx) => {
      console.log(ival);
      arr.push(ival.value);
    });
    this.state.AuthorsFilteredValues = arr;
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    var resultss = [];
    this.state.DomainFilterValues.map((ival) => {
      console.log(ival);
      var temp_results = [];
      temp_results = this.find_in_object(results, {
        domain: this.state.DomainsInDB.get(ival),
      });
      console.log(temp_results);
      resultss = resultss.concat(temp_results);
    });
    console.log(resultss);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    var temp_results = [];
    this.state.OrgainzationFilterValues.map((ival) => {
      console.log(ival);

      temp_results = temp_results.concat(
        this.find_in_object(resultss, { organization: ival })
      );
      console.log(temp_results);
    });
    resultss = temp_results;
    console.log(resultss);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    temp_results = [];
    this.state.StatusFilterValues.map((ival) => {
      console.log(ival);
      temp_results = temp_results.concat(
        this.find_in_object(resultss, { status: ival })
      );
      console.log(temp_results);
    });
    resultss = temp_results;
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    temp_results = [];
    console.log(this.state.AuthorsFilteredValues);
    this.state.AuthorsFilteredValues.map((ival) => {
      temp_results = temp_results.concat(
        this.find_in_object(resultss, { author: ival })
      );
      console.log(temp_results);
    });
    resultss = temp_results;

    console.log("this is ");
    console.log(resultss);
    console.log(typeof this.state.query);
    if (this.state.query == "") {
      console.log("this is ");
      console.log(resultss);
      resultss = this.state.results;
    }

    if (Object.keys(resultss).length && resultss.length) {
      return (
        <div>
          {resultss.map((result) => {
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
          <div class="col-sm-4">
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
          <div class="col-sm-2">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Domain"
              onChange={this.DomainFilterBefore}
              options={this.state.DomainOptions}
            />
          </div>
          <div class="col-sm-2">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Organization"
              onChange={this.OrganizationFilterBefore}
              options={this.state.OrgainzationOptions}
            />
          </div>
          <div class="col-sm-2">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Status"
              onChange={this.StatusFilterBefore}
              options={this.state.StatusOptions}
            />
          </div>
          <div class="col-sm-2">
            <ReactMultiSelectCheckboxes
              placeholderButtonLabel="Authors"
              onChange={this.AuthorsFilterBefore}
              options={this.state.AuthorOptions}
            />
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    );
  }
}
export default SearchBar;
