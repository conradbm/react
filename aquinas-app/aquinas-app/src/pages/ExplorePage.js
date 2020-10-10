import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class ExplorePage extends React.Component {

  // Load data on mount
  componentDidMount = () => {
    console.log("inside handleGetJson");
    fetch(`../../aquinas.json`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data[0]);
        this.setState({
            data:data, 
            selectedVolume:data[0].volume, 
            selectedQuestion:data[0].questionTitle, 
            selectedArticle:data[0].articleTitle,
        });

      });
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
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
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