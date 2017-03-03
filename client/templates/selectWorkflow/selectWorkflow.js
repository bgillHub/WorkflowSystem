Template.selectWorkflow.events({
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  },
  'click #populate': function(e) {
    e.preventDefault();
    WFArray = WorkflowsList.find().fetch();
    //WFArray.push(WorkflowsList.find().fetch());
    console.log(WFArray);

    container = document.getElementById("selectWFArea");
    child = document.getElementById("workflow");
    // var add = document.createDocumentFragment();
    var a = 0;
    for (i in WFArray) {
      name = WFArray[i].name;
       // var l = document.createElement("label");
      // l.id = 'workflow'+a;
      // l.className = 'workflow';
      // add.appendChild(l);
      // // node = document.createTextNode(name);
      // // l.appendChild(node);
      // // element.insertBefore(l, child);
      container.innerHTML += '<div id="workflow">'+ name +'</div>';
      a++
    }

    // document.appendChild(add);
  }
});
