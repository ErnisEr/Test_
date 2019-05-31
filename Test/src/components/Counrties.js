import React, {Component} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Countries extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      proxyTypeAnonymous: "",
      proxyTypeTransparent: "",
      proxyTypeElite: "",
      lang: "Выбрать страну",
      alive: false,
      dropdownOpen: false,
    };
    this.checkboxRefs = React.createRef()
    window.addEventListener("change", this.Start)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  myFunc = () => {
  const url = "https://proxyfordevelopers.com/api/proxies/?format=json";

  const checkboxTransparent = document.querySelector(".checkboxTransparent")
  const checkboxAnonymous = document.querySelector(".checkboxAnonymous")
  const checkboxElite = document.querySelector(".checkboxElite")
  const checkboxAlive = document.querySelector(".checkboxAlive")
  fetch(url)
    .then(response => response.json())
    .then(data => {

    this.setState({
      data : data
    })

    if(checkboxTransparent.checked != true){
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeTransparent: ""
        })
      }
    }
    else{
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeTransparent: "o"
        })
    }
    }
//////////////////////////
    if(checkboxAnonymous.checked != true){
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeAnonymous: ""
        })
      }
    }
    else{
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeAnonymous: "1"
        })
      }
    }
//////////////////////////
    if(checkboxElite.checked != true){
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeElite: "",
        })
      }
    }
    else{
      for (let i = 0; i < data.length; i++) {
        this.setState({
          proxyTypeElite: "2",
        })
      }
    }
//////////////////////////
    if(checkboxAlive.checked != true){
      for (let i = 0; i < data.length; i++) {
        this.setState({
          alive: false,
        })
      }
      console.log(this.state.alive);
    }
    else{
      for (let i = 0; i < data.length; i++) {
        this.setState({
          alive: true,
        })
      }
      console.log(this.state.alive);
      
    }
//////////////////////////
    })
    .catch(e => console.log(e))
  }
  Ru = () => {
    this.setState({
      lang: "RU"
    })
    console.log(this.state.langAttr);
  }
  En = () => {
    this.setState({
      lang: "EN"
    })
    console.log(this.state.langAttr);
  }
  Start = () => {
    const checkboxAlive = document.querySelector(".checkboxAlive")
    if(checkboxAlive.checked != true){
      this.setState({
        alive: false
      })
    }
    else{
      this.setState({
        alive: true
      })
      this.myFunc()
    }
  }


  render (){
    return(
      <div className="cont">
          <div className="leftContent">
            <ButtonDropdown color="default" size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret className="lang">
                  {this.state.lang}
                </DropdownToggle>
                <DropdownMenu>
                 <DropdownItem onClick={this.Ru}>RU</DropdownItem>
                 <DropdownItem onClick={this.En}>EN</DropdownItem>
              </DropdownMenu> 
            </ButtonDropdown>
            
            <div className="proxyTypeContent">
                    <label>
                      <input onClick={this.TransparentProxy} className="checkboxTransparent" type="checkbox"/>
                      <p>Transparent</p>
                    </label>
                    <label>
                      <input onClick={this.AnonymousProxy} className="checkboxAnonymous" type="checkbox"/>
                      <p>Anonymous</p>
                    </label>
                    <label>
                      <input onChange={this.EliteProxy} className="checkboxElite" type="checkbox"/>
                      <p>Elite</p>
                    </label>
            </div>
            
            <div className="aliveContent">
              <label>
                <input className="checkboxAlive" type="checkbox"/>
                <p>Alive</p>
              </label>
            </div>

          </div>
          <div className="rightContent">
            {this.state.data.map(data =>
            data.country == this.state.lang &&
            data.alive == this.state.alive ||
            data.proxy_type == this.state.proxyTypeTransparent ||
            data.proxy_type == this.state.proxyTypeAnonymous ||
            data.use_counter == this.proxyTypeElite  ? 
                <div className="dataContent" key={data.id}>
                <p><strong>host </strong><br/> {data.host}</p>
                <p><strong>created </strong><br/>  {data.created}</p>
                <p><strong>modified </strong><br/>  {data.modified}</p>
                <p><strong>port </strong><br/>  {data.port}</p>
                <p><strong>country </strong><br/>  {data.country}</p>
                <p><strong>alive </strong><br/>  {data.alive}</p>
                <p><strong>last_check_time </strong><br/>  {data.last_check_time}</p>
                <p><strong>busy_until </strong><br/>  {data.busy_until}</p>
                <p><strong>proxy_type </strong><br/>  {data.proxy_type}</p>
                <p><strong>port_response_time </strong><br/>  {data.port_response_time}</p>
                <p><strong>chargeable </strong><br/>  {data.chargeable}</p>
                <p><strong>use_counter </strong><br/>  {data.use_counter}</p>
                <p><strong>protocol </strong><br/>  {data.protocol}</p>
                <p><strong>source_of_proxy </strong><br/> {data.source_of_proxy}</p>
                </div> : ""
            )}
          </div>
        </div>
    )} ;
}
export default Countries;
