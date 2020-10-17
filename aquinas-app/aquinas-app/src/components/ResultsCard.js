import React from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';

class ResultsCard extends React.Component {
    render(){
        return(
                <div className="card mt-3 ">
                    <div key className="search-results">
                        
                        <h3 className='card-header pointer '
                            onClick={(e) => this.toggleResultsHeader(e)}>
                            {this.state.displayResults ?
                            <FaMinus></FaMinus> : 
                            <FaPlus> </FaPlus>} Results
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
                    </div>
                </div>
        )
    }
}

export default ResultsCard;

