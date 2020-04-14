import React, { Component } from "react";
import "../styles/Customer.css";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { Navbar, Nav, NavbarBrand, Col, Jumbotron, Row } from "reactstrap";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: ["Restaurant 1", "Restaurant 2", "Restaurant 3"],
      filtered: [],
      customerName: "Mr Cranston",
    };

    this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.state.restaurantList,
    });
  }

  handleProfile = () => {
    this.props.history.push("/");
  };

  handleCart = () => {
    this.props.history.push("/Login");
  };

  handleChange(e) {
    let newList = [];
    let currentList = this.state.restaurantList;

    if (e.target.value !== "") {
      newList = currentList.filter((item) => {
        const lowercaseItem = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lowercaseItem.includes(filter);
      });
    } else {
      newList = currentList;
    }
    this.setState({
      filtered: newList,
    });
  }

  render() {
    return (
      <div>
        <Navbar dark color="dark">
          <NavbarBrand href="/CustomerMainPage">CustomerMainPage</NavbarBrand>
          <div calssName="icon-container">
            <GiShoppingCart
              size="3em"
              color="black"
              onClick={this.handleCart}
            />
            <MdPerson size="3em" color="black" onClick={this.handleProfile} />
          </div>
        </Navbar>

        <Row>
          <Col>
            <Jumbotron className="header-centered">
              <h1 className="display-3">Welcome {this.state.customerName}</h1>
              <p className="lead">What foods to order today? Yum! Yum!</p>
            </Jumbotron>
          </Col>
        </Row>

        <div className="content">
          <div className="container">
            <div className="searchContainer">
              <input
                type="text"
                className="input"
                onChange={(e) => this.handleChange(e)}
                placeholder="Search..."
              />
            </div>

            <div className="section">
              {this.state.filtered.map((item) => (
                <div key={item}>
                  <Link
                    className="restItem"
                    to={{
                      pathname: "/Customer/" + item,
                      state: {
                        customerName: this.state.customerName,
                        restaurant: { item },
                      },
                    }}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customer;
