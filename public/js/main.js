//nav bar
if ($(window).width() > 992) {
    $(window).scroll(function(){  
       if ($(this).scrollTop() > 40) {
          $('#navbar_top').addClass("fixed-top");
          // add padding top to show content behind navbar
          $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
        }else{
          $('#navbar_top').removeClass("fixed-top");
           // remove padding top from body
          $('body').css('padding-top', '0');
        }   
    });
  } 
//line graph dasboard
  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [5,10,15,20,25,30,35,40,45,50],
      datasets: [{ 
          data: [1,10,21,9,6,3,17,8,19,10],
          label: "Africa",
          pointRadius: 2,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          fill: true
        }, { 
          data: [21,13,15,11,9,5,13,19,1,17,21],
          label: "Asia",
          pointRadius: 2,
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
          fill: true
        }
      ]
    },
    options:{
      legend:{
      display:false
          },
          tooltips:{
            enabled:false
          },
          plugins: {
            deferred: {
              xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
              yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
              delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
            }
          }
        }
  });
  
  //line modal show
  $('#modal').modal('show');

  $('#modal1').modal('show');
  $('#modal0').modal('show');
  $('#modal2').modal('show');

  // Bar chart

