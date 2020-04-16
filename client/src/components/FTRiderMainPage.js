import React, { Component } from "react";

import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Jumbotron,
} from "reactstrap";
import "../styles/FTRiderMainPage.css";

import PendingOrders from "./PendingOrders";
import { GiFoodTruck } from "react-icons/gi";
import { MdHome } from "react-icons/md";
import { FaRegCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";

class FTRiderMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFTRider: true,
      id: this.props.location.id,
      name: "",
      orders: [],
      rating: 0,
    };
  }

  getName = () => {
    fetch("http://localhost:3001/FTRider/getName/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rid: this.state.id }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          name: res[0].name,
        });
      });
  };

  getRating = () => {
    // fetch("http://localhost:3001/FTRider")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     let rating = res[0].rating;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  getPendingOrders = () => {
    fetch("http://localhost:3001/FTRider/getPendingOrders")
      .then((res) => {
        return res
          ? res.json()
          : [
              {
                order_number: "",
                cname: "",
                delivery_location: "",
                restaurant_name: "",
                restaurant_location: "",
              },
            ];
      })
      .then((res) => {
        this.setState({
          orders: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleViewSalary = () => {
    // if (this.state.isFTRider) {
    //   this.props.history.push("/FTriderMainPage/salary");
    // } else {
    //   this.props.history.push("/PTriderMainPage/salary");
    // }
  };

  handleViewSchedule = () => {
    this.props.history.push({
      pathname: "/FTRiderMainPage/schedule",
      isFTRider: this.state.isFTRider,
    });
  };

  handleHomeNavigation = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  componentDidMount() {
    this.getName();
    // this.getRating();
    this.getPendingOrders();
  }

  render() {
    return (
      <Container fluid className="container-fluid">
        <Navbar className="navbar" color="dark" dark>
          <NavbarBrand href="/">Full Time Rider</NavbarBrand>
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

        <Jumbotron>
          <div className="centered-container">
            <h1 className="display-2">
              <GiFoodTruck />
              <span> Welcome back {this.state.name}! </span>
              <GiFoodTruck />
            </h1>
          </div>

          <p className="lead">Summary of your activities</p>

          {/* Stats panel for FT Rider */}
          <div className="stats-panel">
            <button onClick={this.handleViewSalary}>
              <FaMoneyBillAlt />
              <span> Salary this week/month</span>
            </button>

            <p className="centered-text">Your Rating: {this.state.rating}</p>

            <button onClick={this.handleViewSchedule}>
              <FaRegCalendarAlt />
              <span> Schedule</span>
            </button>
          </div>
        </Jumbotron>

        <PendingOrders
          key={this.state.orders.length}
          orders={this.state.orders}
        />
      </Container>
    );
  }
}

export default FTRiderMainPage;
