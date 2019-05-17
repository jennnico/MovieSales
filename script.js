//resource: https://www.d3-graph-gallery.com/graph/treemap_json.html

document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json
    
    // Here the size of each leave is given in the 'value' field in input data
    var root = d3.hierarchy(data).sum(function(d){ return d.value})

 // set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 1000 - margin.left - margin.right,
  height = 345 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .style("background", "white")
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")
            
 // Then d3.treemap computes the position of each element of the hierarchy 
 d3.treemap()
    .size([width, height])
    .padding(0)
    (root)
    
        // Define the div for the tooltip
    var div = d3.select("#my_dataviz").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);

 
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .attr("class", "moviebox")
      .style("fill", (d) => {
           if (d.data.category === "Action"){ //2.8, navy
                    return ("#0200ad")
           }else if(d.data.category === "Drama"){
                    return("#06a827")
           }else if(d.data.category === "Adventure"){
                    return("#00b3bc")
           }else if(d.data.category === "Family"){
                    return("#6300b5")
           }else if(d.data.category === "Animation"){
                    return("#b501ac")
           }else if(d.data.category === "Comedy"){
                    return("#e58302")
           }else if(d.data.category === "Biography"){
                    return("#ba0000")
           }else{return("black")}
  })
    .on("mouseover", function(d) {
        div.style("opacity", 1)
           .html(d.data.name + ": $" + d.data.value)
                  .style("left", (d3.event.pageX + 10) + "px")		
               .style("top", (d3.event.pageY - 28) + "px");
  })
    
  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("class", "movie")
    }
})
