
console.log(localStorage['ole'])
document.getElementById('mainHeading').innerHTML=localStorage['ole'];
var remainder=[];
// var resource='BLQ'.concat(`.${localStorage['ole']}`);
const BASE_URL=`https://crosssolved.herokuapp.com/https://termite.rmq.cloudamqp.com/api/queues/ngqgcdqs`;
const BASE_URL3=`https://crosssolved.herokuapp.com/http://transactions-recovery-grid.us-e2.cloudhub.io/message-report`;
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
            if(key!=='BLQ' && key!=='DLQ' && key!=='Poison')
                sum+=value.messages;
        }
    })
    
    // console.log(obj);
    for( var k in obj){
        if(k==='DLQ')
            document.getElementById('DLQ').innerText=obj[k]//-localStorage.getItem('DLQ'+localStorage.getItem('ole'));
        else if(k==='BLQ')
            document.getElementById('BLQ').innerText=obj[k]//-localStorage.getItem('BLQ'+localStorage.getItem('ole'));
        else if(k==='Poison')
            document.getElementById('Poison').innerText=obj[k]//-localStorage.getItem('Poison'+localStorage.getItem('ole'));
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
    "requeue": true,
    "encoding": "auto",
    "truncate": 50000,
    "ackmode": "ack_requeue_true"
}
var idCol=localStorage['ole'].split('.');
if(idCol[0]==='Notify')
    document.getElementById('tranID').innerText=idCol[1]+' ID';
else
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
    // console.log(myJson);
    
    myJson.forEach(value=>{
        var eleObj={
            OrderID: value.properties.headers.OrderID,
            dateTime: value.properties.headers.dateTime,
            errorType: value.properties.headers.errorType,
            retry: value.properties.headers.retry,
        }
        remainder.push(eleObj);
    })
    console.log(`${val}`,remainder);
    var dataset=[];
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
        
        btn1.setAttribute("class","btn btn-primary"); 
        btn2.setAttribute("id",`b2${idb}`);
        btn2.setAttribute("type","button");  
        btn2.setAttribute("class","btn btn-danger"); 
        
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
                       
        ele.appendChild(td);
        ele.appendChild(td1);
        ele.appendChild(td2);
        ele.appendChild(td3); 
        ele.appendChild(td4); 
        ele.appendChild(td5);
        var abhi=localStorage.getItem(`eliminated`).split(',');
        // if(value.properties.headers.OrderID!==localStorage.getItem(`${localStorage.getItem('ole')}row${idb}`)){               
        // if(!abhi.includes(value.properties.headers.OrderID)){
        var tb=document.getElementById("tableBody");
        // tb.appendChild(ele);
        // glbRes=document.getElementById(`headTran${idb}`).innerText+'.'+localStorage['ole'];
        glbRes=td3.innerText+'.'+localStorage['ole'];    
    
        var foo =btn1//document.getElementById(idb);
        var rep=btn2//document.getElementById(`b2${idb}`);
        
        var objD={
            OrderID: value.properties.headers.OrderID,
            dateTime: value.properties.headers.dateTime,
            errorType: value.properties.headers.errorType,
            retry: retry,
            rowId: `row${idb}`
        }

        var objM={
            interface:localStorage.getItem('ole'),
            OrderID: value.properties.headers.OrderID,
            dateTime: value.properties.headers.dateTime,
            errorType: value.properties.headers.errorType,
            retry: retry,
            errorQueue:val,
            rowId: `row${idb}`
        }
        if(foo.addEventListener){
            foo.addEventListener('click',publishMessage(retry,tableVl,glbRes, objD,val,remainder));
            rep.addEventListener('click',publishMail(objM,remainder,val));
        }
         remainder=[];
        //  setTable();
         searchtab(ele);           
    }
    )
    
})}

setZero();
// countTable();
setTimeout(tableData('BLQ'),1);
setTimeout(tableData('DLQ'),2);
setTimeout(tableData('Poison'),3);
// setTimeout(searchtab(),4);
// setTimeout(delete('BLQ'))
//tableData('');

// function for publishing message through exchange


