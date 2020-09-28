import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import NavigateNext from '@material-ui/icons/NavigateNext'; 
import NavigateBefore from '@material-ui/icons/NavigateBefore'; 
import Search from '@material-ui/icons/Search';
import { IconButton, FormControlLabel, Select, Checkbox } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Jokes from './Jokes';




class App extends React.Component{
  constructor(){
    super();
    this.state={
      loaded: false,
      data: [],
      page: 1,
      search_criteria: '',
      text: '',
      endpoint: ''
    };
  };

componentDidMount(){
  document.getElementById('quote').style.background='#99b9ff';
  this.setState({search_criteria: 'all'})
  this.setState({endpoint: 'https://quote-garden.herokuapp.com/api/v2/quotes?page='})
  axios.get("https://quote-garden.herokuapp.com/api/v2/quotes?page="+this.state.page)
  .then(response=>{
    console.log(response.data);
      this.setState({data: response.data.quotes});
      console.log(this.state.data);
     // alert(this.state.page)
  });
}

updateText(value){
  //  alert(value);
    this.setState({text: value});
  //  alert(this.state.textbox);
}

setsearchingcriteria(e){
  this.setState({search_criteria: e.target.value});
}

searchby(){
   // document.getElementById('keyword').Select=false
    //this.setState({search_criteria: e.target.value},()=>{
    alert(this.state.search_criteria);
    console.log(this.state.search_criteria);
    alert(this.state.text);
    if(this.state.search_criteria=='genre'){
    this.searchbygenre();}
    else if(this.state.search_criteria=='author'){
    this.searchbyauthor();}
 // });
}

searchbygenre(){
  alert('searchbygenre');
  this.setState({endpoint: 'https://quote-garden.herokuapp.com/api/v2/genre/'+this.state.text+'?page='})
  axios.get("https://quote-garden.herokuapp.com/api/v2/genre/"+this.state.text+"?page=1")
  .then(response=>{
    this.setState({data: response.data.quotes,page: 1});
    console.log(this.state.data);
  });
}

searchbyauthor(){
  alert('searchbyauthor');
  this.setState({endpoint: 'https://quote-garden.herokuapp.com/api/v2/authors/'+this.state.text+'?page='})
  axios.get("https://quote-garden.herokuapp.com/api/v2/authors/"+this.state.text+"?page=1")
  .then(response=>{
    this.setState({data: response.data.quotes,page: 1});
    console.log(this.state.data);
  });
}

searchbyall(){
  this.setState({endpoint: 'https://quote-garden.herokuapp.com/api/v2/quotes?page='})
  axios.get("https://quote-garden.herokuapp.com/api/v2/quotes?page=1")
  .then(response=>{
      this.setState({data: response.data.quotes,page: 1});
      console.log(this.state.data);
      //alert(this.state.page)
  });
}

prevpage(){
  if(this.state.page==1){
    alert("ALREADY ON THE FIRST PAGE");
    return;
  }
  axios.get(this.state.endpoint+(this.state.page-10))
  .then(response=>{
      this.setState({data: response.data.quotes,page: this.state.page-10});
      console.log(this.state.data);
     // alert(this.state.page)
  });
}


nextpage(){
  console.log(this.state.endpoint+(this.state.page+10))
  axios.get(this.state.endpoint+(this.state.page+10))
  .then(response=>{
      this.setState({data: response.data.quotes,page: this.state.page+10});
      console.log(this.state.data);
      alert(this.state.page)
  });
}

displayquotes(){
  const quotes=this.state.data;
  quotes.map((d) => {
    return(
    <div>
      <p>{d.quoteText}</p>
    </div>
    );
  })
}


changecolor(id){
  document.getElementById('quote').style.color='blue'
  document.getElementById('jokes').style.color='blue'
  document.getElementById(id).style.color='red'
  this.setState({category: id})
}


render(){

  if(this.state.category=='jokes'){
    return <Jokes></Jokes>
   } 

  const quotes=this.state.data;
  var demo=[];

  for(var i=0;i<this.state.data.length;i++)
  {
    if(i%2==0){
      demo.push(
         <div id ="quotelayout">
      <p>{quotes[i].quoteText}</p>
      <p id="authorname">- {quotes[i].quoteAuthor}</p>
    </div>
      )
    }
    else{
      demo.push(
        <div id ="quotesecondlayout">
        <p>{quotes[i].quoteText}</p>
        <p id="authorname">- {quotes[i].quoteAuthor}</p>
   </div>
     )
    }
  }


  return (
    <body>
    


    <div class="sidenav">
    <List id="mylist">
    <ListItem id="quote" button onClick={()=>{this.changecolor('quote')}}><ListItemText primary={<b>Quotes</b>}></ListItemText></ListItem>
    <ListItem id="jokes" button onClick={()=>{this.changecolor('jokes')}}><ListItemText primary={<b>Jokes</b>}></ListItemText></ListItem>
    </List>
    </div>

<div id="demo">    
    <div class="searchlayout">
      <p>Search By:</p>
      <input type="radio" name="radiogroup" id='genre' value= 'genre' style={{marginTop: '20px'}} onChange={(e)=>this.setsearchingcriteria(e)}></input><p>Genre</p>
      <input type="radio" name="radiogroup" id='author' value='author' style={{marginTop: '20px'}}  onChange={(e)=>this.setsearchingcriteria(e)}></input><p>Author</p>
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
    <IconButton onClick={()=>this.prevpage()}>
      <NavigateBefore style={{fontSize: '58px',color: 'blue'}}></NavigateBefore>
      </IconButton>
      <IconButton onClick={()=>this.nextpage()}>
      <NavigateNext style={{fontSize: '58px',color: 'blue'}}></NavigateNext>
      </IconButton>
  </div>

  </div>
    </body>
  );
  }


}


 

export default App;
