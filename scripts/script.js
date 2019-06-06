console.log('hello world');

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      const src = e.target.result


      let image = new Image();
      image.src = src;

      image.onload = function() {
        const canvas = document.querySelector('#draw');

        // access image size here
        console.log('width : ', this.width);
        console.log('height : ', this.height);

        $('#baseImage').css({
          'width': this.width,
          'height': this.height,
        });

        canvas.width = this.width;
        canvas.height = this.height;

        $('#baseImage').attr('src', src);
      };
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});