var publishMessage=function(retry,vl,glbD, objD,nmV,remArr){    
return function curried_func(e){
    var exgRes=`EXG.${localStorage['ole']}`
    const BASE_URL2=`https://crosssolved.herokuapp.com/https://ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2@termite.rmq.cloudamqp.com/api/exchanges/ngqgcdqs/${exgRes}/publish`;
    var arr=localStorage.getItem('eliminated').split(',');
    if(!arr.includes(objD.OrderID)){
    arr.push(objD.OrderID);
    localStorage.setItem(`eliminated`,arr);}
    
    retry+=1;
    var pIn=parseInt(localStorage.getItem(`${nmV}${localStorage.getItem('ole')}`))
    pIn=pIn+1
    var le=document.getElementById(vl);    
    localStorage.setItem(nmV.concat(localStorage.getItem('ole')),pIn);

    // var routKey=
    le.innerText=retry;
    for(var i=0;i<remArr.length;i++){
        if(remArr[i].OrderID === objD.OrderID){
            remArr.splice(i,1);
        }
    };
    remArr;
    setTimeout(deleteFun(nmV),1);
    setTimeout(reQueue(remArr,nmV,BASE_URL2),4);
    

    var payloadExc={
        "properties": {
            "headers":{
            "retry": retry,
            "errorType": objD.errorType,
            "OrderID": objD.OrderID,
            "dateTime": objD.dateTime
        }},
        "routing_key": ``,
        "payload": "my body",
        "payload_encoding": "string"
    }
    
    
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

var publishMail=function(objM,remArr,nmV){    
    return function curry_func(e){
        
        for(var i=0;i<remArr.length;i++){
            if(remArr[i].OrderID === objM.OrderID){
                remArr.splice(i,1);
            }
        };
        var idK=localStorage.getItem('ole').split('.');
        var mailPayload={
            "Interface": objM.interface,
            "IdKey": `${idK[0]} ID`,
            "IdValue": objM.OrderID,
            "DateTime": objM.dateTime,
            "ErrorType": objM.errorType,
            "ErrorQueue": objM.errorQueue,
            "Retries": objM.retry
        }
        fetch(`${BASE_URL3}`,{
            method: 'POST',
            body: JSON.stringify(mailPayload),
            headers: new Headers({
                'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        // 'Authorization': 'Basic '+btoa(`ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2`)
        })
        }).then((response) => {
        return response.json();
        })
        .then((myJson)=>{
            console.log(myJson);
            // alert(`mail sent status ${myJson.status}`);
            var exgRes=`EXG.${localStorage['ole']}`
            const BASE_URL2=`https://crosssolved.herokuapp.com/https://ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2@termite.rmq.cloudamqp.com/api/exchanges/ngqgcdqs/${exgRes}/publish`;
            var alertBox=confirm("Are you sure you want to proceed?")
            if(alertBox){
                document.getElementById(objM.rowId).innerText='';
                var arr1=localStorage.getItem('eliminated').split(',');
                if(!arr1.includes(objM.OrderID)){
                    arr1.push(objM.OrderID);
                    localStorage.setItem(`eliminated`,arr1);}
            
            deleteFun(nmV);
            reQueue(remArr,nmV,BASE_URL2);
            
            }
        })}}   

function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
 }

function mainFn(clicked){
    const value= document.getElementById(clicked).innerText;
  console.log(value);

	// Save back to localStorage
    localStorage.setItem('ole', value);
}
    // localStorage['ole']=value;}

// document.getElementById("mailInterface").innerHTML=localStorage.getItem('ole');    
function reQueue(remArr,nmV,BASE_URL2){
    remArr.forEach(value=>{
        var pushPayload={
            "properties": {
                "headers":{
                "retry": value.retry,
                "errorType": value.errorType,
                "OrderID": value.OrderID,
                "dateTime": value.dateTime
            }},
            "routing_key": nmV,
            "payload": "my body",
            "payload_encoding": "string"
        }

        fetch(`${BASE_URL2}`,{
            method: 'POST',
            body: JSON.stringify(pushPayload),
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
            console.log('queueing Again',myJson);
            
        })
    })
}

function deleteFun(nmV){
    var resource=nmV.concat(`.${localStorage['ole']}`);
    // var delPayload={
    //     "count": 10,
    //     "requeue": true,
    //     "encoding": "auto",
    //     "truncate": 50000,
    //     "ackmode": "ack_requeue_false"
    // }
    //var idCol=localStorage['ole'].split('.');
    const BASE_URL1=`https://crosssolved.herokuapp.com/https://ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2@termite.rmq.cloudamqp.com/api/queues/ngqgcdqs/${resource}/contents`;
    fetch(`${BASE_URL1}`,{
        method: 'DELETE',
        // body:JSON.stringify(delPayload),
        headers: new Headers({
            'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Authorization': 'Basic '+btoa(`ngqgcdqs:LSuLMmPedYVkDJ9bQNJbqJCnOML3i_a2`)
    })
    }).then((response) => {
        if(response.status!==204)
            return response.json();
        else
            return null;    
    })
    .then((myJson) => {
        console.log('delete',myJson);
    })
}

function searchtab(ele){
// table.clear();    
var table = $('#dataTables-example').DataTable({
    "sDom":"ltipr"
});

table.rows.add([ele]).draw();

// #myInput is a <input type="text"> element
$('#myInputTextField').on( 'keyup', function () {
    table.search( $(this).val() ).draw();
} );
}

// var setTable= (function() {
//     var executed = false;
//     return function() {
//         if (!executed){
//             executed=true;
//             var table = $('#dataTables-example').DataTable({
//                 "sDom":"ltipr"
//             });
//         }
//     }
// })
function logout(){
    sessionStorage.removeItem('sess');
}