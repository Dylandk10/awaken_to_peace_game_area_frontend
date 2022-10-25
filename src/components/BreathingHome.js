import { useEffect, useState } from 'react';
import {Container, Row, Col, ProgressBar} from 'react-bootstrap';
import axios from 'axios';


let downloadTimer = null;
let quoteTimer = null;
const BreathingHome = (prop) => { 
    const [label, setLabel] = useState("Ready in");
    const [seconds, setSeconds] = useState(3);
    let progress = 0;
    const [p, setP] = useState(progress); //progress green bar
    const [nonP, setNonP] = useState(100); //non progress red bar in progress bar
    const [quote, setQuote] = useState({});




    //main game tick timer
    const startTime = (stage, sec, newLabel) => {
        let timeleft = sec;
        setLabel(newLabel);
        setFontColorAndBackgroundColor(stage);

        //main interval
        downloadTimer = setInterval(function(){
            timeleft -= 1;
            setSeconds(timeleft);
            if(stage === 0) {
                setLabel(`Get Ready ${timeleft}`);
            }

            if(timeleft < 1) {
                clearInterval(downloadTimer);

                //if stage !== 0 add to the progress bar
                if(stage !== 0) {
                    progress += 8.4;

                    //terminate the progress as it is at 100
                    if(progress >= 100) {
                        progress = 100;
                        setNonP(nonP - progress);
                        setP(progress);
                        document.getElementById("seconds").classList.add("hidden");
                        document.getElementById("quoteArea").classList.add("hidden");
                        document.getElementById("menuBtn").classList.remove("hidden");
                        setLabel("Completed!");
                        clearInterval(quoteTimer);
                        return;
                    }

                    //always update the progress bar
                    setNonP(nonP - progress);
                    setP(progress);

                    //3rd stage grab a new quote and reset the stage back to 0 so when we call it below its stage+1
                    if(stage >= 3) {
                        stage = 0;
                        axios.get(process.env.REACT_APP_BASE_URL+"/gameRoute/getSingleRandomQuote")
                        .then((response) => {
                            setQuote(response.data);
                        });
                    }
                
                }

                //always update seconds, label and stage
                const sec = getSeconds(stage);
                setSeconds(sec);
                const lab = getNewLabel(stage);
                startTime(stage+1, sec, lab);
            }
        }, 1000);
    };




    const getSeconds = (s) => {
        if(s === 0) {
            return 4;
        } else if(s === 1) {
            return 7;
        } else if(s === 2) {
            return 8;
        }
    };

    const getNewLabel = (s) => {
        if(s === 0) {
            return "INHALE";
        } else if(s === 1) {
            return "HOLD";
        } else if(s === 2) {
            return "EXHALE";
        }
    };


    const setFontColorAndBackgroundColor = (stage) => {
        //font coloring
        if(stage === 0) {
            document.getElementById("seconds").classList.add("hidden");
            document.getElementById("breathLabel").style.color = "black";
            document.getElementById("quoteArea").classList.add("hidden");
        }else{
            document.getElementById("seconds").classList.remove("hidden");
            document.getElementById("quoteArea").classList.remove("hidden");
            if(stage === 1) {
                document.getElementById("breathLabel").style.color = "#00bfff";
                document.getElementById("seconds").style.backgroundColor = "#00bfff";
            } else if(stage === 2) {
                document.getElementById("breathLabel").style.color = "#708090";
                document.getElementById("seconds").style.backgroundColor = "#708090";
            } else if(stage == 3) {
                document.getElementById("breathLabel").style.color = "#2e8b57";
                document.getElementById("seconds").style.backgroundColor = "#2e8b57";
            }
        }
    };


    const getQuote = async () => {
        //set the inital quote
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "/gameRoute/getSingleRandomQuote");
        setQuote(response.data);
    };

    useEffect(() => {
        getQuote();
        startTime(0, 3, "Get Ready 3");
    }, []);


    return (
        <div>
            
            <Container fluid="md" id="breathContainer">
                <Row>
                    <Col>
                        <ProgressBar>
                            <ProgressBar animated variant="success" now={p} />
                            <ProgressBar animated variant="danger" now={nonP} />
                        </ProgressBar>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <h1 id="breathLabel">{label}</h1>
                        <button id="menuBtn" type="button" className="btn btn-outline-success hidden">Return to Game Area</button>
                        <h2 id="seconds">{seconds}</h2>
                    </Col>
                </Row>
                <Row id="quoteArea">
                    <Col>
                        <h4>{quote.quote}</h4>
                        <span>-{quote.author}</span>
                    </Col>
                </Row>


            </Container>
            
        </div>
    )
}
    
export default BreathingHome;

//export this function to kill the game tick if the user leaves the page to ho home
export const killGameTick = () => {
    if(downloadTimer !== null) {
        clearInterval(downloadTimer);
    }
    if(quoteTimer !== null) {
        clearInterval(quoteTimer);
    }
};