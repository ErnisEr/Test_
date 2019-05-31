import React, {Component} from 'react';
import Countries from "./components/Counrties"
export default class App extends Component {

  render (){
    return(
      <div className="App">
        <div className="allWrap">
          <Countries/>
        </div>
      </div>
  )} ;
}
