	</div>

	<div id="navigation">
		<ul class="navigation">
			<li class="content">
				<h3>Content</h3>
				<ul class="subjects">
					<?= $HTML->link("Posts", "/janitor/admin/post/list", array("wrapper" => "li.post")) ?>
					<?= $HTML->link("Pages", "/janitor/admin/page/list", array("wrapper" => "li.page")) ?>
					<?= $HTML->link("TODOs", "/janitor/admin/todo/list", array("wrapper" => "li.todo")) ?>
				</ul>
			</li>
			<li class="site">
				<h3>Site</h3>
				<ul class="subjects">
					<?= $HTML->link("Navigations", "/janitor/admin/navigation/list", array("wrapper" => "li.navigation")) ?>
					<?= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>
				</ul>
			</li>
			<li class="system">
				<h3>System</h3>
				<ul class="subjects">
					<?= $HTML->link("Log", "/janitor/admin/log/list", array("wrapper" => "li.logs")) ?>
					<?= $HTML->link("Cache", "/janitor/admin/system/cache", array("wrapper" => "li.cache")) ?>
					<?= $HTML->link("Setup", "/janitor/admin/setup", array("wrapper" => "li.setup")) ?>
				</ul>
			</li>
			<li class="users">
				<h3>Users</h3>
				<ul class="subjects">
					<?= $HTML->link("Users", "/janitor/admin/user/list", array("wrapper" => "li.user")) ?>
					<?= $HTML->link("Groups", "/janitor/admin/user/group/list", array("wrapper" => "li.usergroup")) ?>
					<?= $HTML->link("Profile", "/janitor/admin/profile", array("wrapper" => "li.profile")) ?>
				</ul>
			</li>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="totop"><a href="#header">To top</a></li>
		</ul>

		<p class="copyright">Copyright 2016, parentNode.dk</p>
	</div>
</div>

</body>
</html>