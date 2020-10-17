import React from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';

class SimilarCard extends React.Component {
    render(){
        return(
            <div className="card mt-3 ">
                <div key className="search-results">
                    
                    <h3 className='card-header pointer '
                        onClick={(e) => this.toggleSimilarHeader(e)}>
                        {this.state.displaySimilar ?
                        <FaMinus></FaMinus> : 
                        <FaPlus> </FaPlus>}  Similar Articles
                    </h3>
                    
                    <div className={
                                this.state.displaySimilar ? 
                                "card-body" : 
                                "card-body ".concat("hide")
                            }
                            >
                        <h4>Most similar ...</h4>  
                    </div>
                </div>
            </div>
        )
    }
}

export default SimilarCard;

