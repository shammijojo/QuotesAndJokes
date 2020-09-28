import React from 'react';
import './App.css';
import App from './App';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import logo from './logo.svg';
import axios from 'axios';
import NavigateNext from '@material-ui/icons/NavigateNext'; 
import NavigateBefore from '@material-ui/icons/NavigateBefore'; 
import Search from '@material-ui/icons/Search';
import { IconButton, FormControlLabel, Select, Checkbox } from '@material-ui/core';

class Jokes extends React.Component{
    constructor(){
        super();
        this.state={
            data: [],
            search_criteria: '',
            endpoint: '',
            text: '',
            category: ''
        };
    };


    componentDidMount(){
      document.getElementById('jokes').style.background='#99b9ff';
     // document.getElementById('jokes').style.color='red';
      this.setState({endpoint: 'https://official-joke-api.appspot.com/random_ten',search_criteria: 'all'})
      axios.get("https://official-joke-api.appspot.com/random_ten")
     .then(response=>{
        this.setState({data: response.data});
        console.log(this.state.data);
      // alert(this.state.page)
  });
  }

  updateText(value){
    //  alert(value);
      this.setState({text: value});
    // alert(this.state.tex);
  }

  searchby(){
    if(this.state.search_criteria=='type'){
      this.searchbytype();
    }
    else{
      this.componentDidMount();
    }
  }

  setsearchingcriteria(e){
    this.setState({search_criteria: e.target.value});
  }

  searchbytype(e){
    this.setState({endpoint: 'https://official-joke-api.appspot.com/jokes/'+this.state.text+'/ten'})
    axios.get("https://official-joke-api.appspot.com/jokes/"+this.state.text+"/ten")
     .then(response=>{
        this.setState({data: response.data});
        console.log(this.state.data);
      // alert(this.state.page)
  });
  }

changecolor(id){
  document.getElementById('quote').style.color='blue'
  document.getElementById('jokes').style.color='blue'
  document.getElementById(id).style.color='red'
  this.setState({category: id})
}

render(){

  if(this.state.category=='quote'){
    return <App></App>
   } 

const quotes=this.state.data;
var demo=[];

  for(var i=0;i<this.state.data.length;i++)
  {
    if(i%2==0){
      demo.push(
    <div id ="quotelayout">
      <p>{quotes[i].setup}</p>
      <p>- {quotes[i].punchline}</p>
    </div>
      )
    }
    else{
      demo.push(
        <div id ="quotesecondlayout">
        <p>{quotes[i].setup}</p>
        <p>- {quotes[i].punchline}</p>
   </div>
     )
    }
  }

    return(
    <body>
    <div class="sidenav">
    <List id="mylist">
    <ListItem id="quote" button onClick={()=>{this.changecolor('quote')}}><ListItemText primary={<b>Quotes</b>}></ListItemText></ListItem>
    <ListItem id="jokes" button onClick={()=>{this.changecolor('jokes')}}><ListItemText primary={<b>Jokes</b>}></ListItemText></ListItem>
    </List>
    </div>

    <div class="searchlayout">
      <p>Search By:</p>
      <input type="radio" name="radiogroup" id='type' value='type' style={{marginTop: '20px'}}  onChange={(e)=>this.setsearchingcriteria(e)}></input><p>Type</p>
      <input type="radio" name="radiogroup" id='all' value='all' checked={this.state.search_criteria=='all'} style={{marginTop: '20px'}}  onChange={(e)=>this.setsearchingcriteria(e)}></input><p>All</p>
    </div>

    <div class="searchlayout">
      <input type="text" id="searchbox"  onChange={(e)=>this.updateText(e.target.value)}></input>
      <IconButton style={{marginTop: '-10px'}} onClick={()=>this.searchby()}>
      <Search  style={{color: 'blue'}}></Search>
      </IconButton>
    </div>

    <div>{demo}</div>

    <div id="navigate">
      <IconButton onClick={()=>this.searchby()}>
      <NavigateNext style={{fontSize: '58px',color: 'blue'}}></NavigateNext>
      </IconButton>
  </div>

    </body>
    );
}

}

export default Jokes;