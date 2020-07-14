
console.log(localStorage['ole'])

document.getElementById('mainHeading').innerHTML=localStorage['ole'];
// var resource='BLQ'.concat(`.${localStorage['ole']}`);
const BASE_URL=`https://crosssolved.herokuapp.com/https://termite.rmq.cloudamqp.com/api/queues/ngqgcdqs`;

// console.log(BASE_URL1);
// let val=localStorage['sidePanel'];
var storedColors = JSON.parse(localStorage.getItem("sidePanel"));
console.log(storedColors);
storedColors.forEach(element=>{
    let ele=document.createElement("li");
          ele.innerHTML=`<a id=${element} href="transactions.html" onclick="javascript:mainFn(this.id)"> ${element}</a>`
          var ul=document.getElementById("side-menu");
          ul.appendChild(ele);
})
var obj1={};
function setZero(){
if(localStorage.getItem(`DLQ${localStorage.getItem('ole')}`)===null && localStorage.getItem(`BLQ${localStorage.getItem('ole')}`)===null && localStorage.getItem(`Poison${localStorage.getItem('ole')}`)===null){
localStorage.setItem('DLQ'+localStorage.getItem('ole'),0);
localStorage.setItem('BLQ'+localStorage.getItem('ole'),0);
localStorage.setItem('Poison'+localStorage.getItem('ole'),0);
}
}
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
    console.log(myJson);
    let obj={};
    let sum=0;
    myJson.map(value=>{
        const arr=value.name.split('.');
        const key=arr[0];
        // console.log(arr[arr.length-2].concat(`.${arr[arr.length-1]}`));
        const arr1=arr[arr.length-2].concat(`.${arr[arr.length-1]}`);
        if(arr1===localStorage['ole']){
            obj[key]=value.messages;
            obj1[value.name]=value.messages;
            sum+=value.messages;
        }
    })
    
    // console.log(obj);
    for( var k in obj){
        if(k==='DLQ')
            document.getElementById('DLQ').innerText=obj[k]-localStorage.getItem('DLQ'+localStorage.getItem('ole'));
        else if(k==='BLQ')
            document.getElementById('BLQ').innerText=obj[k]-localStorage.getItem('BLQ'+localStorage.getItem('ole'));
        else if(k==='Poison')
            document.getElementById('Poison').innerText=obj[k]-localStorage.getItem('Poison'+localStorage.getItem('ole'));
        else
            document.getElementById('messages').innerText=sum;            
    }
        
    
});

