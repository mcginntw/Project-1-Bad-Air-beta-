console.log("Hello world");
d3.csv('data/aqi.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    //process the data - this is a forEach function.  You could also do a regular for loop.... 
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
        d.Year = +d.Year
        d.MedianAQI = +d.MedianAQI;
        d.MaxAQI = +d.MaxAQI;
        d.Percentile90thAQI = +d.Percentile90thAQI;

        d.DaysCO = +d.DaysCO;
        d.DaysNO2 = +d.DaysNO2;
        d.DaysOzone = +d.DaysOzone;
        d.DaysSO2 = +d.DaysSO2;
        d.DaysPM2 = +d.DaysPM2;
        d.DaysPM10 = +d.DaysPM10;

        d.GoodDays = +d.GoodDays;
        d.ModerateDays = +d.ModerateDays;
        d.UnhealthyforSensitiveGroupsDays = +d.UnhealthyforSensitiveGroupsDays;
        d.UnhealthyDays = +d.UnhealthyDays;
        d.VeryUnhealthyDays = +d.VeryUnhealthyDays;
        d.HazardousDays = +d.HazardousDays;
  	});

    let bisect = d3.bisector(d => d.Year).left;


    let filteredAQI = data.filter(d => {
        if(d.County == "Hamilton" && d.State == "Ohio") {
            return d.MedianAQI;
        }
    });

    console.log('filteredAQI', filteredAQI);


    //Default Median Line object declaration
    MedianLine = new Line({
        'parentElement': '#medianaqiline',
        'containerHeight': 300,
        'containerWidth': 1000,
        'yParameter': d => d.MedianAQI,

    }, filteredAQI);

    MedianLine.svg.append('text')
        .attr('x', 500)
        .attr('y', 20 )
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Median, Max, and 90th Percentile AQI in Hamilton County, OH, from 1980-2021');

        MedianLine.svg.append('text')
        .attr('class', 'axis-title')
        .attr('x', 0)
        .attr('y', 25)
        .attr('dy', '.71em')
        .text('AQI');

    MedianLine.updateVis();

    COLine = new Line({
      'parentElement': '#coline',
      'containerHeight': 300,
      'containerWidth': 1000,
      'yParameter': d => d.DaysCO,

    }, filteredAQI);

    COLine.svg.append('text')
        .attr('x', 500)
        .attr('y', 20 )
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Days of the Year in which selected pollutant was the dominant pollutant');

    COLine.svg.append('text')
        .attr('class', 'axis-title')
        .attr('x', 0)
        .attr('y', 25)
        .attr('dy', '.71em')
        .text('Days');

    COLine.updateVis();




    DayLine = new Line({
      'parentElement': '#dayline',
      'containerHeight': 300,
      'containerWidth': 1000,
      'yParameter': d => d.GoodDays,

    }, filteredAQI);

    DayLine.svg.append('text')
        .attr('x', 500)
        .attr('y', 20 )
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Air Quality Days of the Year');

    DayLine.svg.append('text')
        .attr('class', 'axis-title')
        .attr('x', 0)
        .attr('y', 25)
        .attr('dy', '.71em')
        .text('Days');

    DayLine.updateVis();


  });


  d3.select('.maxaqibutton').on('click', function(){
    MedianLine.config.yParameter = d => d.MaxAQI;
    MedianLine.updateVis();
    console.log('button!');
  })
    
  d3.select('.medianaqibutton').on('click', function(){
    MedianLine.config.yParameter = d => d.MedianAQI;
    MedianLine.updateVis();
    console.log('second button!');
  })

  d3.select('.ninetyaqibutton').on('click', function(){
    MedianLine.config.yParameter = d => d.Percentile90thAQI;
    MedianLine.updateVis();
    console.log('third button!');
  })



  d3.select('.cobutton').on('click', function(){
    COLine.config.yParameter = d => d.DaysCO;
    COLine.updateVis();
    console.log('button!');
  })
    
  d3.select('.nobutton').on('click', function(){
    COLine.config.yParameter = d => d.DaysNO2;
    COLine.updateVis();
    console.log('second button!');
  })

  d3.select('.ozonebutton').on('click', function(){
    COLine.config.yParameter = d => d.DaysOzone;
    COLine.updateVis();
    console.log('third button!');
  })
  
  d3.select('.sobutton').on('click', function(){
    COLine.config.yParameter = d => d.DaysSO2;
    COLine.updateVis();
    console.log('forth button!');
  })

  d3.select('.pm2button').on('click', function(){
    COLine.config.yParameter = d => d.DaysPM2;
    COLine.updateVis();
    console.log('fifth button!');
  })

  d3.select('.pm10button').on('click', function(){
    COLine.config.yParameter = d => d.DaysPM10;
    COLine.updateVis();
    console.log('sixth button!');
  })


  d3.select('.goodbutton').on('click', function(){
    DayLine.config.yParameter = d => d.GoodDays;
    DayLine.updateVis();
    console.log('button!');
  })
    
  d3.select('.modbutton').on('click', function(){
    DayLine.config.yParameter = d => d.ModerateDays;
    DayLine.updateVis();
    console.log('second button!');
  })

  d3.select('.unsenbutton').on('click', function(){
    DayLine.config.yParameter = d => d.UnhealthyforSensitiveGroupsDays;
    DayLine.updateVis();
    console.log('third button!');
  })
  
  d3.select('.unbutton').on('click', function(){
    DayLine.config.yParameter = d => d.UnhealthyDays;
    DayLine.updateVis();
    console.log('forth button!');
  })

  d3.select('.vunbutton').on('click', function(){
    DayLine.config.yParameter = d => d.VeryUnhealthyDays;
    DayLine.updateVis();
    console.log('fifth button!');
  })

  d3.select('.hazbutton').on('click', function(){
    DayLine.config.yParameter = d => d.HazardousDays;
    DayLine.updateVis();
    console.log('sixth button!');
  })