class Bar {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 300,
            margin: _config.margin || { top: 50, bottom: 30, right: 50, left: 50},  
        }

        this.data = _data;
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xValue = d => d.Year;
        vis.yValue = 365;

        const x = d3.scaleBand()
            .range([0, vis.width])
            .domain(d => d.DaysCO)
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0, ${vis.height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        const y = d3.scaleLinear()
            .domain([0, 365])
            .range([height, 0])
        svg.append("g")
            .call(d3.axisLeft(y));

        
            svg.selectAll("mybar")
                .data(data)
                .join("rect")
                    .attr("x", d => x(d.DaysCO))
                    .attr("y", d => y(vis.yValue))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(vis.yValue))
                    .attr("fill", "#69b3a2");
                    

    }
};