import React from 'react';
import { Container, Row, Col } from 'reactstrap';
//import SearchQueryResults from './page-components/SearchQueryResults';
import { Link } from 'react-router-dom'
import {FaPlus, FaMinus} from 'react-icons/fa';

class ExplorePage extends React.Component {

    state = {
        searchText:"",
        searchResults:[],
        displayResults:false,
    }

    // Display content for search result item i
    toggleContent = (e, i) => {

    }
    // Execute a search request
    makeSearch = async (inputData) => {
        const result = await fetch(`/api/search`, {
            method:'post',
            body: JSON.stringify({query: inputData}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        this.setState({
            searchResults:body
        });
    };

  // Load data on mount
  componentDidMount = () => {
    console.log("Mounting");
    }

    // Handle search submit
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Search text is currently ${this.state.searchText}`);

        // Get results
        this.makeSearch(this.state.searchText);
    }

    // Handle on change
    handleOnChange = (e) => {
        this.setState({searchText:e.target.value});
        //this.makeSearch(this.state.searchText);
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
                                <input className="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search" style={{"width":"100%"}}
                                        name={"searchField"}
                                        onChange={(e) => this.handleOnChange(e)}></input>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <p style={{"color":"light-grey", "font-size":"12px"}}>{this.state.searchText}</p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col>
                        <div className="explore-results-div">
                            <h2>Results</h2>
                            
                            {this.state.searchResults.map((item, i) => 
                                    <div className="search-result-item" key={i}>
                                        <a 
                                            href="" 
                                            value={`${item.volumeKey}/${item.questionKey}/${item.articleKey}`}
                                            onClick={(e) => {e.preventDefault()}}>
                                                    {`${item.volumeKey}/${item.questionKey}/   ${item.articleKey}`}
                                        </a>
                                        <p>{`${item.volume}`}</p>
                                        <p>{`${item.questionTitle}`}</p>
                                        <p className="result-item-content-last">
                                            {`${item.articleTitle}`}
                                        </p>
{/* 
                                        <div className="card mt-3 ">                                    
                                            <h3 className='card-header pointer '
                                                onClick={(e) => this.toggleContent(e, i)}>
                                                {this.state.displayResults ?
                                                <FaMinus></FaMinus> : 
                                                <FaPlus> </FaPlus>} Content
                                            </h3>
                                            
                                            <div className={
                                                        this.state.displayResults ? 
                                                        "card-body" : 
                                                        "card-body ".concat("hide")
                                                    }
                                                    >
                                                <h4>Objections ...</h4>
                                                    {this.state.display_data.articleObjections.map((obj,j) => (
                                                        <p key={j} className="objection-item">{obj}</p>
                                                    ))}
                                                <h4>Body ...</h4>
                                                <p className="body-item">
                                                    {this.state.display_data.articleBody}
                                                </p>
                                                <p></p>
                                                <h4>Reply to Objections ...</h4>
                                                    {this.state.display_data.articleReplyToObjections.map((obj,j) => (
                                                        <p key={j} className="reply-to-objection-item">{obj}</p>
                                                    ))}    
                                            </div>
                                        </div> */}
                                    </div>
                            )}
                        </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default ExplorePage;