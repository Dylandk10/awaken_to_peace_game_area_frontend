import { useEffect, useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';

const QuoteGameHome = (prop) => { 
    const [quote, setQuote] = useState({});
    const [optionArray, setOptionArray] = useState([]);
    const [optionValue, setOptionValue] = useState("0"); //0 means no option picked, 4 is the correct answer
    const [streak, setStreak] = useState(0);
    const [highscore, setHighscore] = useState(localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore')) : 0);

    const getQuote = async () => {
        //set the inital quote
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "/gameRoute/getGameQuote");
        setQuote(response.data);
        let array = [];
        array[0] = {'name':response.data.option1, value: 1};
        array[1] = {'name':response.data.option2, value: 2};
        array[2] = {'name':response.data.option3, value: 3};
        array[3] = {'name':response.data.author, value: 4};
        shuffle(array);
        setOptionArray(array);
    };


    //shuffle the options so they are randomly displayed
    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }



      const checkAnswer = () => {
        if(optionValue === "0") {
            displayErrorMessage(true);
        } else {
            displayErrorMessage(false);

            //correct answer
            if(optionValue === "4") {
                //add to the stream and get next questions
                setStreak(streak + 1);
                setOptionValue("0");
                getQuote();
            } else {
                //end the game
                endGame();
            }
        }
      }


      const endGame = () => {
        if(streak > highscore) {
            setHighscore(streak);
            localStorage.setItem('highscore', streak);
        }
        document.getElementById('quoteGameArea').style.display = "none";
        document.getElementById('quoteGameArea').style.visibility = 'hidden';
        document.getElementById('quoteGameGameOver').style.display = "block";
        document.getElementById('quoteGameGameOver').style.visibility = "visible";
      };



      //error message display when a user does not select a value
      const displayErrorMessage = (bool) => {
        if(bool) {
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('errorMessage').style.visibility = "visible";
        } else {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('errorMessage').style.visibility = "hidden";
        }
      };

      const restartGame = () => {
        setOptionValue("0");
        setStreak(0);
        getQuote();
        document.getElementById('quoteGameGameOver').style.display = "none";
        document.getElementById('quoteGameGameOver').style.visibility = "hidden";
        document.getElementById('quoteGameArea').style.display = "block";
        document.getElementById('quoteGameArea').style.visibility = 'visible';
      }




    //intial launch when page is loaded
    useEffect(() => {
        getQuote();
    }, []);


    return (
        <div>
            <Container fluid="md" id="quoteGameContainer">
                <h3>{quote.quote}</h3>
                <hr />
                {/*options for the game */}
                <Row id="quoteGameArea">
                {optionArray.map((radio, idx) => (
                    <Col key={idx} className="optionBtn">
                    <ToggleButton
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={radio.value}
                        className="optionBtn"
                        checked={optionValue == radio.value}
                        onChange={(e) => setOptionValue(e.currentTarget.value)}
                     >
                    {radio.name}
                    </ToggleButton>
                    </Col>
                ))}
            
                <Button variant="secondary" onClick={() => checkAnswer()}>Submit</Button>
                <span id="errorMessage">Please select an option.</span>
                </Row>

                {/*Game over Screen */}
                <Row id="quoteGameGameOver">
                    <h3>Game Over</h3>
                    <span>Your Streak {streak}</span> <br />
                    <span>Highscore {highscore}</span> <br />
                    <Button variant="outline-success" onClick={() => restartGame()}>Restart</Button>
                </Row>
            </Container>
            
        </div>
    )
}
    
export default QuoteGameHome;