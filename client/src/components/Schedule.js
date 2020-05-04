import React, { Component } from "react";
import { Container, Navbar, NavbarBrand, Nav, NavLink } from "reactstrap";
import swal from "sweetalert";

import Calendar from "react-calendar";
import { MdHome } from "react-icons/md";

import "../styles/Schedule.css";
import FTSelectSchedule from "./FTSelectSchedule";
import PTSelectSchedule from "./PTSelectSchedule";

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.formatDate(new Date()),
      selectedScheduleList: [],
    };
  }

  getScheduleComponent = () => {
    if (this.props.location.state.isFTRider) {
      return (
        <FTSelectSchedule
          handleSubmit={this.handleFTSubmit}
          selectedDate={this.state.date}
          selectedScheduleList={this.state.selectedScheduleList}
        />
      );
    } else {
      return (
        <PTSelectSchedule
          handleSubmit={this.handlePTSubmit}
          selectedDate={this.state.date}
          selectedScheduleList={this.state.selectedScheduleList}
        />
      );
    }
  };

  handleFTSubmit = (e) => {
    e.preventDefault();
    const selectedDate = this.state.date;
    let selectedShift;
    const selectedRadio = document.querySelectorAll(
      'input[name="ft-shift"]:checked'
    );
    selectedRadio.forEach((radio) => {
      selectedShift = radio.value;
    });

    const selectedDateShift = {
      date: selectedDate,
      shift: selectedShift,
    };

    const newScheduleList = this.state.selectedScheduleList.slice();
    // Check for same date entry in schedule list
    const index = newScheduleList.findIndex((o) => o.date === selectedDate);
    if (index === -1) {
      newScheduleList.push(selectedDateShift);
    } else {
      newScheduleList[index] = selectedDateShift;
    }
    // Sort date in ascending order
    newScheduleList.sort((a, b) => new Date(a.date) - new Date(b.date));

    this.setState({
      selectedScheduleList: newScheduleList,
    });
  };

  handlePTSubmit = (e) => {
    e.preventDefault();

    const selectedDate = this.state.date;
    let selectedShift = [];
    let hasSelectedShift = false;

    const checkboxes = document.querySelectorAll('input[name="time"]:checked');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        hasSelectedShift = true;
        selectedShift.push(checkbox.value);
        console.log("AAAA");
        console.log(selectedShift);
        console.log(checkbox.value);
      }
    });

    const selectedDateShift = {
      date: selectedDate,
      shift: selectedShift,
    };

    const newScheduleList = this.state.selectedScheduleList.slice();
    // Check for same date entry in schedule list
    const index = newScheduleList.findIndex((o) => o.date === selectedDate);
    if (index === -1) {
      newScheduleList.push(selectedDateShift);
    } else {
      newScheduleList[index] = selectedDateShift;
    }

    if (hasSelectedShift) {
      // Sort date in ascending order
      newScheduleList.sort((a, b) => new Date(a.date) - new Date(b.date));
      this.setState({
        selectedScheduleList: newScheduleList,
      });
    } else {
      const date = this.state.date;
      swal("Please select at least one shift for " + date);
    }
  };

  handleHomeNavigation = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  // Format given Date object into a string of Format:
  // DAY MONTH YEAR (e.g. 4 May 2020)
  formatDate = (date) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options = { year: "numeric", month: "long", day: "numeric" };
    const selectedDate = date.toLocaleDateString("en-GB", options);
    return selectedDate;
  };

  onDateSelection = (date) => {
    this.setState({ date: this.formatDate(date) });
  };

  render() {
    return (
      <div>
        <Navbar className="navbar" color="dark" dark>
          <NavbarBrand href="/">Schedule</NavbarBrand>
          <Nav className="mr-auto">
            <NavLink
              href=""
              onClick={this.handleHomeNavigation}
              className="link"
            >
              <MdHome />
              <span> Home</span>
            </NavLink>
          </Nav>
        </Navbar>

        <div className="centered-container">
          <Calendar
            className="react-calendar"
            onClickDay={this.onDateSelection}
            defaultValue={new Date(this.state.date)}
          />
        </div>

        {this.getScheduleComponent()}
      </div>
    );
  }
}

export default Schedule;
