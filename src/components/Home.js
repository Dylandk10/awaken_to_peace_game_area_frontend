
import { useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { killGameTick } from './BreathingHome';

const Home = (prop) => { 
    const nav = useNavigate();

    const launchGame = (num) => {

        //nav to the game based on the click performed
        switch(num) {
            case 1:
                nav('/breathing-app');
                break;
        }
    }

    useEffect(() => {
        killGameTick();
    }, []);



    return (
        <div id="homePage">
            
            <Container fluid="md" id="homeContainer">
                <Row>
                    <Col>
                    <h1 >Awaken To Peace</h1>
                    <h3 id="gameArea"> - Game Area - </h3>
                    </Col>
                </Row>
                <hr></hr>

                {/* must be one row and one column for each element */}

                <Row>
                    <Col>
                        <div className="gamecontainer" onClick={() => launchGame(1)}>
                            <h3>Breathing Technique</h3>
                            <hr></hr>
                            <span>
                                A breathing technique application to help reground your body and mind. This technique follows the 4-7-8 breathing exercise. 
                                Breathe in for four seconds, hold for seven seconds, 
                                then breathe out for eight seconds. Repeat this process four times. We recommend listening to relaxing music as you preform this
                                exercise.
                            </span>
                        </div>
                    </Col>
                </Row>

            </Container>
            
        </div>
    )
}
    
export default Home;