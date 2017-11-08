$(document).ready(function(){
	//Global variables
		var apiKey = "iD2isJweAMLIM3EWgYMZnMCI7vYA0a40";
		var things = ["Kid", "Cat", "Dog", "Building", "Bridge", "Car", "Old", "Stage", "Cake",  "Yoga", "Robot", "Infomercial", "Sports"];
		var bttn;
		var text;
		var thing;
		var gifs;

	//Function to make buttons
	var makeButtons = function(things){
		things.forEach(function(name){
			bttn = $("<button />");
			bttn.text(name);
			bttn.addClass("btn btn-block btn-warning");
			bttn.appendTo($("#buttons"));
		});
	}
		
	//Call to makeButtons on page load
	makeButtons(things);

	//onClick event for buttons to trigger API call, get 10 gifs with button name + fail
	$("#buttons").on("click", ".btn", function(){
		$("#content").empty();
		thing = $(this).text();
		if(thing.includes(" ")){
			thing.split(" ").join("+");
		}
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?q="+thing+"+fail&api_key="+apiKey+"&limit=10&rating=pg-13",
			method: "GET"}).done(function(response){
				for(var i = 0; i < 10; i+=2){
					gifs = $("<div />");
					gifs.addClass("row gif-row");
					gifs.html("<div class='col-lg-6'><img id='"+response.data[i].id+"' class='fail-gif' src='"+response.data[i].images.original_still.url+"' alt='Gif of failure'><p>Rating: "+response.data[i].rating.toUpperCase()+"</p></div><div class='col-lg-6'><img id='"+response.data[i+1].id+"' class='fail-gif' src='"+response.data[i+1].images.original_still.url+"' alt='Gif of failure'><p>Rating: "+response.data[i+1].rating.toUpperCase()+"</p></div>");
					gifs.appendTo($("#content"));
				}
			});

	});

	//onClick event for gifs, if still, will play gif, if playing, will switch back to still
	$("#content").on("click", ".fail-gif", function(){
		var gifSrc = this.src;
		var thisGif = this.id;
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/"+thisGif+"?api_key="+apiKey,
			method: "GET"}).done(function(response){
				if(gifSrc === response.data.images.original_still.url){
					$("#"+thisGif).attr("src", response.data.images.original.url);
				}
				else{
					$("#"+thisGif).attr("src", response.data.images.original_still.url);
				}
			});
	});

	//onClick event to add to button list
	$("#addFail").on("click", function(event){
		event.preventDefault();
		text = $("#entrFail").val();
		if(text === ""){}
		else {
			things.push(text);
			$("#buttons").empty();
			makeButtons(things);
		}
	});

});