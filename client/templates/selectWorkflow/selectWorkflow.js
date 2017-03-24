Template.selectWorkflow.events({
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  },
  'click #populate': function(e) {
    e.preventDefault();
    console.log("You  selected wfdrop");
    WFCursor = Workflows.find().fetch();
    //WFArray.push(WorkflowsList.find().fetch());
    //console.log("Array " + WFArray);
    wfContainer = document.getElementById("wfDrop");
    wfContainer.innerHTML = null;
    // var add = document.createDocumentFragment();
    var a = 0;
    for (i in WFCursor) {
      name = WFCursor[i].workflowName;
      wfContainer.innerHTML +=  '<option>'+ name +'</option>';
      a++
    }
    /*WFArray = WorkflowsList.find().fetch();
    //WFArray.push(WorkflowsList.find().fetch());
    console.log(WFArray);

    container = document.getElementById("selectWFArea");
    child = document.getElementById("workflow");
    container.innerHTML = null;
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
      container.innerHTML += '<br>' + '<div id="workflow">'+ name +'</div>';
      a++
    }*/
    // document.appendChild(add);
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  },
  'click #viewButton': function(e){
    e.preventDefault();
    Router.go("/viewWorkflow");
  }
});
