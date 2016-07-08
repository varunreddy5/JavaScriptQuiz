var myQuiz=[
["What is the capital of Karnataka ?","Mysore","Bangalore","Hubli","None of the above",2],
["DOM stands for ?","Data Object Model" ,"Document Object Model","Data Object Machine","None of the above",2],
["Who is the president of India ?","Pranab Mukherjee" ,"Prathibha Patel","Prudhviraj Chauhan","None",1],
["Which of the following is an Object ?","var","number","array","undefined",3]
];
var container=document.getElementsByClassName("container");
var myQuestion=document.getElementById("questionNumber");
var answers=document.getElementsByClassName("answer");
var prev=document.getElementById("prev-button");
var next=document.getElementById("next-button");
var myProgress=document.getElementById("progressbar");
var progressDisplay=document.getElementsByClassName("progress");
var totalQuizHide=document.getElementById("totalQuizDiv");
var header=document.getElementById("header");
var submitBut=document.getElementById("submitButton");
var resultPage=document.getElementById("result");
var currentQuestion=0;
var correctAnswer=0;
var totalCorrectAns=[];
var percentage=0;
for(var i=0;i<answers.length;i++){
	answers[i].addEventListener('click',myAnswer);
}
checkPage(currentQuestion);	
next.addEventListener('click',nextPage);
prev.addEventListener('click',prevPage);
submitBut.addEventListener('click',endQuiz);
function nextPage(){

	if(totalCorrectAns[currentQuestion]){
		if (currentQuestion<myQuiz.length-1) {
			
			currentQuestion++;
			console.log(currentQuestion);
			checkPage(currentQuestion);
		}
		
	}
	else{
		alert("click on the answer");
	}
}

function checkPage(currentQuestion){
	if (currentQuestion==0) {
		// prev.style.visibility="hidden";
		prev.disabled=true;
		// next.style.visibility="visible";
		next.disabled=false;
		myQuestion.innerHTML=myQuiz[currentQuestion][0];
		for(var i=0;i<myQuiz[currentQuestion].length-2;i++){
			answers[i].innerHTML=myQuiz[currentQuestion][i+1];
			}
			addStyle();
		}
	else{
			// prev.style.visibility="visible";
			prev.disabled=false;
			// next.style.visibility="visible";
			next.disabled=false;
			myQuestion.innerHTML=myQuiz[currentQuestion][0];
			for(var i=0;i<myQuiz[currentQuestion].length-2;i++){
			answers[i].innerHTML=myQuiz[currentQuestion][i+1];
			}
			addStyle();
		
			if (currentQuestion==myQuiz.length-1) {
				// next.style.visibility="hidden";
				next.disabled=true;
				submitBut.style.display="block";
			}	
	}
	var progressWidth=Math.ceil((currentQuestion)/(myQuiz.length)*100);
	myProgress.style.width=progressWidth+'%';
	myProgress.innerHTML=progressWidth+'%';
}

function prevPage(){
	if (currentQuestion>0) {
	currentQuestion--;
	checkPage(currentQuestion);
}
}
function myAnswer(){
	var idAnswer=this.getAttribute("data-id");
	totalCorrectAns[currentQuestion]=idAnswer;
	addStyle();
	if(myQuiz[currentQuestion][5]==idAnswer){
		console.log("Correct Answer");
	}
	else{
		console.log("Wrong Answer")
	}
}

function addStyle(){
	for(var i=0;i<answers.length;i++){
		if(totalCorrectAns[currentQuestion]==(i+1)){
			answers[i].classList.add("selectAnswer");
			answers[i].style.color="white";
		}
		else{
			answers[i].classList.remove("selectAnswer");
			answers[i].style.color="black";
		}	
	}
}

function endQuiz(){
	var counter=0;
	var output="";
	if (totalCorrectAns[currentQuestion]) {
		console.log("The quiz is over");
		
		totalQuizHide.style.display="none";
		header.style.visibility="hidden";

		output='<div><br><h3>Quiz Result:</h3><br></div>';
		for(var i=0;i<myQuiz.length;i++){
			if(totalCorrectAns[i]==myQuiz[i][5]){
				output=output+"<h4>Question:"+(i+1)+'&nbsp;<span class="glyphicon glyphicon-ok-circle" style="color:green"></span></h4>';
			}
			else{
				output=output+"<h4>Question:"+(i+1)+'&nbsp;<span class="glyphicon glyphicon-remove-circle" style="color:red"></span></h4>';
				}
		}
		for(var i=0;i<myQuiz.length;i++){
		if(totalCorrectAns[i]==myQuiz[i][5]){
			counter++;
		}
	}
	percentage="<br><h4>You have scored : "+ (counter/myQuiz.length)*100+'%'+"</h4>";
	output=output+percentage;
	output=output+"</div>";
	
	resultPage.innerHTML=output;
	resultPage.classList.add("resultStyle");
	}
	else{
		alert("Please click on an answer");
	}
}