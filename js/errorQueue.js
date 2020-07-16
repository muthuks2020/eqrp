// const axios = require('axios');
localStorage.setItem('eliminated',[]);
const BASE_URL='https://crosssolved.herokuapp.com/https://termite.rmq.cloudamqp.com/api/queues/ngqgcdqs';

// let valueArray;

fetch(`${BASE_URL}`,{
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Authorization': 'Basic '+btoa(`ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2`)
})
}).then((response) => {
    return response.json();
  })
  .then((myJson) => {
        // console.log(myJson);
        let DLQ=0;
        let BLQ=0;
        let Poison=0;
        let totalmsg=0;
        let arr=[];
        myJson.forEach(element => {
          const value=element.name.split('.');
          let meta=value[value.length-2].concat(`.${value[value.length-1]}`)
          if(!arr.includes(meta))
              arr.push(meta)

          if(value[0]==='DLQ')
              DLQ+=element.messages;
          else if(value[0]==='BLQ')
              BLQ+=element.messages;
          else if (value[0]==='Poison')
              Poison+=element.messages;
          else  
              totalmsg+=element.messages;

        });
        // localStorage["sidePanel"]=arr;
        // var colors = ["red","blue","green"];
        localStorage.setItem("sidePanel", JSON.stringify(arr)); //store arr
        
        document.getElementById('BLQ').innerText=BLQ;        
        document.getElementById('DLQ').innerText=DLQ;
        document.getElementById('Poison').innerText=Poison;
        document.getElementById('total').innerText=totalmsg;
        arr.forEach(element=>{
          let ele=document.createElement("li");
          ele.innerHTML=`<a id=${element} href="transactions.html" onclick="mainFn(this.id)"> ${element}</a>`
          var ul=document.getElementById("side-menu");
          ul.appendChild(ele);
        }
        )
  });



  
function mainFn(clicked){
  const value= document.getElementById(clicked).innerText;
  console.log(value);
  localStorage.setItem("ole",value);

// function testJS() {
//     var b = document.getElementById('Orders.Fulfillment').value,
//         url = 'http://127.0.0.1:8080/pages/tables.html?name=' + encodeURIComponent(b);

//     document.location.href = url;
    
//     console.log(document.location.href);
// }
}