const canvas = document.querySelector('#draw');
  const stroke_width = document.querySelector('.stroke_width');
  const stroke_color = document.querySelector('.stroke_color');
  const restore_button = document.querySelector('.restore_button');
  const ctx = canvas.getContext('2d');
  const button = document.getElementById('btn-download');
  const buttonSend = document.getElementById('btn-send');
  const imgInp = document.getElementById('baseImage');

  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  //ctx.lineWidth = 50;

  let isDrawing = false;
  let isClearing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let color = '#000000';
  let stroke = 5;

  // let direction = true;

  function draw(e) {
    if (!isDrawing) return; //Stop the function
    if (isClearing) return;

    ctx.strokeStyle = color;
    ctx.beginPath();
    //Start from
    ctx.moveTo(lastX, lastY);
console.log(lastX, lastY);
console.log(e.offsetX, e.offsetY);
    //Go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineWidth = stroke;

    [lastX, lastY] = [e.offsetX, e.offsetY];

    // Random color and width

    /*hue++;
    if (hue >= 360) {
      hue = 0;
    }

    if (c >= 100 || ctx.lineWidth <= 2) {
      direction = !direction;
    }

    if (direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }*/
  }

  function removeLine(e) {
    console.log(isClearing);

    if (!isDrawing) return;
    if (!isClearing) return;
    console.log(lastX, lastY);

    console.log('hello');
    ctx.clearRect(lastX - 50 - 1, lastY - 50 - 1, stroke * Math.PI, stroke * Math.PI);
    //ctx.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  //restore_button.onclick = !isClearing;
  restore_button.addEventListener('click', () => {
    isClearing = !isClearing;
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // start drawing
  canvas.addEventListener('mousemove', draw);
  // start clearing
  canvas.addEventListener('mousemove', removeLine);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  stroke_width.addEventListener('input', (e) => stroke = e.path[0].value);
  stroke_color.addEventListener('input', (e) => color = e.path[0].value);

  button.addEventListener('click', (e) => {
    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    button.href = dataURL;
  });

  buttonSend.addEventListener('click', (e) => {
  // console.dir(imgInp.getAttribute('src'));

    let data    = { 'sketch': imgInp.src, 'hint': canvas.toDataURL('image/png'), 'opacity': 1.0 };
    data        = JSON.stringify(data);
    $.ajax({
      url         : 'https://dvic.devinci.fr/dgx/paints_torch/api/v1/colorizer',
      type        : 'POST',
      data        : data,
      contentType : 'application/json; charset=utf-8',
      dataType    :'json',
      success     : function(response){
        if('colored' in response) {
          let colored = response.colored;
          console.log(colored)
          $('#imageAfter').attr('src', colored);

          // Do wathever you want with it
        }
      }
    });
  });