var glbRes;
var reQ={};
var idb=0;
var tableVl='t';
function tableData(val){  
var resource=val.concat(`.${localStorage['ole']}`);
var reqPayload={
    "count": 10,
    "requeue": false,
    "encoding": "auto",
    "truncate": 50000,
    "ackmode": "ack_requeue_true"
}
var idCol=localStorage['ole'].split('.');
document.getElementById('tranID').innerText=idCol[0]+' ID';
const BASE_URL1=`https://crosssolved.herokuapp.com/https://ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2@termite.rmq.cloudamqp.com/api/queues/ngqgcdqs/${resource}/get`;
fetch(`${BASE_URL1}`,{
    method: 'POST',
    body:JSON.stringify(reqPayload),
    headers: new Headers({
        'Content-Type': 'application/json',
'Access-Control-Allow-Origin' : '*',
'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
'Authorization': 'Basic '+btoa(`ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2`)
})
}).then((response) => {
return response.json();
})
.then((myJson) => {
    console.log(myJson);
    
    myJson.forEach(value=>{
        var retry=0;
        idb+=1; 
        tableVl=tableVl+idb;
        var ele=document.createElement("TR");
        ele.setAttribute("id",`row${idb}`);
        var td = document.createElement('TD');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        td3.setAttribute("id",`headTran${idb}`);
        var td4= document.createElement('TD');
        var td5= document.createElement('TD');
        td5.setAttribute("class","center");
        var btn1= document.createElement('button');
        var btn2= document.createElement('button');
        btn1.setAttribute("type","button");
        btn1.setAttribute("id",idb);  
        td4.setAttribute("id",tableVl);
        
        btn1.setAttribute("class","btn btn-warning"); 
        btn2.setAttribute("id","b2");
        btn2.setAttribute("type","button");  
        btn2.setAttribute("class","btn btn-info"); 
        
        td.innerText=`${value.properties.headers.OrderID}`
        td1.innerText= `${value.properties.headers.dateTime}`;
        td2.innerText=`${value.properties.headers.errorType}`;
        td3.innerHTML=`${val}`;
        td4.innerText=`${retry}`;
        btn1.innerText="Re-Queue";
        btn2.innerText="Report";
        //td5.appendChild(att);
        td5.appendChild(btn1); 
        td5.appendChild(btn2);
                       
                    //    <td class="center">3</td>
                    //    <td class="center"> <button type="button"
                    //                             class="btn btn-warning">Re-Queue</button>
                    //    <button type="button" class="btn btn-info">Report</button></td>
        ele.appendChild(td);
        ele.appendChild(td1);
        ele.appendChild(td2);
        ele.appendChild(td3); 
        ele.appendChild(td4); 
        ele.appendChild(td5);
        if(localStorage.getItem(`${localStorage.getItem('ole')}row${idb}`)!==value.properties.headers.OrderID){               
        var tb=document.getElementById("tableBody");
        tb.appendChild(ele);
        glbRes=document.getElementById(`headTran${idb}`).innerText+'.'+localStorage['ole'];    
    
        var foo =document.getElementById(idb);
        
        var objD={
            OrderID: value.properties.headers.OrderID,
            dateTime: value.properties.headers.dateTime,
            errorType: value.properties.headers.errorType,
            retry: retry,
            rowId: `row${idb}`
        }
        
        if(foo.addEventListener){
            foo.addEventListener('click',publishMessage(retry,tableVl,glbRes, objD,val));
            
        }
    }               
    }
    )
})}

setZero();
// countTable();
tableData('BLQ');
tableData('DLQ');
tableData('Poison');
//tableData('');

// function for publishing message through exchange


var publishMessage=function(retry,vl,glbD, objD,nmV){    
return function curried_func(e){
    localStorage.setItem(`${localStorage.getItem('ole')}${objD.rowId}`,objD.OrderID);
    
    retry+=1;
    var pIn=parseInt(localStorage.getItem(`${nmV}${localStorage.getItem('ole')}`))
    pIn=pIn+1
    var le=document.getElementById(vl);    
    localStorage.setItem(nmV.concat(localStorage.getItem('ole')),pIn);

    // var routKey=
    le.innerText=retry;
    var payloadExc={
        "properties": {
            "retry": retry,
            "errorType": objD.errorType,
            "OrderID": objD.OrderID,
            "dateTime": objD.dateTime
        },
        "routing_key": ``,
        "payload": "my body",
        "payload_encoding": "string"
    }
    var exgRes=`EXG.${localStorage['ole']}`
    const BASE_URL2=`https://crosssolved.herokuapp.com/https://ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2@termite.rmq.cloudamqp.com/api/exchanges/ngqgcdqs/${exgRes}/publish`;
    fetch(`${BASE_URL2}`,{
        method: 'POST',
        body: JSON.stringify(payloadExc),
        headers: new Headers({
            'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Authorization': 'Basic '+btoa(`ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2`)
    })
    }).then((response) => {
    return response.json();
    })
    .then((myJson)=>{
        console.log(myJson);
        document.getElementById(objD.rowId).innerText='';
        // countTable();
    })
}
}

function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
 }

function mainFn(clicked){
    const value= document.getElementById(clicked).innerText;
  console.log(value);

	// Save back to localStorage
	localStorage.setItem('ole', value);}
    // localStorage['ole']=value;}