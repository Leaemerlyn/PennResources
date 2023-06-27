import { Panel, Placeholder, Row, Col } from 'rsuite';

const Card = props => (
  <Panel {...props} bordered header="Lea Emerlyn">
    <p>leaemerlyn@seas.upenn.edu</p>
  </Panel>
);

const Card1 = props => (
  <Panel {...props} bordered header="Ben Swanson">
    <p>bswan1@seas.upenn.edu</p>
  </Panel>
);

const Card2 = props => (
  <Panel {...props} bordered header="Abdullah Amer">
    <p>abdamer@seas.upenn.edu</p>
  </Panel>
);

const Card3 = props => (
  <Panel {...props} bordered header="Leven Cai">
    <p>levencai@seas.upenn.edu</p>
  </Panel>
);


export function Contact () {
    return (
        <>
            <Row>
              <Col md={6} sm={12}>
                <Card />
              </Col>
              <Col md={6} sm={12}>
                <Card1 />
              </Col>
              <Col md={6} sm={12}>
                <Card2 />
              </Col>
              <Col md={6} sm={12}>
                <Card3 />
              </Col>
            </Row>
        </>
    )
}