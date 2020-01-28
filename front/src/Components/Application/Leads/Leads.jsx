import React, { Component } from "react";
import Board from "react-trello";

import "./Leads.css";

export default class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        lanes: [
          {
            id: undefined,
            title: undefined,
            cards: [
              {
                id: undefined,
                title: undefined,
                description: undefined
              }
            ]
          }
        ]
      }
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/stages");
    let result = await response.json();
    let responseLead = await fetch("/leads");
    let resultLeads = await responseLead.json();
    const lanes = [];
    const cards = [];

    resultLeads.map(element => {
      // console.log(element);
      cards.push({
        id: element._id,
        title: element.name,
        description: element.details,
        stageId: element.stageID
      });
    });

    result.map(element => {
      // console.log(element);
      lanes.push({
        id: element._id,
        title: element.name,
        cards: cards
      });
    });

    this.setState({
      data: {
        lanes
      }
    });
  };

  onLaneAdd = async params => {
    // console.log(params);
    let response = await fetch("/stages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.title
      })
    });
    // let result = await response.json();
    // console.log(result);
  };

  onLaneDelete = async params => {
    // console.log(params);
    let response = await fetch(`/stages/${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params.id
      })
    });
  };

  onCardAdd = async params => {
    console.log(params);

    let response = await fetch("/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.title,
        details: params.description
      })
    });
  };

  onCardDelete = async params => {
    alert("deleting card");
  };

  render() {
    const fontfamily =
      "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
    const style = {
      backgroundColor: "white",
      fontFamily: fontfamily
    };
    const laneStyle = {
      backgroundColor: "white",
      border: "1px solid black",
      fontFamily: fontfamily,
      //   fontWeight: "bold",
      borderRadius: 0
    };
    const cardStyle = {
      border: "1px solid black",
      fontFamily: fontfamily,
      borderRadius: 0
    };

    return (
      <div>
        {!this.state.data ? (
          <div>LoADING</div>
        ) : (
          <Board
            data={this.state.data}
            /*data={data}*/
            editable
            laneDraggable={false}
            canAddLanes
            editLaneTitle
            onLaneAdd={this.onLaneAdd}
            onLaneDelete={this.onLaneDelete}
            onCardDelete={this.onCardDelete}
            onCardAdd={this.onCardAdd}
            style={style}
            laneStyle={laneStyle}
            cardStyle={cardStyle}
            /*
      components={{Card: CustomCard}}
      onCardClick={onCardClick} */
          />
        )}
      </div>
    );
  }
}

// const buttonTextChange = () => {
//   console.log(document.getElementsByClassName("sc-fzXfNM"));
//   const button = document.getElementsByClassName("sc-fzXfNM")[0];
//   button.getElementsByClassName("cJIuoU")[0].innerHTML =
//     "Click to add new stage";
// };

// buttonTextChange();
