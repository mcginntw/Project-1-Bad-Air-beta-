class Line {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || { top: 50, bottom: 30, right: 50, left: 50},
            tooltipPadding: _config.tooltipPadding || 15,
            yParameter: _config.yParameter,
        }

        this.data = _data;
        this.previous = this.data

        this.initVis();
    }

    initVis() {

        let vis = this;
        //width and height of the visualization
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;


        vis.xValue = d => d.Year;
        vis.yValue = vis.config.yParameter;

        //scales setup
        vis.xScale = d3.scaleLinear()
            .domain([d3.max(vis.data, d => d.Year), d3.min(vis.data, d => d.Year)]) 
            .range([vis.width, 0]);
        
        vis.yScale = d3.scaleLinear()
            .domain(d3.extent(vis.data, vis.yValue))
            .range([vis.height, 0])
            .nice()

        //Size definition of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        
        //Initialize Axes
        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis);
        

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

        //Text and Axis Labels
        
        
        vis.chart.append('text')
            .attr('class', 'axis-title')
            .attr('y', vis.height - 25)
            .attr('x', vis.width + 20)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Years')


    }


    updateVis() { 
        let vis = this;

        vis.xValue = d => d.Year
        vis.yValue = vis.config.yParameter

        vis.line = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)));

        vis.yScale.domain(d3.extent(vis.data, vis.yValue));

        vis.bisectDate = d3.bisector(vis.xValue).left;
        vis.renderVis();
       
    }

    renderVis() { 
        let vis = this;

        vis.chart.selectAll('.chart-line')
            .data([vis.data])
        .join('path')
            .attr('class', 'chart-line')
            .attr('stroke', '#27a86c')
            .attr('stroke-width', 4)
            .attr('fill', 'none')
            .attr('d', vis.line);

        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);

    }
}