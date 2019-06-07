  const canvas = document.querySelector('#draw');
  const stroke_width = document.querySelector('.stroke_width');
  const stroke_color = document.querySelector('.stroke_color');
  const restore_button = document.querySelector('.restore_button');
  const ctx = canvas.getContext('2d');
  const buttonSend = document.getElementById('btn-send');
  const imgInp = document.getElementById('baseImage');
//console.log(imgInp);

  canvas.width = 0;
  canvas.height = 0;

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

  function draw(e) {
    if (!isDrawing) return; //Stop the function
    if (isClearing) return;
    //console.log(e);

    ctx.strokeStyle = color;
    ctx.beginPath();
    //Start from
    ctx.moveTo(lastX, lastY);
    //Go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.lineWidth = stroke;

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function removeLine(e) {
    //console.log(isClearing);

    if (!isDrawing) return;
    if (!isClearing) return;
    console.log(lastX, lastY);

    //console.log('hello');
    ctx.clearRect(lastX - 50 - 1, lastY - 50 - 1, stroke * Math.PI, stroke * Math.PI);
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  //restore_button.onclick = !isClearing;
  restore_button.addEventListener('click', () => {
    isClearing = !isClearing;
    if(isClearing) {
      $('.restore_button').html('Gomme: On')
    } else {
      $('.restore_button').html('Gomme: Off')
    }
  });

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];

    draw(e);
  });

  $("#downloadResult").click(function(){

  });

  // start drawing
  canvas.addEventListener('mousemove', draw);
  // start clearing
  canvas.addEventListener('mousemove', removeLine);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);

  stroke_width.addEventListener('input', (e) => stroke = e.path[0].value);
  stroke_color.addEventListener('input', (e) => color = e.path[0].value);

  buttonSend.addEventListener('click', (e) => {
    let data = { 'sketch': imgInp.src, 'hint': canvas.toDataURL('image/png'), 'opacity': 1.0 };
    data = JSON.stringify(data);
    $.ajax({
      url: 'https://dvic.devinci.fr/dgx/paints_torch/api/v1/colorizer',
      type: 'POST',
      data: data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: (response) => {
        if('colored' in response) {
          let colored = response.colored;
          //console.log(colored)
          $('#imageAfter').attr('src', colored);
          $('#downloadResult').css('display', 'inline-block');
          $('#downloadResult').attr('href', colored);
        }
      }
    });
  });

