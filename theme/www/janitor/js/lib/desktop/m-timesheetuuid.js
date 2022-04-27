Util.Modules["timesheetuuid"] = new function() {
	this.init = function(div) {

		div.item_id = u.cv(div, "item_id");

		// CMS interaction urls
		div.remove_project_url = div.getAttribute("data-project-remove");
		div.csrf_token = div.getAttribute("data-csrf-token");

		div._form_projects = u.qs("form.projects", div);
		div._list_projects = u.qs("ul.projects", div);
		div._project_count = u.qs("span.project_count", div);


		if(div._form_projects) {
			div._form_projects.div = div;

			u.f.init(div._form_projects);

			// new project submitted
			div._form_projects.submitted = function(iN) {

				this.response = function(response) {
					page.notify(response);

					if(response.cms_status == "success" && response.cms_object && response.cms_object !== true) {

						if(!this.div._list_projects) {
							this.div._list_projects = u.ae(this.parentNode, "ul", {"class":"items projects"});
							this.parentNode.insertBefore(this.div._list_projects, this);

							// Remove no projects text if it exists
							var p_no_projects = u.qs("p", this.div);
							if(p_no_projects) {
								p_no_projects.parentNode.removeChild(p_no_projects);
							}
						}

						var project_li = u.ae(this.div._list_projects, "li", {"class":"project project_id:"+response.cms_object["project_id"]});
						u.ae(project_li, "h3", {"html":response.cms_object["project_name"]});

						this.div.initProject(project_li);

						// increment project count
						this.div._project_count.innerHTML++;
						
						// reset form input
						this.reset();

					}
					else if(response.cms_status == "success" && response.cms_object && response.cms_object === true) {
						
						// reset form input
						this.reset();
					}

				}
				u.request(this, this.action, {"method":"post", "data" : this.getData()});

			}

		}

		// add remove form to project
		div.initProject = function(node) {

			node.div = this;
			
			if(this.remove_project_url) {
				
				node.project_id = u.cv(node, "project_id");
				node._ul_actions = u.ae(node, "ul", {"class":"actions"});
				node._li_remove = u.ae(node._ul_actions, "li", {"class":"remove"});
				
				
				// Create remove form
				node._form_remove = u.f.addForm(node._li_remove, {
					"action":this.remove_project_url, 
					"class":"remove"
				});
				node._form_remove.node = node;

				u.bug(node.project_id);
				
				// Add csrf-token
				u.f.addField(node._form_remove, {
					"type":"hidden",
					"name":"csrf-token", 
					"value":div.csrf_token
				});
				u.f.addField(node._form_remove, {
					"type":"hidden",
					"name":"project_id", 
					"value":node.project_id
				});
				// Add button
				u.f.addAction(node._form_remove, {
					"value":"Remove",
					"class":"button remove"
				});
				
				// Add oneButtonForm properties
				node._form_remove.setAttribute("data-success-function", "removed");
				node._form_remove.setAttribute("data-confirm-value", "Are you sure?");
				
				// Initialize oneButtonForm
				u.m.oneButtonForm.init(node._form_remove);
				
				node._form_remove.removed = function(response) {
					
					// decrement project count
					this.node.div._project_count.innerHTML--;
					
					this.node.parentNode.removeChild(this.node);
				}

			}

		}


		// initalize existing projects
		div.projects = u.qsa("li.project", div._list_projects);
		var i, node;
		for(i = 0; node = div.projects[i]; i++) {
			div.initProject(node);
		}

	}
}
