document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json.children
    
    const w = 700
    const h = 200
    const padding = 10
    
        // Adds the svg canvas
    const svg=d3.select(".graph")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("background", "#fff")
    
     //Add the rectangles (bars)
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", (d, i) => {return d.children.length})
        .attr("height", 200)
        .attr("x", (d, i) => {return (i*100)})
        .attr("y", (d, i) => {return padding})
        .style("fill", (d) => {
          if(d.name === "Adventure"){
            return ("red")
          }else if(d.name === "Action"){
            return("pink")
          }else if(d.name === "Comedy"){
            return("orange")
          }else if(d.name === "Drama"){
            return("yellow")
          }else if(d.name === "Animation"){
            return("blue")
          }else if(d.name === "Family"){
            return("green")
          }else{
            return("purple")
          }
    })
        .attr("class", "bar")
        .append("title")
        .text(d => d.name + ", " + d.category + ": $" + d.value)
    }
})
