import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class ResearchPage extends React.Component {

    state = {
        selectedVolume: undefined,
        selectedQuestion: undefined,
        selectedArticle: undefined,
        data:[],
        filteredData:undefined,
    }

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

    // Handle Select
    handleInputChange(e, cat) {
        //console.log(event.target.value);
        if (cat === "volume"){

            // Get things we know
            let volume = e.target.value;

            // Update the selected question
            const filteredData = this.state.data.filter(item => item.volume === volume);
            const selectedQuestion = filteredData[0].questionTitle;
            const filteredTwice = filteredData.filter(item => item.questionTitle === selectedQuestion);
            const selectedArticle = filteredTwice[0].articleTitle;

            // Set state
            this.setState({
                selectedVolume:volume,
                selectedQuestion:selectedQuestion,
                selectedArticle:selectedArticle
            });
        }
        else if (cat === "question"){

            // Get things we know
            let volume = this.state.selectedVolume;
            let question = e.target.value;

            // Update the selected question
            const filteredData = this.state.data.filter(item => item.volume === volume);
            const filteredTwice = filteredData.filter(item => item.questionTitle === question);
            const selectedArticle = filteredTwice[0].articleTitle;

            // Set state
            this.setState({
                selectedVolume:volume,
                selectedQuestion:question,
                selectedArticle:selectedArticle
            });
        }
        else if (cat === "article"){

            // Set state
            this.setState({
                selectedArticle:e.target.value,
            });
        }
        else{
            console.log("Something went wrong");
        }

        //console.log(this.state.data.filter(item => item.articleTitle === this.state.selectedArticle));
    }
    naturalCompare = (a, b) => {
        var ax = [], bx = [];
    
        a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
        
        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if(nn) return nn;
        }
    
        return ax.length - bx.length;
    }

    render(){

        return(
            <div>
                <Container>
                    <br></br>
                    <Row>
                        <h1>Research Page</h1>
                    </Row>
                    <Col>
                        <Row> 
                                <div id="volume-select-div">
                                    <h2>Volume</h2>
                                    <select className="form-control selectpicker"
                                            defaultValue={this.state.selectedVolume}
                                            onChange={(e) => this.handleInputChange(e, 'volume')}
                                            >
                                            {
                                            Array.from(new Set(this.state.data
                                                .map(item => item.volume)))
                                                .sort()
                                            .map((uniqueVolumes,i) => 
                                                <option key={i} value={uniqueVolumes}>{uniqueVolumes}</option>
                                            )
                                            }
                                </select>
                                </div>
                        </Row>
                        <Row> 
                                <div id="question-select-div">
                                    <h2>Question</h2>
                                    <select className="form-control selectpicker"
                                            data-live-search={true}
                                            defaultValue={this.state.selectedQuestion}
                                            onChange={(e) => this.handleInputChange(e, 'question')}>
                                        {
                                            Array.from(new Set(this.state.data
                                                .filter(item => item.volume === this.state.selectedVolume)
                                                .map(item => item.questionTitle)))
                                                .sort((a,b) => this.naturalCompare(a,b))
                                            .map((uniqueQuestion,i) => 
                                                <option key={i} value={uniqueQuestion}>{uniqueQuestion}</option>
                                            )
                                        }
                                </select>
                            </div>
                        </Row>
                        <Row> 
                                <div id="article-select-div">
                                    <h2>Article</h2>
                                    <select className="form-control selectpicker"
                                            defaultValue={this.state.selectedArticle}
                                            onChange={(e) => this.handleInputChange(e, 'article')}>
                                            {
                                            Array.from(new Set(this.state.data
                                                .filter(item => item.questionTitle === this.state.selectedQuestion)
                                                .map(item => item.articleTitle)))
                                                .sort((a,b) => this.naturalCompare(a,b))
                                            .map((uniqueArticle,i) => 
                                                <option key={i} value={uniqueArticle}>{uniqueArticle}</option>
                                            )
                                        }
                                </select>
                                </div>
                        </Row>
                    </Col>
                    <br></br>
                    <hr></hr>
                    <div className="explore-results-div">
                        {this.state.data
                            .filter(item => item.articleTitle === this.state.selectedArticle)
                            .map((item, i) => (
                                <div key={i} className="search-results">
                                    <h3>Objections</h3>
                                        {item.articleObjection.map((obj,j) => (
                                            <p key={j} className="objection-item">{obj}</p>
                                        ))}
                                    <h3>Body ...</h3>
                                    {item.articleBody}
                                    <p></p>
                                    <h3>Reply to Objections ...</h3>
                                        {item.articleReplyToObjections.map((obj,j) => (
                                            <p key={j}>{obj}</p>
                                        ))}
                                </div>
                            ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default ResearchPage;