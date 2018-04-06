import React, { Component } from 'react';
import Map from './../Map/Map';
import './GroupEvent.css'
export default class GroupEvent extends Component {
  constructor(){
    super();

    this.state={
      yelp:[],
      markers:[],
      scrollPosition:0,
      closeMap:false,
    }

    this.getYelp = this.getYelp.bind(this)
    this.scrollPosition = this.scrollPosition.bind(this);
  }

  componentDidMount() {
    document.getElementById("mainYelpList").addEventListener("scroll",this.scrollPosition)
  }

  getYelp(arr){
    this.setState({yelp:arr.businesses},()=>this.displayYelp());
  }

  displayBorder(e){
    let newYelp = this.state.yelp.slice();
    let index = newYelp.findIndex(i=>i.id === e);
    
    newYelp[index].checked = !newYelp[index].checked

    this.setState({yelp:newYelp});
    
  }

  displayYelp(){
    if(this.state.yelp){
    return this.state.yelp.map(e=>{
      return(<div className="yelpListContainer" id={encodeURI(e.name)} onClick={()=>this.displayBorder(e.id)} onscroll={()=>this.scrollPosition()}>
      <img src={e.image_url} />
      <div className="blackout"></div>
      {e.checked ? <div className="border"></div> : ''}
      <div className="detailsContainer">
        <div className="yelpName">{e.name}</div>
        
        <div>Price:{e.price} <br/> Rating:{e.rating}</div>
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
    let main = document.getElementById("mainYelpList")
    if(main && this.state.scrollPosition !== main.scrollTop){
      if(main.scrollTop > 300 || (this.state.scrollPosition - main.scrollTop) < 100) {
        console.log("MOVEMAPHEIGHT")
      this.setState({scrollPosition:main.scrollTop,closeMap:true})
        if(180-main.scrollTop < -300){
          document.getElementById('mainYelpList').style.marginTop = (300-main.scrollTop) + "px";
        // document.getElementById('mainYelpList').style.height = "101vh";
        }
      document.getElementById('mainYelpList').style.marginTop =  "-100px"; 
      if(document.getElementById('moveMap').style.height < 20){
        document.getElementById('moveMap').style.height = 0 + "px";
      }
      else{
      document.getElementById('moveMap').style.height = (280-main.scrollTop) + "px";
      }
      }
      else{
        this.setState({scrollPosition:main.scrollTop,closeMap:false})
        document.getElementById('mainYelpList').style.marginTop = "0px";
      }
    }
  }

  getSelectedInfoBox(e){
    let id = document.getElementById(encodeURI(e)).offsetTop
    let start = document.getElementById("mainYelpList").scrollTop
    // for (var i = start; i >= id-220; i++) {
    //   (function(index) {
    //       setTimeout(function() { document.getElementById("mainYelpList").scrollTo(0,index) }, i * 100);
    //   })(i);
    // }
    // document.getElementById("mainYelpList").scrollTo(0,id-220)
      // window.scroll(0,id.y+500)
  }
  render() {
    return (
      
      <div className="mainGroupEventContainer">
        {this.state.closeMap ? <div className="moveMap" id="moveMap">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div> :
        <div className="mapContainer">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        }
        <div className="mainYelpList" id="mainYelpList" onscroll={this.scrollPosition()}>
        <div className="yelpList" id="yelpList"  onscroll={()=>this.scrollPosition()}>
          {this.displayYelp()}

        </div>
        </div>
      </div>
    );
  }
}