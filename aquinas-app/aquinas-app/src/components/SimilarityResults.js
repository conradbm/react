import React from 'react';
import {FaPlus, FaMinus} from 'react-icons/fa';

class SimilarityResults extends React.Component {

    state = {
        selectedVolumeKey:"v1",
        selectedQuestionKey:"q1",
        selectedArticleKey:"a1",
        similarityData:{"body":{}, "results":{}},
    }

    // Fetch data helper
    fetchRealData = async (v,q,a) => {
        // let v = this.state.selectedVolumeKey;
        // let q = this.state.selectedQuestionKey;
        // let a = this.state.selectedArticleKey;
        let url = `/api/articles/${v}/${q}/${a}`;
        console.log(url);
        const result = await fetch(url, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const body = await result.json();
        this.setState({similarityData:{"body":body}});        
    }

    // Fetch data helper
    fetchSimilarityData = async (v,q,a) => {
        // let v = this.state.selectedVolumeKey;
        // let q = this.state.selectedQuestionKey;
        // let a = this.state.selectedArticleKey;
        let url = `/api/similarity/${v}/${q}/${a}`;
        console.log(url);
        const result = await fetch(url, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const results = await result.json();
        this.setState({similarityData:{"results":results}});        
    }

    // Load data on mount
    componentDidMount = () => {
        // Fetch initial content
        this.fetchSimilarityData(this.state.selectedVolumeKey, this.state.selectedQuestionKey, this.state.selectedArticleKey);
    }

    // Handle on change
    handleOnChange = () => {
        // Fetch initial content
        this.fetchSimilarityData(this.props.selectedVolumeKey, this.props.selectedQuestionKey, this.props.selectedArticleKey);
        
        // Need to update similarity data when props are passed down
        //this.state.similarityData.body.results.map(item => console.log(item.rank));
        
        //this.fetchSimilarityData(this.props.selectedVolumeKey, this.props.selectedQuestionKey, this.props.selectedArticleKey);
        this.setState({
            selectedVolumeKey: this.props.selectedVolumeKey,
            selectedQuestionKey: this.props.selectedQuestionKey,
            selectedArticleKey: this.props.selectedArticleKey
        });
    }

    render(){
        return(
            <div className="card mt-3 ">
                <div key className="search-results">
                    
                    <h3 className='card-header pointer '
                        onClick={(e) => this.props.toggleSimilarHeader(e)}>
                        {this.props.displaySimilar ?
                        <FaMinus></FaMinus> : 
                        <FaPlus> </FaPlus>}  Similar
                    </h3>
                    
                    <div className={
                                this.props.displaySimilar ? 
                                "card-body" : 
                                "card-body ".concat("hide")
                            }
                            >  
                            {}
                    </div>
                </div>
            </div>
        )
    }
}

export default SimilarityResults;