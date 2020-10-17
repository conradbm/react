import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class ExplorePage extends React.Component {

    state = {
        searchText:"",
    }

  // Load data on mount
  componentDidMount = () => {
    console.log("Mounting");
    }

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Search text is currently ${this.state.searchText}`);
    }

    // Handle on change
    handleOnChange = (e) => {
        this.setState({searchText:e.target.value});
    }

    render(){
        return(
            <div>
                <Container>
                    <br></br>

                    <Row>
                        <Col>
                             <h1>Explore Page</h1>
                        </Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <form className="form-inline my-2 my-lg-0" 
                                  onSubmit={(e) => this.handleSubmit(e)}>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                        name={"searchField"}
                                        onChange={(e) => this.handleOnChange(e)}></input>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </Col>
                    </Row>
                    <hr></hr>
                    <div className="explore-results-div">
                        
                    </div>
                </Container>
            </div>
        )
    }
}

export default ExplorePage;