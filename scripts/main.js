// URL and Caption Success Settings
var urlInput = $('.urlInput');
var captionInput = $('.captionInput');

// URL and Caption Error Settings
var noUrl = $('.urlError');
var noCaption = $('.captionErr');


// Function that runs GET request that is successful
var dataGet = function(data) {
	var container = $('#show-results');
	data.forEach(function(val, i, arr) {
		var postBox = $('<div class="postBox"></div>');
		var imgBox = $('<div class="imgBox"></div>');
		var img = $('<img>', {src: val.image});
		var captionBox = $('<div class="captionBox"></div>');
		var caption = $('<p class="caption"></p>').html(val.caption);
		imgBox.append(img);
		captionBox.append(caption);
		postBox.append(imgBox);
		postBox.append(captionBox);
		container.append(postBox);
	});
}

// GET request setup
var getResults = {
	url: 'http://small-tiyfe.herokuapp.com/collections/letsdothis',
	type: 'get',
	dataType: 'json',
	success: dataGet,
	error: function(err) {
		console.log('Error! Error!');
	}
};

// This runs the GET request
$.ajax(getResults);

// This is what happens when someone tries to submit something on the input form
$('form').submit(function(e) {
	e.preventDefault();
	var entry;
	if (urlInput.val().toLowerCase().startsWith('http://') || urlInput.val().toLowerCase().startsWith('https://')) {
		noUrl.html('');
		if (captionInput.val() === '') {
			noCaption.html('Please enter a caption to proceed.');
			return;
		} else {
			entry = {
				image: urlInput.val(),
				caption: captionInput.val()
			};


    		$.ajax({
    			url: 'http://small-tiyfe.herokuapp.com/collections/letsdothis',
    			type: 'post',
    			data: entry,
    			dataType: 'json'
    		});
    		$('.inputForm').slideUp();
			$('.urlInput').val('');
    		$('.captionInput').val('');
    		$('.urlError').val('');
    		$('.captionErr').val('');
    		$('#show-results').html('');
    		$.ajax(getResults);
		}		
	} else {
		noUrl.html('Please enter a valid URL.');
		return;
	}
});



// Top navigation

// // // Change text color to black once start typing in an input box
$('.urlInput').keydown(function() {
	$('.urlInput').css('color', '#000');
});

$('.captionInput').keydown(function() {
	$('.captionInput').css('color', '#000');
});

// // Open/close the input form with the + button
$('.mainButton').click(function(){
    $('.inputForm').slideToggle();
});

// // Close the input form and clear the contents of the input boxes
$('.cancel').click(function() {
	$('.inputForm').slideUp();
	$('.urlInput').val('');
    $('.captionInput').val('');
    $('.urlErr').val('');
    $('noCaption').val('');
});