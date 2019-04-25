document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var data = json.children[1].children //array of DRAMA movie objects
    
    const w = 500
    const h = 100
    const padding = 10
    
        // Adds the svg canvas
    const svg=d3.select("a")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
    
     //Add the rectangles (bars)
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 3)
        .attr("height", (d, i) => {return d.value/1000000})
        .attr("x", (d, i) => {return (i*3) + padding})
        .attr("y", (d, i) => {return h - 2*padding - d.value/1000000})
        .style("fill", (d) => {
          if(d.category === "Action"){
            return ("red")
          }else if(d.category === "Adventure"){
            return("pink")
          }else if(d.category === "Comedy"){
            return("orange")
          }else if(d.category === "Drama"){
            return("yellow")
          }else if(d.category === "Animation"){
            return("blue")
          }else if(d.category === "Family"){
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
