import React, { Component } from 'react';
import Map from './../Map/Map';
import './GroupEvent.css'
import logo from '../../assets/images/mw.png';
export default class GroupEvent extends Component {
  constructor(){
    super();

    this.state={
      yelp:[],
      markers:[],
      scrollPosition:0,
      showMap:false,
    }

    this.getYelp = this.getYelp.bind(this)
    this.scrollPosition = this.scrollPosition.bind(this);
  }

  componentDidMount() {
    let main = document.getElementById("mainYelpList")
    main.addEventListener("scroll",this.scrollPosition)
  }

  getYelp(arr){
    this.setState({yelp:arr.businesses},()=>this.displayYelp());
  }

  displayBorder(e){
    let newYelp = this.state.yelp.slice();
    let index = newYelp.findIndex(i=>i.id === e);
    
    newYelp[index].checked = !newYelp[index].checked

    this.setState({yelp:newYelp})
    
  }

  displayYelp(){
    if(this.state.yelp){
    return this.state.yelp.map(e=>{
      return (<div className="yelpListContainer" id={encodeURI(e.name)} onClick={() => this.displayBorder(e.id)}>

      {e.image_url ?  
        <img src={e.image_url} />
        :
        <img className="logo-filler" src={logo} />}


      <div className="blackout"></div>
      {e.checked ? <div className="border"></div> : ''}
      <div className="detailsContainer">
        <div className="yelpName">{e.name}</div>
        
        <div>Rating:{e.rating}</div>
        <div className="yelpDistance">{(e.distance.toFixed(0)/1609.34).toFixed(2)} mi away from midpoint</div>
      </div>
    </div>)
    })
  }
  else{
    return <div>HI</div>
  }
  }

  scrollPosition(){
    
    // if(document.getElementById("mainYelpList")){
    //   let main = document.getElementById("mainYelpList").scrollTop;
    //   if(main !== this.state.scrollPosition){
    //     this.setState({scrollPosition:main,showMap:false})
    //   }
    // }
  }

  getSelectedInfoBox(e){
    let id = document.getElementById(encodeURI(e)).offsetTop
    let start = document.getElementById("mainYelpList").scrollTop

    document.getElementById("mainYelpList").scrollTo(0,id-220)
  }
  render() {
    return (
      <div className="mainGroupEventContainer">
        {this.state.showMap ?
        <div className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Hide Map</button>
        <div className="mapContainer mapMoveDown">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        </div> : 
        <div  className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Show Map</button>
         
        <div className="mapContainer mapMoveUp">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        </div>}
        <div className="mainYelpList" id="mainYelpList" onscroll={this.scrollPosition()}>
        <div className="yelpList" id="yelpList"  onscroll={()=>this.scrollPosition()}>
          {this.displayYelp()}

        </div>
        </div>
      </div>
    );
  }
}