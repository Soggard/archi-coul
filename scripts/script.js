console.log('hello world');

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#baseImage').attr('src', e.target.result);
      // $('#imageBefore').css('background-image', 'url('+e.target.result+')');
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});