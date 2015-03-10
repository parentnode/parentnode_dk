	</div>

	<div id="navigation">
		<ul>
			<?= $HTML->link("Posts", "/janitor/admin/post/list", array("wrapper" => "li.post")) ?>
			<?= $HTML->link("Pages", "/janitor/admin/page/list", array("wrapper" => "li.page")) ?>

			<?= $HTML->link("Navigations", "/janitor/admin/navigation/list", array("wrapper" => "li.navigation")) ?>
			<?= $HTML->link("Tags", "/janitor/admin/tag/list", array("wrapper" => "li.tags")) ?>
			<?= $HTML->link("Users", "/janitor/admin/user/list", array("wrapper" => "li.user")) ?>

			<?= $HTML->link("Profile", "/janitor/admin/profile", array("wrapper" => "li.profile")) ?>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation">
			<li class="copyright">Janitor, Manipulator, Modulator - parentNode - Copyright 2015</li>
		</ul>
	</div>
</div>

</body>
</html>